(function(){
	var MatchTitleController = function($scope,MatchTitleFactory,simpleModalService,deleteModalService){

		var alertSuccessClasses="alert alert-success alert-dismissible";
        var alertErorrClasses="alert alert-danger alert-dismissible";
        var selectedMatchTitles=[];

        $scope.sortKey="";
        $scope.reverse="";
        $scope.search="";
        $scope.selectedAll = false;
		$scope.isHide=false;
		$scope.matchTitle= "";
		$scope.appliedClasses="alert alert-dismissible hideIt";
		$scope.type="";
		$scope.message="";
		$scope.matchTitles=[];

		function init(){
			MatchTitleFactory.getMatchTitles()
			.success(function(matchTitles){
				var matchTitle={
                    selected:false,
                    title:""
                }

                for(var i in matchTitles){
                    matchTitle.title=matchTitles[i].title;
                    $scope.matchTitles.push(matchTitle);
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
        		for(var i in $scope.matchTitles){
        			$scope.matchTitles[i].selected = true;
        		}
        	}
        	else{
        		for(var i in $scope.matchTitles){
        			$scope.matchTitles[i].selected = false;
        		}
        	}
        	
        };

        $scope.deleteMatchTitles = function(){
        	var isSelected=false;
        	selectedMatchTitles=[];
        	for(var i in $scope.matchTitles){
        		if($scope.matchTitles[i].selected){
        			isSelected=true;
                    selectedMatchTitles.push($scope.matchTitles[i].title);
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
                headerText: 'Delete Match title',
                bodyText: 'Are you sure you want to delete selected match title/titles?'
            };

             deleteModalService.showModal({}, modalOptions).then(function (result) {
                MatchTitleFactory.deleteMatchTitles(selectedMatchTitles)
                .success(function(res){
                    $scope.matchTitles=res;
                    
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
		$scope.showAddMatchTitleModal = function(){
			var modalOptions = {
            closeButtonText: 'Cancel',
            actionButtonText: 'Save',
            headerText: 'Match Title',
            bodyText: 'Match Title',
            name:''
        };

        simpleModalService.showModal({}, modalOptions).then(function (result) {
        	$scope.matchTitle = result;
        	MatchTitleFactory.addMatchTitle($scope.matchTitle)
        	.success(function(res){
        		var matchTitle={
        			selected:false,
        			title:$scope.matchTitle
        		}
        		$scope.matchTitles.push(matchTitle);
        		showMessageBox(alertSuccessClasses,"Success","Match Title Added successfully");
        		
        	})
        	.error(function(err){
        		var message="";
        		if(err.message.toLowerCase()==="validation error"){
        			message=" Match Title already exists";	
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

    $scope.editItem = function(oldMatchTitle){

        var modalOptions = {
            closeButtonText: 'Cancel',
            actionButtonText: 'Save',
            headerText: 'Update Match Title',
            bodyText: 'Match Title',
            name: oldMatchTitle
        };

        simpleModalService.showModal({}, modalOptions).then(function (result) {
            $scope.matchTitle=result;

            MatchTitleFactory.updateMatchTitle($scope.matchTitle,oldMatchTitle)
            .success(function(res){
               for(var i in $scope.matchTitles){
                    if($scope.matchTitles[i].title===oldMatchTitle){
                        $scope.matchTitles[i].title=$scope.matchTitle;
                    }
               }
                showMessageBox(alertSuccessClasses,"Success","Records Updated successfully");
                
            })
            .error(function(err){
                var message="";
                if(err.message.toLowerCase()==="validation error"){
                    message=" Match Title already exists"; 
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

	angular.module('vollyboard').controller('MatchTitleController',MatchTitleController);
}());