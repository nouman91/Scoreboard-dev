(function(){
	var ScheduledMatchesFactory = function($http){
		var factory={}
		var service = "schedule_match";
		var operation = "getmatches";

		factory.getMatches = function(){
			var req={
				method:'GET',
				url:'app/schedule_match',
				params:{service:service,operation:operation}
			}
			return $http(req);
		}

		factory.getRefereeMatch = function(userName){
			var req={
				method:'GET',
				url:'app/schedule_match',
				params:{service:service,operation:"getrefereematch",referee:userName}
			}
			return $http(req);
		}

		factory.scheduleMatch = function(matchId){
			var req={
				method:'POST',
				url:'app/schedule_match',
				data:{service:service,operation:"scheduleMatch",matchId:matchId}
			}
			return $http(req);
		}


		factory.updateScore = function(teamAScore,teamBScore,runningMatchId){
			var req={
				method:'PUT',
				url:'app/schedule_match',
				data:{service:service,operation:"updateScore",teamAScore:teamAScore,teamBScore:teamBScore,runningMatchId:runningMatchId}
			}
			return $http(req);

		}

		factory.updateMatchStatusAndDate = function(runningMatchId,matchId,date){
			var req={
				method:'PUT',
				url:'app/schedule_match',
				data:{service:service,operation:"updatematchtimeandstatus",runningMatchId:runningMatchId,matchId:matchId,date:date}
			}
			return $http(req);

		}

		factory.setMatchAsFinished = function(runningMatchId,matchId){
			var req={
				method:'PUT',
				url:'app/schedule_match',
				data:{service:service,operation:"setmatchasfinished",runningMatchId:runningMatchId,matchId:matchId}
			}
			return $http(req);

		}

		factory.updateMatchTime=function(matchSavedTime,runningMatchId){
			var req={
				method:'PUT',
				url:'app/schedule_match',
				data:{service:service,operation:"updatematchtime",matchSavedTime:matchSavedTime,runningMatchId:runningMatchId}
			}
			return $http(req);
		}


		factory.updateBreakMatchState = function(state,date,runningMatchId){
			var req={
				method:'PUT',
				url:'app/schedule_match',
				data:{service:service,operation:"updatebreakmatchstate",state:state,date:date,runningMatchId:runningMatchId}
			}
			return $http(req);
		}

		factory.updateTimeoutMatchState = function(state,date,runningMatchId){
			var req={
				method:'PUT',
				url:'app/schedule_match',
				data:{service:service,operation:"updatetimeoutmatchstate",state:state,date:date,runningMatchId:runningMatchId}
			}
			return $http(req);
		}

		factory.getCourtMatch= function (court){
			var req={
				method:'GET',
				url:'app/schedule_match',
				params:{service:service,operation:"getcourtmatch",court:court}
			}
			return $http(req);
		}


		return factory;
	}
angular.module('vollyboard').factory('ScheduledMatchesFactory',ScheduledMatchesFactory);
}());