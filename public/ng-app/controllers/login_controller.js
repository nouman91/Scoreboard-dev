(function(){
	var LoginController = function($scope,$cookieStore,$location, $rootScope){
		$scope.submitForm=function(){
			 $rootScope.globals = {
                currentUser: {
                    username: "admin",
                    role: "admin"
                }
            };

             $cookieStore.put('globals', $rootScope.globals);

			$location.path('/admin-login-success');
		}
	}
	angular.module('vollyboard').controller('LoginController',LoginController);
}());