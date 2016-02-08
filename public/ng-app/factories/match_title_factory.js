(function(){
	var MatchTitleFactory = function($http){
		var service="match_title";
		var factory={};

		factory.getMatchTitles=function(){
			var req={
				method:'GET',
				url:'app/match_title',
				params:{service:service}
			}
			return $http(req);
		}

		factory.addMatchTitle = function(matchTitle){
			var req={
				method:'POST',
				url:'app/match_title',
				data:{service:service, matchTitle:matchTitle}
			}
			return $http(req);
		}

		factory.deleteMatchTitles = function(matchTitles) {
			var req={
				method:'DELETE',
				url:'app/match_title',
				data:{service:service, matchTitles:matchTitles},
				 headers: {"Content-Type": "application/json;charset=utf-8"}
			}
			return $http(req);
		}

		factory.updateMatchTitle = function(matchTitle,oldMatchTitle){
			var req={
				method:'PUT',
				url:'app/match_title',
				data:{service:service, matchTitle:matchTitle,oldMatchTitle:oldMatchTitle}
			}

			return $http(req);
		}

		return factory;
	};

	angular.module('vollyboard').factory('MatchTitleFactory',MatchTitleFactory);
}());