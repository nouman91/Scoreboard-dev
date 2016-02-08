(function(){
	var LoginController = function($scope,$cookies,$location,$rootScope,LoginFactory){
		$scope.userName;
		$scope.password;
		$scope.rememberMe=false;
		
		$scope.submitForm=function(){
			 
			 LoginFactory.getUserCredentials($scope.userName,$scope.password)
			 .success(function(user){
				 var creationDate = new Date();
				 creationDate.setHours(0,0,0,0);
				 $rootScope.globals = {
	                "currentUser": {
	                    "username": $scope.userName,
	                    "role": user.role,
	                    "rememberMe":$scope.rememberMe,
	                    "date":creationDate
	                }
	            };

	             $cookies.put('globals', JSON.stringify($rootScope.globals));
	             
	            $location.path('/admin_login_success');
	             
	            
				 
			})
			.error(function(err){
				console.log(err);
			});

		}

		function logout (){
			 $rootScope.globals = {};
			 $cookies.remove('globals');
		}
		
	}
	angular.module('vollyboard').controller('LoginController',LoginController);
}());