(function(){
	var LoginFactory = function($http){
		var service="user";

		var factory={};

		factory.getUserCredentials = function(userName,password){
			var req={
				method:'GET',
				url:'app/user',
				params:{userName:userName,password:password,service:service,operation:"login"}
			}
			return $http(req);
		}

		factory.validateRefreeUserName = function(userName){
			var req={
				method:'GET',
				url:'app/user',
				params:{userName:userName,service:service,operation:"refereelogin"}
			}
			return $http(req);
		}

		return factory;
	}

	angular.module('vollyboard').factory('LoginFactory',LoginFactory);
}());