(function(){
	var TeamFactory = function($http){
		var service="team";
		var factory={};

		factory.getTeams=function(){
			var req={
				method:'GET',
				url:'app/teams',
				params:{service:service}
			}
			return $http(req);
		}

		factory.addTeam = function(teamName){
			var req={
				method:'POST',
				url:'app/teams',
				data:{service:service, teamName:teamName}
			}
			return $http(req);
		}


		factory.deleteTeams = function(teams) {
			var req={
				method:'DELETE',
				url:'app/teams',
				data:{service:service, teams:teams},
				 headers: {"Content-Type": "application/json;charset=utf-8"}
			}
			return $http(req);
		}

		factory.updateTeamName = function(teamName,oldTeamName){
			var req={
				method:'PUT',
				url:'app/teams',
				data:{service:service, teamName:teamName,oldTeamName:oldTeamName}
			}

			return $http(req);
		}

		return factory;
	};

	angular.module('vollyboard').factory('TeamFactory',TeamFactory);
}());