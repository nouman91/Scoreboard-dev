(function(){
	var MatchUpdateController = function($scope,MatchFactory){

		var alertSuccessClasses="alert alert-success alert-dismissible";
		var alertErorrClasses="alert alert-danger alert-dismissible";

		$scope.isOpen = false;
		$scope.matchDateTime;
		$scope.teamA="";
		$scope.teamB="";
		$scope.matchTitle="";
		$scope.referee="";
		$scope.court="";
		$scope.matchMinutes;
		$scope.matchSeconds;
		$scope.breakTimeMinutes;
		$scope.breakTimeSeconds;
		$scope.halfTimeMinutes;
		$scope.halfTimeSeconds;
		$scope.newTemplate="";
		$scope.timeValues=[];
		for(var i=1;i<=60;i++){
			$scope.timeValues.push(i);
		}
		$scope.matchData=[];
		$scope.selectedTemplate="";
		$scope.matchId="";

		$scope.appliedClasses="alert alert-dismissible hideIt";

		function init(){
			MatchFactory.getDataForAddMatch()
			.success(function(matchData){
				$scope.matchData=matchData;
				setValues(MatchFactory.getMatchForUpdate());
			})

		}
		init();

		function showMessageBox(classes,type,message){

			$scope.appliedClasses = classes;
			$scope.type=type;
			$scope.message=message;
			$scope.isHide=true;

		}

		$scope.hideMessage = function(){
			$scope.appliedClasses="alert alert-dismissible hideIt";
		};


		$scope.openCalendar = function(e) {
			e.preventDefault();
			e.stopPropagation();
			$scope.isOpen = true;
		};

		$scope.submitForm = function(isValid){
			if(!isValid){
				showMessageBox(alertErorrClasses,'Error','All the fields are mandotry unless stated otherwise');
			}
			else if($scope.teamA===$scope.teamB){
				showMessageBox(alertErorrClasses,'Error','Please select different teams');
			}
			else{  // Save Match
				if(!($scope.newTemplate.length===0 || !$scope.newTemplate.trim())){
				for (var i in $scope.matchData.templates){
					if(newTemplate===scope.matchData.templates[i].template_name){
						showMessageBox(alertErorrClasses,'Error','Template already exists.Please Enter different name');
						break;
					}
				}
			}
				MatchFactory.updateMatch($scope.matchDateTime,$scope.teamA,$scope.teamB,$scope.matchTitle,$scope.referee,$scope.court,$scope.matchMinutes,$scope.matchSeconds,$scope.breakTimeMinutes,
					$scope.breakTimeSeconds,$scope.halfTimeMinutes,$scope.halfTimeSeconds,$scope.matchId)
				.success(function(res){
					showMessageBox(alertSuccessClasses,"Success","Data Saved successfully");
					$scope.matchData.templates=res;

				})
				.error(function(err){
					showMessageBox(alertErorrClasses,'Error',err);
				})
			}
	}

	function setValues(matchForUpDate){
		$scope.teamA 				= matchForUpDate.team_a;
		$scope.teamB 				= matchForUpDate.team_b; 
		$scope.referee 				= matchForUpDate.referee;
		$scope.court 				= matchForUpDate.court;
		$scope.matchTitle			= matchForUpDate.match_title;
		$scope.matchMinutes 		= matchForUpDate.match_minutes;
		$scope.matchSeconds 		= matchForUpDate.match_seconds;
		$scope.halfTimeMinutes 		= matchForUpDate.half_time_minutes;
		$scope.halfTimeSeconds 		= matchForUpDate.half_time_seconds;
		$scope.breakTimeMinutes 	= matchForUpDate.break_time_minutes;
		$scope.breakTimeSeconds 	= matchForUpDate.break_time_seconds;
		$scope.matchDateTime 		= matchForUpDate.match_date;
		$scope.matchId 				= matchForUpDate.match_id;
	}

};

angular.module('vollyboard').controller('MatchUpdateController',MatchUpdateController);
}())