(function(){
	var RefereeController = function($scope,RefereeFactory,$uibModal,$log){

		var alertSuccessClasses="alert alert-success alert-dismissible";
        var alertErorrClasses="alert alert-danger alert-dismissible";
        var selectedReferees=[];

        $scope.sortKey="";
        $scope.reverse="";
        $scope.search="";
		$scope.selectedAll = false;
		$scope.isHide=false;
		$scope.userName= "";
		$scope.appliedClasses="alert alert-dismissible hideIt";
		$scope.type="";
		$scope.message="";
		$scope.referees=[];
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
			RefereeFactory.getReferees()
			.success(function(referees){
				

				for(var i in referees){
                    var referee={
                    selected:false,
                    user_name:""
                }
					referee.user_name=referees[i].user_name;
					$scope.referees.push(referee);
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
        		for(var i in $scope.referees){
        			$scope.referees[i].selected = true;
        		}
        	}
        	else{
        		for(var i in $scope.referees){
        			$scope.referees[i].selected = false;
        		}
        	}
        	
        };

        $scope.deleteReferees = function(){
        	var isSelected=false;
            selectedReferees=[];
        	for(var i in $scope.referees){
        		if($scope.referees[i].selected){
        			isSelected=true;
                    selectedReferees.push($scope.referees[i].user_name);
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
            var options = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Confirm',
                headerText: 'Delete Referee',
                bodyText: 'Are you sure you want to delete selected Referee/Referees?'
            };
            $scope.modalOptions=options;

                 var modalInstance = $uibModal.open({
                  animation: $scope.animationsEnabled,
                  templateUrl: 'ng-app/views/delete_modal.html',
                  controller: 'ModalInstanceCtrl',
                  size: '',
                  bindToController:true,
                  controllerAs:'RefereeController',
                  scope:$scope
                });

             $scope.modalOptions=options;
             modalInstance.result.then(function () {
                RefereeFactory.deleteReferees(selectedReferees)
                .success(function(res){
                    $scope.referees=res;
                    $scope.selectedAll=false;
                    showMessageBox(alertSuccessClasses,"Success","Records Deleted successfully")
                })
                .error(function(err){
                    showMessageBox(alertErorrClasses,"Error","Cannot process your request please try again later.")
                })
            });
        }

        /*******************************************************************************************
		--Add Section
		*******************************************************************************************/
		$scope.showAddRefereeModal = function(){
			var options = {
            closeButtonText: 'Cancel',
            actionButtonText: 'Save',
            headerText: 'Add Referee',
            bodyText: 'Referee User Name',
        };
         $scope.data.modalValue="";
         $scope.modalOptions=options;
         var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'ng-app/views/simple_modal.html',
          controller: 'ModalAUSCtrl',
          size: '',
          bindToController:true,
          controllerAs:'RefereeController',
          scope:$scope
        });

         modalInstance.result.then(function () {
        	RefereeFactory.addReferee($scope.data.modalValue)
        	.success(function(res){
        		var referee={
        			selected:false,
        			user_name:$scope.data.modalValue
        		}
        		$scope.referees.push(referee);
        		showMessageBox(alertSuccessClasses,"Success","Referee Added successfully");
        		
        	})
        	.error(function(err){
        		var message="";
        		if(err.message.toLowerCase()==="validation error"){
        			message=" Referee already exists";	
        		}
        		else{
        			message=err.message;
        		}
        		
        		showMessageBox(alertErorrClasses,"Error",message);
        		$scope.isHide=true;
        	});
        });
	}

	/*******************************************************************************************
	--Edit Section
	*******************************************************************************************/

    $scope.editItem = function(oldUserName){

        var options = {
            closeButtonText: 'Cancel',
            actionButtonText: 'Save',
            headerText: 'Update Referee User Name',
            bodyText: 'Referee User Name'
        };
         $scope.modalOptions=options;
         $scope.data.modalValue=oldUserName;

        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'ng-app/views/simple_modal.html',
          controller: 'ModalAUSCtrl',
          size: '',
          bindToController:true,
          controllerAs:'RefereeController',
          scope:$scope
        });

        modalInstance.result.then(function () {
          //Check if entered name is unique or not.
          for(var i in $scope.referees){
            if($scope.data.modalValue===$scope.referees[i].user_name){
              showMessageBox(alertErorrClasses,"Error","Referee already exists");
              $scope.data.modalValue="";
              return;
            }
          }
            RefereeFactory.updateUserName( $scope.data.modalValue,oldUserName)
            .success(function(res){
               for(var i in $scope.referees){
                    if($scope.referees[i].user_name===oldUserName){
                        $scope.referees[i].user_name= $scope.data.modalValue;
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
        });
    }


//***********************END

	};

	angular.module('vollyboard').controller('RefereeController',RefereeController);
}());