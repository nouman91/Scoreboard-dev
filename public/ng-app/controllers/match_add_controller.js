(function(){
	var MatchAddContorller = function($scope,MatchFactory){

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
		$scope.timeOutMinutes;
		$scope.timeOutSeconds;
		$scope.newTemplate="";
		$scope.timeValues=[];
		$scope.secondValues=[];
		$scope.secondValues.push(0);
		for(var i=1;i<=60;i++){
			$scope.timeValues.push(i);
			if(i<=59){
				$scope.secondValues.push(i);
			}
		}
		$scope.matchData=[];
		$scope.selectedTemplate="";

		$scope.appliedClasses="alert alert-dismissible hideIt";

		function init(){
			MatchFactory.getDataForAddMatch()
			.success(function(matchData){
				$scope.matchData=matchData;
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
					if($scope.newTemplate===$scope.matchData.templates[i].template_name){
						showMessageBox(alertErorrClasses,'Error','Template already exists.Please Enter different name');
						break;
					}
				}
			}
				MatchFactory.addNewMatch($scope.matchDateTime,$scope.teamA,$scope.teamB,$scope.matchTitle,$scope.referee,$scope.court,$scope.matchMinutes,$scope.matchSeconds,$scope.breakTimeMinutes,
					$scope.breakTimeSeconds,$scope.halfTimeMinutes,$scope.halfTimeSeconds,$scope.newTemplate,$scope.timeOutMinutes,$scope.timeOutSeconds)
				.success(function(res){
					showMessageBox(alertSuccessClasses,"Success","Data Saved successfully");
					$scope.matchData.templates=res;
					clearFormValues();

				})
				.error(function(err){
					showMessageBox(alertErorrClasses,'Error',err);
				})
			}
	}

	$scope.update = function(){
		if(!($scope.selectedTemplate.length===0 || !$scope.selectedTemplate.trim())){
			for(var i in $scope.matchData.templates){
			if($scope.selectedTemplate===$scope.matchData.templates[i].template_name){
				$scope.teamA 				= $scope.matchData.templates[i].team_a;
				$scope.teamB 				= $scope.matchData.templates[i].team_b; 
				$scope.referee 				= $scope.matchData.templates[i].referee;
				$scope.court 				= $scope.matchData.templates[i].court;
				$scope.matchTitle			= $scope.matchData.templates[i].match_title;
				$scope.matchMinutes 		= $scope.matchData.templates[i].match_minutes;
				$scope.matchSeconds 		= $scope.matchData.templates[i].match_seconds;
				$scope.halfTimeMinutes 		= $scope.matchData.templates[i].half_time_minutes;
				$scope.halfTimeSeconds 		= $scope.matchData.templates[i].half_time_seconds;
				$scope.breakTimeMinutes 	= $scope.matchData.templates[i].break_time_minutes;
				$scope.breakTimeSeconds 	= $scope.matchData.templates[i].break_time_seconds;
				$scope.timeOutMinutes 		= $scope.matchData.templates[i].timout_time_minutes;
				$scope.timeOutSeconds 		= $scope.matchData.templates[i].timout_time_seconds;
				$scope.matchDateTime 		= $scope.matchData.templates[i].match_date;			
			}
		}
		}
		else{
			$scope.teamA 				= "";
			$scope.teamB 				= "";
			$scope.referee 				= "";
			$scope.court 				= "";
			$scope.matchTitle			= "";
			$scope.matchMinutes 		= null;
			$scope.matchSeconds 		= null;
			$scope.halfTimeMinutes 		= null;
			$scope.halfTimeSeconds 		= null;
			$scope.breakTimeMinutes 	= null;
			$scope.breakTimeSeconds 	= null;
			$scope.timeOutMinutes 		= null;
			$scope.timeOutSeconds 		= null;
			$scope.matchDateTime 		= null;
			$scope.newTemplate="";
		}
		
	}
	$scope.reset = function(){
		clearFormValues();
	}
	function clearFormValues(){
		$scope.teamA 				= "";
		$scope.teamB 				= "";
		$scope.referee 				= "";
		$scope.court 				= "";
		$scope.matchTitle			= "";
		$scope.matchMinutes 		= null;
		$scope.matchSeconds 		= null;
		$scope.halfTimeMinutes 		= null;
		$scope.halfTimeSeconds 		= null;
		$scope.breakTimeMinutes 	= null;
		$scope.breakTimeSeconds 	= null;
		$scope.timeOutMinutes 		= null;
		$scope.timeOutSeconds 		= null;
		$scope.matchDateTime 		= null;
		$scope.newTemplate="";
	}

};

angular.module('vollyboard').controller('MatchAddContorller',MatchAddContorller);
}())