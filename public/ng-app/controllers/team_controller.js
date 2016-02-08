(function(){
	var TeamController = function($scope,TeamFactory,simpleModalService,deleteModalService){

        var alertSuccessClasses="alert alert-success alert-dismissible";
        var alertErorrClasses="alert alert-danger alert-dismissible";
        var selectedTeams=[];

        $scope.sortKey="";
        $scope.reverse="";
        $scope.search="";
		$scope.selectedAll = false;
		$scope.isHide=false;
		$scope.teamName= "";
		$scope.appliedClasses="alert alert-dismissible hideIt";
		$scope.type="";
		$scope.message="";
        $scope.teams=[];

		function init(){
			TeamFactory.getTeams()
			.success(function(teams){
				var team={
					selected:false,
					team_name:""
				}

				for(var i in teams){
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
            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Confirm',
                headerText: 'Delete Team',
                bodyText: 'Are you sure you want to delete selected team/teams/?'
            };

             deleteModalService.showModal({}, modalOptions).then(function (result) {
                TeamFactory.deleteTeams(selectedTeams)
                .success(function(res){
                    $scope.teams=res;
                    
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
		$scope.showAddTeamModal = function(){
			var modalOptions = {
            closeButtonText: 'Cancel',
            actionButtonText: 'Save',
            headerText: 'Add Team',
            bodyText: 'Team Name',
            name:''
        };

        simpleModalService.showModal({}, modalOptions).then(function (result) {
        	$scope.teamName = result;
        	TeamFactory.addTeam($scope.teamName)
        	.success(function(res){
        		var team={
        			selected:false,
        			team_name:$scope.teamName
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
        });
	}

/*******************************************************************************************
--Edit Section
*******************************************************************************************/

    $scope.editItem = function(oldTeamName){

        var modalOptions = {
            closeButtonText: 'Cancel',
            actionButtonText: 'Save',
            headerText: 'Update Team',
            bodyText: 'Team Name',
            name: oldTeamName
        };

        simpleModalService.showModal({}, modalOptions).then(function (result) {
            $scope.teamName=result;

            TeamFactory.updateTeamName($scope.teamName,oldTeamName)
            .success(function(res){
               for(var i in $scope.teams){
                    if($scope.teams[i].team_name===oldTeamName){
                        $scope.teams[i].team_name=$scope.teamName;
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

	angular.module('vollyboard').controller('TeamController',TeamController);
}());