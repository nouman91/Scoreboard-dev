(function(){
	var RefereeController = function($scope,RefereeFactory,simpleModalService,deleteModalService){

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

		function init(){
			RefereeFactory.getReferees()
			.success(function(referees){
				var referee={
					selected:false,
					user_name:""
				}

				for(var i in referees){
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
            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Confirm',
                headerText: 'Delete Referee',
                bodyText: 'Are you sure you want to delete selected Referee/Referees?'
            };

             deleteModalService.showModal({}, modalOptions).then(function (result) {
                RefereeFactory.deleteReferees(selectedReferees)
                .success(function(res){
                    $scope.referees=res;
                    
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
			var modalOptions = {
            closeButtonText: 'Cancel',
            actionButtonText: 'Save',
            headerText: 'Add Referee',
            bodyText: 'Referee User Name',
            name:''
        };

        simpleModalService.showModal({}, modalOptions).then(function (result) {
        	$scope.userName = result;
        	RefereeFactory.addReferee($scope.userName)
        	.success(function(res){
        		var referee={
        			selected:false,
        			user_name:$scope.userName
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

        var modalOptions = {
            closeButtonText: 'Cancel',
            actionButtonText: 'Save',
            headerText: 'Update Referee User Name',
            bodyText: 'Referee User Name',
            name: oldUserName
        };

        simpleModalService.showModal({}, modalOptions).then(function (result) {
            $scope.userName=result;

            RefereeFactory.updateUserName($scope.userName,oldUserName)
            .success(function(res){
               for(var i in $scope.referees){
                    if($scope.referees[i].user_name===oldUserName){
                        $scope.referees[i].user_name=$scope.userName;
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