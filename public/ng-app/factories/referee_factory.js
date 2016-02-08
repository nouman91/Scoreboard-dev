(function(){
	var RefereeFactory = function($http){
		var service="user";
		var factory={};

		factory.getReferees=function(){
			var req={
				method:'GET',
				url:'app/user',
				params:{service:service,operation:'getReferees'}
			}
			return $http(req);
		}

		factory.addReferee = function(userName){
			var req={
				method:'POST',
				url:'app/user',
				data:{service:service, userName:userName}
			}
			return $http(req);
		}

		factory.deleteReferees = function(referees) {
			var req={
				method:'DELETE',
				url:'app/user',
				data:{service:service, referees:referees},
				 headers: {"Content-Type": "application/json;charset=utf-8"}
			}
			return $http(req);
		};

		factory.updateUserName = function(userName,oldUserName){
			var req={
				method:'PUT',
				url:'app/user',
				data:{service:service, userName:userName,oldUserName:oldUserName}
			}

			return $http(req);
		}

		return factory;
	};

	angular.module('vollyboard').factory('RefereeFactory',RefereeFactory);
}());