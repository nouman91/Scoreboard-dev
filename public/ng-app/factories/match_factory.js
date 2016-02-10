(function(){
	var MatchFactory = function($http){
		var service="match";
		var factory={};
		var matchForUpdate =[];

		factory.getDataForAddMatch = function(){
			var req={
				method:'GET',
				url:'app/match',
				params:{service:service,operation:'getaddmatch'}
			}
			return $http(req);
		}

		factory.addNewMatch = function(matchDateTime,teamA,teamB,matchTitle,referee,court,matchMinutes,matchSeconds,breakTimeMinutes,breakTimeSeconds,halfTimeMinutes,halfTimeSeconds,newTemplate){
			var req={
				method:'POST',
				url:'app/match',
				data:{service:service, matchDateTime:matchDateTime,teamA:teamA,teamB:teamB,matchTitle:matchTitle,referee:referee,court:court,matchMinutes:matchMinutes,matchSeconds:matchSeconds,breakTimeMinutes:breakTimeMinutes,breakTimeSeconds:breakTimeSeconds,halfTimeMinutes:halfTimeMinutes,halfTimeSeconds:halfTimeSeconds,newTemplate:newTemplate}
			}
			return $http(req);
		}

		factory.getMatches = function(){
			var req={
				method:'GET',
				url:'app/match',
				params:{service:service,operation:'getdmatches'}
			}
			return $http(req);

		}

		factory.deleteMatches  = function(matches){
			var req={
				method:'DELETE',
				url:'app/match',
				data:{service:service,matches:matches},
				headers: {"Content-Type": "application/json;charset=utf-8"}
			}
			return $http(req);
		}
		factory.updateMatch = function(matchDateTime,teamA,teamB,matchTitle,referee,court,matchMinutes,matchSeconds,breakTimeMinutes,breakTimeSeconds,halfTimeMinutes,halfTimeSeconds,matchId){
			var req={
				method:'PUT',
				url:'app/match',
				data:{service:service, matchDateTime:matchDateTime,teamA:teamA,teamB:teamB,matchTitle:matchTitle,referee:referee,court:court,matchMinutes:matchMinutes,matchSeconds:matchSeconds,breakTimeMinutes:breakTimeMinutes,breakTimeSeconds:breakTimeSeconds,halfTimeMinutes:halfTimeMinutes,halfTimeSeconds:halfTimeSeconds,matchId:matchId}
			}
			return $http(req);
		}
		factory.saveMatchForUpdate = function(match){
			matchForUpdate=match;
		}


		factory.getMatchForUpdate = function(match){
			return matchForUpdate;
		}
		return factory;
	}


	angular.module('vollyboard').factory('MatchFactory',MatchFactory);
}())