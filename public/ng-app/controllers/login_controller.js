(function(){
	var LoginController = function($scope,$cookies,$location,$rootScope,LoginFactory){
		var alertSuccessClasses="alert alert-success alert-dismissible";
		var alertErorrClasses="alert alert-danger alert-dismissible";

		$scope.appliedClasses="alert alert-dismissible hideIt";

		$scope.userName;
		$scope.password;
		$scope.rememberMe=false;

		function showMessageBox(classes,type,message){

        	$scope.appliedClasses = classes;
        	$scope.type=type;
        	$scope.message=message;
        	$scope.isHide=true;

        }

        $scope.hideMessage = function(){
        	$scope.appliedClasses="alert alert-dismissible hideIt";
        };


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
	             
	            $location.path('/matches_dashboard');
	             
	            
				 
			})
			.error(function(err){
				showMessageBox(alertErorrClasses,"User name or password is ivalid");
			});

		}

		function logout (){
			 $rootScope.globals = {};
			 $cookies.remove('globals');
			 $location.path('/');

		}
		
	}
	angular.module('vollyboard').controller('LoginController',LoginController);
}());