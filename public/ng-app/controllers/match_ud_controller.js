(function(){
	var MatchUpdateDeleteContorller = function($scope,MatchFactory,$uibModal,$log,$location){

		var alertSuccessClasses="alert alert-success alert-dismissible";
		var alertErorrClasses="alert alert-danger alert-dismissible";
		var selectedMatches=[];

		$scope.sortKey="";
		$scope.reverse="";
		$scope.search="";
		$scope.selectedAll = false;
		$scope.isHide=false;
		$scope.appliedClasses="alert alert-dismissible hideIt";
		$scope.type="";
		$scope.message="";
		$scope.matches=[];

		$scope.modalOptions={
			closeButtonText: 'Cancel',
			actionButtonText: 'Confirm',
			headerText: 'Delete Team',
			bodyText: 'Are you sure you want to delete selected team/teams/?'

		}
		function init(){
			MatchFactory.getMatches()
			.success(function(matches){

				for(var i in matches){
					var match={
						selected:false,
						team_a:matches[i].team_a,
						team_b:matches[i].team_b,
						referee:matches[i].referee,
						court:matches[i].court,
						match_title:matches[i].match_title,
						match_minutes:matches[i].match_minutes,
						match_seconds:matches[i].match_seconds,
						half_time_minutes:matches[i].half_time_minutes,
						half_time_seconds:matches[i].half_time_seconds,
						break_time_minutes:matches[i].break_time_minutes,
						break_time_seconds:matches[i].break_time_seconds,
						timout_time_minutes:matches[i].timout_time_minutes,
						timout_time_seconds:matches[i].timout_time_seconds,
						match_date:matches[i].match_date,
						match_status:matches[i].match_status,
						match_id:matches[i].match_id
					}
					$scope.matches.push(match);
				}
			})
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
				for(var i in $scope.matches){
					$scope.matches[i].selected = true;
				}
			}
			else{
				for(var i in $scope.matches){
					$scope.matches[i].selected = false;
				}
			}

		};

		$scope.deleteMatches = function(){
			var isSelected=false;
			selectedMatches=[];

			for(var i in $scope.matches){
				if($scope.matches[i].selected){
					isSelected=true;
					selectedMatches.push($scope.matches[i].match_id);
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
				headerText: 'Delete Match',
				bodyText: 'Are you sure you want to delete selected match/matchs?'
			};
			$scope.modalOptions=options;
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'ng-app/views/delete_modal.html',
				controller: 'ModalInstanceCtrl',
				size: '',
				bindToController:true,
				controllerAs:'MatchUpdateDeleteContorller',
				scope:$scope
			});

			modalInstance.result.then(function () {
				MatchFactory.deleteMatches(selectedMatches)
				.success(function(res){
					$scope.matches=res;
					$scope.selectedAll=false;
					showMessageBox(alertSuccessClasses,"Success","Records Deleted successfully")
				})
				.error(function(err){
					showMessageBox(alertErorrClasses,"Error","Cannot process your request please try again later.")
				})
			});
		}

		$scope.showAddMatchView = function(){
			$location.path('/match_add');
		}

		$scope.editItem = function(matchId){
			for(var i in $scope.matches){
				if($scope.matches[i].match_id==matchId){
					MatchFactory.saveMatchForUpdate($scope.matches[i]);
					break;
				}
			}

			$location.path('/match_update');
		}

	};

	angular.module('vollyboard').controller('MatchUpdateDeleteContorller',MatchUpdateDeleteContorller);
}())