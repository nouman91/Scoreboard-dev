(function(){
	var RefereeMatchController = function($scope,socket,RefereeFactory,$routeParams,ScheduledMatchesFactory){
		$scope.message=[];
		$scope.watch=[];

		$scope.referees=[];
		$scope.referee=$routeParams.userName;
		$scope.match=[];

		var alertSuccessClasses="alert alert-success alert-dismissible";
		var alertErorrClasses="alert alert-danger alert-dismissible";
		$scope.appliedClasses="alert alert-dismissible hideIt";

		function init(){
			ScheduledMatchesFactory.getRefereeMatch($scope.referee)
				.success(function(res){
					if(res.length>0){
					var match={};
					match.matchMinutes 		= res[0].matchInfo[0].match_minutes;
					match.matchSeconds 		= res[0].matchInfo[0].match_seconds;
					match.runningMatchId 	= res[0].runningMatchInfo.running_match_id;
					match.matchId 			= res[0].matchInfo[0].match_id;
					match.matchSavedTime 	= res[0].runningMatchInfo.saved_match_time;
					match.halfTimeMinutes 	= res[0].matchInfo[0].half_time_minutes;
					match.halfTimeSeconds 	= res[0].matchInfo[0].half_time_seconds;
					match.breakTimeMinutes 	= res[0].matchInfo[0].break_time_minutes;
					match.breakTimeSeconds 	= res[0].matchInfo[0].break_time_seconds;
					match.timeoutMinutes 	= res[0].matchInfo[0].timout_time_minutes;
					match.timeoutSeconds 	= res[0].matchInfo[0].timout_time_seconds;
					match.savedBreakTime 	= res[0].runningMatchInfo.saved_break_time;
					match.savedTimeoutTime 	= res[0].runningMatchInfo.saved_timeout_time;
					match.matchState 		= res[0].runningMatchInfo.match_state;
					match.matchHalfState 	= res[0].runningMatchInfo.match_halftime_state;
					match.log				= [];

					$scope.watch.push(match);
					$scope.match = res[0];
					hookScoreUpdateEvents();
				}
				else{
					showMessageBox("alert alert-danger alert-dismissible",'Error','No mathces found');
				}

					//showMessageBox(alertSuccessClasses,'Success','Match Loaded successfuly');
					

				})
				.error(function(err){
					showMessageBox("alert alert-danger alert-dismissible",'Error','Some error occured pleae try again later');
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

		/*$scope.getRefereeMatch = function(isValid){
			if(isValid){
				ScheduledMatchesFactory.getRefereeMatch($scope.referee)
				.success(function(res){
					var match={};
					match.matchMinutes 		= res[0].matchInfo.match_minutes;
					match.matchSeconds 		= res[0].matchInfo.match_seconds;
					match.runningMatchId 	= res[0].runningMatchInfo.running_match_id;
					match.matchSavedTime 	= res[0].runningMatchInfo.saved_match_time;
					match.halfTimeMinutes 	= res[0].matchInfo.half_time_minutes;
					match.halfTimeSeconds 	= res[0].matchInfo.half_time_seconds;
					match.log				= [];

					$scope.watch=match;
					$scope.match = res[0];

					showMessageBox(alertSuccessClasses,'Success','Match Loaded successfuly');
					hookScoreUpdateEvents();

				})
				.error(function(err){
					showMessageBox(alertErorrClassesClasses,'Error','Some error occured pleae try again later');
				})
			}
		}*/

		function hookScoreUpdateEvents(){
			socket.on('score updates'+$scope.match.runningMatchInfo.running_match_id,updateScore);
			socket.on('match ended'+$scope.match.runningMatchInfo.running_match_id,showEndMatchStatus);
		}

		function showEndMatchStatus(){
			showMessageBox(alertSuccessClasses,"Scussess","Match has been completed. Refresh the screen or use the fetch button to get latest match");
			$scope.$apply(function(){
				$scope.watch=[];
			})
			
		}

		function updateScore(data){
			$scope.$apply(function(){
				$scope.match.runningMatchInfo.team_a_score=data.teamAScore;
				$scope.match.runningMatchInfo.team_b_score=data.teamBScore;
			})
		}
		

		$scope.incrementTeamAScore = function(){
			var score = $scope.match.runningMatchInfo.team_a_score;
			score = score+1;
			ScheduledMatchesFactory.updateScore(score,$scope.match.runningMatchInfo.team_b_score,$scope.match.runningMatchInfo.running_match_id)
			.success(function(match){

				$scope.match.runningMatchInfo.team_a_score = score; 

				var data={teamAScore:score,teamBScore:$scope.match.runningMatchInfo.team_b_score,runningMatchId:$scope.match.runningMatchInfo.running_match_id};
				socket.emit('update score',data);
			})
			.error(function(err){

			})
		}

		$scope.decrementTeamAScore = function(){
			var score = $scope.match.runningMatchInfo.team_a_score;
			score = score-1;
			ScheduledMatchesFactory.updateScore(score,$scope.match.runningMatchInfo.team_b_score,$scope.match.runningMatchInfo.running_match_id)
			.success(function(match){
				$scope.match.runningMatchInfo.team_a_score = score; 

				var data={teamAScore:score,teamBScore:$scope.match.runningMatchInfo.team_b_score,runningMatchId:$scope.match.runningMatchInfo.running_match_id};
				socket.emit('update score',data);
			})
			.error(function(err){

			})
		}



		$scope.incrementTeamBScore = function(){
			var score = $scope.match.runningMatchInfo.team_b_score;
			score = score+1;
			ScheduledMatchesFactory.updateScore($scope.match.runningMatchInfo.team_a_score,score,$scope.match.runningMatchInfo.running_match_id)
			.success(function(match){

				$scope.match.runningMatchInfo.team_b_score = score; 

				var data={teamAScore:$scope.match.runningMatchInfo.team_a_score,teamBScore:score,runningMatchId:$scope.match.runningMatchInfo.running_match_id};
				socket.emit('update score',data);
			})
			.error(function(err){

			})
		}

		$scope.decrementTeamBScore = function(){
			var score = $scope.match.runningMatchInfo.team_b_score;
			score = score-1;
			ScheduledMatchesFactory.updateScore($scope.match.runningMatchInfo.team_a_score,score,$scope.match.runningMatchInfo.running_match_id)
			.success(function(match){
				$scope.match.runningMatchInfo.team_b_score = score; 

				var data={teamAScore:$scope.match.runningMatchInfo.team_a_score,teamBScore:score,runningMatchId:$scope.match.runningMatchInfo.running_match_id};
				socket.emit('update score',data);
			})
			.error(function(err){

			})
		}

	};

	angular.module('vollyboard').controller('RefereeMatchController',RefereeMatchController);
}());