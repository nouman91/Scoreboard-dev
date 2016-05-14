(function(){
	var MatchesDashboardController = function($scope,ScheduledMatchesFactory,socket){
		//$scope.stopwatches = [{ log: [],matchMinutes:2,halfTimeMinutes:1,runningMatchId:1,matchSavedTime:new Date().getTime()},{ log: [],matchMinutes:2,halfTimeMinutes:1,runningMatchId:1,matchSavedTime:new Date().getTime()},{ log: [],matchMinutes:2,halfTimeMinutes:1,runningMatchId:1,matchSavedTime:new Date().getTime()},{ log: [],matchMinutes:2,halfTimeMinutes:1,runningMatchId:1,matchSavedTime:new Date().getTime()}];
		$scope.stopwatches=[];
		$scope.watchOne=[];
		$scope.watchTwo=[];
		$scope.watchThree=[];
		$scope.watchFour=[];
		$scope.isVisible=false;
		$scope.matches=[];
		$scope.watches = [];

		var alertSuccessClasses="alert alert-success alert-dismissible";
		var alertErorrClasses="alert alert-danger alert-dismissible";
		$scope.appliedClasses="alert alert-dismissible hideIt";

		function showMessageBox(classes,type,message){

			$scope.appliedClasses = classes;
			$scope.type=type;
			$scope.message=message;
			$scope.isHide=true;

		}

		$scope.hideMessage = function(){
			$scope.appliedClasses="alert alert-dismissible hideIt";
		};

		function showEndMatchStatus(runningMatchId){
			showMessageBox(alertSuccessClasses,"Scussess","Match has been completed.");

			if(runningMatchId===$scope.watchOne[0].runningMatchId){
				$scope.$apply(function(){
					$scope.watches[0]=null;
					$scope.watchOne=[];
				});
				return;
			}

			if(runningMatchId===$scope.watchTwo[0].runningMatchId){
				$scope.$apply(function(){
					$scope.watches[1]=null;
					$scope.watchTwo=[];
				});
				return;
			}

			if(runningMatchId===$scope.watchThree[0].runningMatchId){
				$scope.$apply(function(){
					$scope.watches[2]=null;
					$scope.watchThree=[];
				});
				return;
			}

			if(runningMatchId===$scope.watchFour[0].runningMatchId){
				$scope.$apply(function(){
					$scope.watches[4]=null;
					$scope.watchFour=[];
				});
				return;
			}
		}

		function init(){
			ScheduledMatchesFactory.getMatches()
			.success(function(matches){
				if(matches.length>0){
					var i=0;
					var match={};
					match.matchMinutes 		= matches[i].matchInfo.match_minutes;
					match.matchSeconds 		= matches[i].matchInfo.match_seconds;
					match.runningMatchId 	= matches[i].runningMatchInfo.running_match_id;
					match.matchId 			= matches[i].matchInfo.match_id;
					match.matchSavedTime 	= matches[i].runningMatchInfo.saved_match_time;
					match.halfTimeMinutes 	= matches[i].matchInfo.half_time_minutes;
					match.halfTimeSeconds 	= matches[i].matchInfo.half_time_seconds;
					match.breakTimeMinutes 	= matches[i].matchInfo.break_time_minutes;
					match.breakTimeSeconds 	= matches[i].matchInfo.break_time_seconds;
					match.timeoutMinutes 	= matches[i].matchInfo.timout_time_minutes;
					match.timeoutSeconds 	= matches[i].matchInfo.timout_time_seconds;
					match.savedBreakTime 	= matches[i].runningMatchInfo.saved_break_time;
					match.savedTimeoutTime 	= matches[i].runningMatchInfo.saved_timeout_time;
					match.matchState 		= matches[i].runningMatchInfo.match_state;
					match.matchHalfState 	= matches[i].runningMatchInfo.match_halftime_state;
					match.log				= [];
					match.cls="clock-1";
					$scope.watchOne.push(match);

					//hook for scores
					//socket.on('score updates'+$scope.watchOne.runningMatchId,updateScoreFirst);
			        //socket.on('match ended'+$scope.watchOne.runningMatchId,showEndMatchStatusFirst);

				}

				if(matches.length>1){
					var i=1;
					var matchTwo={};
					matchTwo.matchMinutes 		= matches[i].matchInfo.match_minutes;
					matchTwo.matchSeconds 		= matches[i].matchInfo.match_seconds;
					matchTwo.runningMatchId 	= matches[i].runningMatchInfo.running_match_id;
					matchTwo.matchId 			= matches[i].matchInfo.match_id;
					matchTwo.matchSavedTime 	= matches[i].runningMatchInfo.saved_match_time;
					matchTwo.halfTimeMinutes 	= matches[i].matchInfo.half_time_minutes;
					matchTwo.halfTimeSeconds 	= matches[i].matchInfo.half_time_seconds;
					matchTwo.breakTimeMinutes 	= matches[i].matchInfo.break_time_minutes;
					matchTwo.breakTimeSeconds 	= matches[i].matchInfo.break_time_seconds;
					matchTwo.savedBreakTime 	= matches[i].runningMatchInfo.saved_break_time;
					matchTwo.savedTimeoutTime 	= matches[i].runningMatchInfo.saved_timeout_time;
					matchTwo.timeoutMinutes 	= matches[i].matchInfo.timout_time_minutes;
					matchTwo.timeoutSeconds 	= matches[i].matchInfo.timout_time_seconds;
					matchTwo.matchState 		= matches[i].runningMatchInfo.match_state;
					matchTwo.matchHalfState 	= matches[i].runningMatchInfo.match_halftime_state;
					matchTwo.log				= [];
					$scope.watchTwo.push(matchTwo);

					//hook for scores
					//socket.on('score updates'+$scope.watchTwo.runningMatchId,updateScoreSecond);
			        //socket.on('match ended'+$scope.watchTwo.runningMatchId,showEndMatchStatusSecond);
				}

				if(matches.length>2){
					var i=2;
					var matchThree={};
					matchThree.matchMinutes 		= matches[i].matchInfo.match_minutes;
					matchThree.matchSeconds 		= matches[i].matchInfo.match_seconds;
					matchThree.runningMatchId 	= matches[i].runningMatchInfo.running_match_id;
					matchThree.matchId 			= matches[i].matchInfo.match_id;
					matchThree.matchSavedTime 	= matches[i].runningMatchInfo.saved_match_time;
					matchThree.halfTimeMinutes 	= matches[i].matchInfo.half_time_minutes;
					matchThree.halfTimeSeconds 	= matches[i].matchInfo.half_time_seconds;
					matchThree.breakTimeMinutes 	= matches[i].matchInfo.break_time_minutes;
					matchThree.timeoutMinutes 	= matches[i].matchInfo.timout_time_minutes;
					matchThree.timeoutSeconds 	= matches[i].matchInfo.timout_time_seconds;
					matchThree.breakTimeSeconds 	= matches[i].matchInfo.break_time_seconds;
					matchThree.savedBreakTime 	= matches[i].runningMatchInfo.saved_break_time;
					matchThree.savedTimeoutTime 	= matches[i].runningMatchInfo.saved_timeout_time;
					matchThree.matchState 		= matches[i].runningMatchInfo.match_state;
					matchThree.matchHalfState 	= matches[i].runningMatchInfo.match_halftime_state;
					matchThree.log				= [];
					$scope.watchThree.push(matchThree);

										//hook for scores
					//socket.on('score updates'+$scope.watchThree.runningMatchId,updateScoreThree);
			        //socket.on('match ended'+$scope.watchThree.runningMatchId,showEndMatchStatusThree);
				}

				if(matches.length>3){
					var i=3;
					var matchFour={};
					matchFour.matchMinutes 		= matches[i].matchInfo.match_minutes;
					matchFour.matchSeconds 		= matches[i].matchInfo.match_seconds;
					matchFour.runningMatchId 	= matches[i].runningMatchInfo.running_match_id;
					matchFour.matchId 			= matches[i].matchInfo.match_id;
					matchFour.matchSavedTime 	= matches[i].runningMatchInfo.saved_match_time;
					matchFour.halfTimeMinutes 	= matches[i].matchInfo.half_time_minutes;
					matchFour.halfTimeSeconds 	= matches[i].matchInfo.half_time_seconds;
					matchFour.breakTimeMinutes 	= matches[i].matchInfo.break_time_minutes;
					matchFour.breakTimeSeconds 	= matches[i].matchInfo.break_time_seconds;
					matchFour.timeoutMinutes 	= matches[i].matchInfo.timout_time_minutes;
					matchFour.timeoutSeconds 	= matches[i].matchInfo.timout_time_seconds;
					matchFour.savedBreakTime 	= matches[i].runningMatchInfo.saved_break_time;
					matchFour.savedTimeoutTime 	= matches[i].runningMatchInfo.saved_timeout_time;
					matchFour.matchState 		= matches[i].runningMatchInfo.match_state;
					matchFour.matchHalfState 	= matches[i].runningMatchInfo.match_halftime_state;
					matchFour.log				= [];
					$scope.watchFour.push(matchFour);

					//socket.on('score updates'+$scope.watchFour.runningMatchId,updateScoreFour);
			        //socket.on('match ended'+$scope.watchFour.runningMatchId,showEndMatchStatusFour);
				}

				if($scope.watchOne.length>0){
					$scope.watches.push($scope.watchOne);
				}
				if($scope.watchTwo.length>0){
					$scope.watches.push($scope.watchTwo);
				}
				if($scope.watchThree.length>0){
					$scope.watches.push($scope.watchThree);
				}
				if($scope.watchFour.length>0){
					$scope.watches.push($scope.watchFour);
				}
				
				//$scope.watches.push(0);
				//$scope.watches.push(1);
				//$scope.watches.push(temp);

				$scope.matches=matches;
				$scope.isVisible=true;

				hookScoreUpdateEvents();
			})
		}
		init();

		$scope.incrementTeamAScore = function(index,runningMatchId){
			var score = $scope.matches[index].runningMatchInfo.team_a_score;
			score = score+1;
			ScheduledMatchesFactory.updateScore(score,$scope.matches[index].runningMatchInfo.team_b_score,runningMatchId)
			.success(function(match){

				$scope.matches[index].runningMatchInfo.team_a_score = score; 

				var data={teamAScore:score,teamBScore:$scope.matches[index].runningMatchInfo.team_b_score,runningMatchId:runningMatchId};
				socket.emit('update score',data);
			})
			.error(function(err){

			})
		}

		$scope.decrementTeamAScore = function(index,runningMatchId){
			var score = $scope.matches[index].runningMatchInfo.team_a_score;
			score = score-1;
			ScheduledMatchesFactory.updateScore(score,$scope.matches[index].runningMatchInfo.team_b_score,runningMatchId)
			.success(function(match){
				$scope.matches[index].runningMatchInfo.team_a_score = score; 

				var data={teamAScore:score,teamBScore:$scope.matches[index].runningMatchInfo.team_b_score,runningMatchId:runningMatchId};
				socket.emit('update score',data);
			})
			.error(function(err){

			})
		}



		$scope.incrementTeamBScore = function(index,runningMatchId){
			var score = $scope.matches[index].runningMatchInfo.team_b_score;
			score = score+1;
			ScheduledMatchesFactory.updateScore($scope.matches[index].runningMatchInfo.team_a_score,score,runningMatchId)
			.success(function(match){

				$scope.matches[index].runningMatchInfo.team_b_score = score; 

				var data={teamAScore:$scope.matches[index].runningMatchInfo.team_a_score,teamBScore:score,runningMatchId:runningMatchId};
				socket.emit('update score',data);
			})
			.error(function(err){

			})
		}

		$scope.decrementTeamBScore = function(index,runningMatchId){
			var score = $scope.matches[index].runningMatchInfo.team_b_score;
			score = score-1;
			ScheduledMatchesFactory.updateScore($scope.matches[index].runningMatchInfo.team_a_score,score,runningMatchId)
			.success(function(match){
				$scope.matches[index].runningMatchInfo.team_b_score = score; 

				var data={teamAScore:$scope.matches[index].runningMatchInfo.team_a_score,teamBScore:score,runningMatchId:runningMatchId};
				socket.emit('update score',data);
			})
			.error(function(err){

			})
		}


		function hookScoreUpdateEvents(){
			for(var i in $scope.matches){
				//hooking events
				socket.on('score updates'+$scope.matches[i].runningMatchInfo.running_match_id,updateScore);
				socket.on('match ended'+$scope.matches[i].runningMatchInfo.running_match_id,showEndMatchStatus);
			}
		}



		//calback
		function updateScore(data){

			$scope.$apply(function(){
				for(var i in $scope.matches){
					if($scope.matches[i].runningMatchInfo.running_match_id===data.runningMatchId){
						$scope.matches[i].runningMatchInfo.team_a_score=data.teamAScore;
						$scope.matches[i].runningMatchInfo.team_b_score=data.teamBScore;
					}
				}
			})

		}

		

		
	};
angular.module('vollyboard').controller('MatchesDashboardController',MatchesDashboardController);
}())