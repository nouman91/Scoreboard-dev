
angular.module('vollyboard').controller('TeamController',['$scope','TeamFactory','$uibModal','$log' ,function($scope,TeamFactory,$uibModal,$log){
     var alertSuccessClasses="alert alert-success alert-dismissible";
        var alertErorrClasses="alert alert-danger alert-dismissible";
        var selectedTeams=[];

        $scope.sortKey="";
        $scope.reverse="";
        $scope.search="";
        $scope.selectedAll = false;
        $scope.isHide=false;
        $scope.appliedClasses="alert alert-dismissible hideIt";
        $scope.type="";
        $scope.message="";
        $scope.teams=[];
        $scope.modalOptions={
             closeButtonText: 'Cancel',
             actionButtonText: 'Confirm',
             headerText: 'Delete Team',
             bodyText: 'Are you sure you want to delete selected team/teams/?'

        }
        $scope.requiredError="";
        $scope.validationError="";
        $scope.lengthError="";
        $scope.data={modalValue:""};

        function init(){
            TeamFactory.getTeams()
            .success(function(teams){
                for(var i in teams){
                   var team={
                    selected:false,
                    team_name:""
                }
                    team.team_name=teams[i].team_name;
                    $scope.teams.push(team);
                }
            });
        }

        init();


        $scope.sort = function(keyname){
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        }
        function showMessageBox(classes,type,message){

            $scope.appliedClasses = classes;
            $scope.type=type;
            $scope.message=message;
            $scope.isHide=true;

        }

         $scope.hideMessage = function(){
            $scope.appliedClasses="alert alert-dismissible hideIt";
        };

/*******************************************************************************************
--Delete Section
*******************************************************************************************/
        $scope.selectAll = function(){
            if($scope.selectedAll){
                for(var i in $scope.teams){
                    $scope.teams[i].selected = true;
                }
            }
            else{
                for(var i in $scope.teams){
                    $scope.teams[i].selected = false;
                }
            }
            
        };

        $scope.deleteTeams = function(){
            var isSelected=false;
            selectedTeams=[];
            for(var i in $scope.teams){
                if($scope.teams[i].selected){
                    isSelected=true;
                    selectedTeams.push($scope.teams[i].team_name);
                }
            }

            if(isSelected){
                deleteSelectedRecords();
            }
            else{
                showMessageBox(alertErorrClasses,"Error","Please select at least on record");
            }
        }


        function deleteSelectedRecords(){
                var options={
                     closeButtonText: 'Cancel',
                     actionButtonText: 'Confirm',
                     headerText: 'Delete Team',
                     bodyText: 'Are you sure you want to delete selected team/teams/?'
                }
                $scope.modalOptions=options;

                 var modalInstance = $uibModal.open({
                  animation: $scope.animationsEnabled,
                  templateUrl: 'ng-app/views/delete_modal.html',
                  controller: 'ModalInstanceCtrl',
                  size: '',
                  bindToController:true,
                  controllerAs:'TeamController',
                  scope:$scope
                });

                modalInstance.result.then(function () {
                    TeamFactory.deleteTeams(selectedTeams)
                    .success(function(res){
                        $scope.teams=res;
                        $scope.selectedAll=false;
                        showMessageBox(alertSuccessClasses,"Success","Records Deleted successfully")
                    })
                    .error(function(err){
                        showMessageBox(alertErorrClasses,"Error","Cannot process your request please try again later.")
                    })
                }
                /*, function () {
                  $log.info('Modal dismissed at: ' + new Date());
                }*/
                );

        }


/*******************************************************************************************
--Add Section
*******************************************************************************************/
        $scope.showAddTeamModal = function(){
            var options = {
            closeButtonText: 'Cancel',
            actionButtonText: 'Save',
            headerText: 'Add Team',
            bodyText: 'Team Name'
        };
        $scope.data.modalValue="";
         $scope.modalOptions=options;

         var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'ng-app/views/simple_modal.html',
          controller: 'ModalAUSCtrl',
          size: '',
          bindToController:true,
          controllerAs:'TeamController',
          scope:$scope
        });

        modalInstance.result.then(function () {
            TeamFactory.addTeam($scope.data.modalValue)
                .success(function(res){
                    var team={
                        selected:false,
                        team_name:$scope.data.modalValue
                    }
                    $scope.teams.push(team);
                    showMessageBox(alertSuccessClasses,"Success","Team Added successfully");
                    
                })
                .error(function(err){
                    var message="";
                    if(err.message.toLowerCase()==="validation error"){
                        message=" Team already exists"; 
                    }
                    else{
                        message=err.message;
                    }
                    
                    showMessageBox(alertErorrClasses,"Error",message);
                    $scope.isHide=true;
                });
        }
        /*, function () {
          $log.info('Modal dismissed at: ' + new Date());
        }*/
        );
    }

/*******************************************************************************************
--Edit Section
*******************************************************************************************/

    $scope.editItem = function(oldTeamName){

        var options = {
            closeButtonText: 'Cancel',
            actionButtonText: 'Save',
            headerText: 'Update Team',
            bodyText: 'Team Name'
        };
         $scope.modalOptions=options;
         $scope.data.modalValue=oldTeamName;

         var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'ng-app/views/simple_modal.html',
          controller: 'ModalAUSCtrl',
          size: '',
          bindToController:true,
          controllerAs:'TeamController',
          scope:$scope
        });

        modalInstance.result.then(function () {
          //Check if entered name is unique or not.
          for(var i in $scope.teams){
            if($scope.data.modalValue===$scope.teams[i].team_name){
              showMessageBox(alertErorrClasses,"Error","Team already exists");
              $scope.data.modalValue="";
              return;
            }
          }
            TeamFactory.updateTeamName($scope.data.modalValue,oldTeamName)
            .success(function(res){
               for(var i in $scope.teams){
                    if($scope.teams[i].team_name===oldTeamName){
                        $scope.teams[i].team_name=$scope.data.modalValue;
                    }
               }
                showMessageBox(alertSuccessClasses,"Success","Records Updated successfully");
                
            })
            .error(function(err){
                var message="";
                if(err.message.toLowerCase()==="validation error"){
                    message=" Cannot process your request please try again later"; 
                }
                else{
                    message=err.message;
                }
                
                showMessageBox(alertErorrClasses,"Error",message);
                $scope.isHide=true;
            });
        }
        /*, function () {
          $log.info('Modal dismissed at: ' + new Date());
        }*/
        );
    }
}]);

