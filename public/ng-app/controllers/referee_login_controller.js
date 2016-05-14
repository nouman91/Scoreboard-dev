(function(){
	var RefereeLoginController = function($scope,$location,LoginFactory){	
		$scope.userName = "";
		var alertSuccessClasses="alert alert-success alert-dismissible";
    	var alertErorrClasses="alert alert-danger alert-dismissible";

    	$scope.appliedClasses="alert alert-dismissible hideIt";

		$scope.submitForm = function(){
			LoginFactory.validateRefreeUserName($scope.userName)
			.success(function(ref){
				$location.path('/referee_public/'+$scope.userName);
			})
			.error(function(err){
				showMessageBox(alertErorrClasses,"Error","Invalid user name");
			})
		}

		function showMessageBox(classes,type,message){

           $scope.appliedClasses = classes;
           $scope.type=type;
           $scope.message=message;
           $scope.isHide=true;

         }

         $scope.hideMessage = function(){
           $scope.appliedClasses="alert alert-dismissible hideIt";
         };
	}
	angular.module('vollyboard').controller('RefereeLoginController',RefereeLoginController);

}())
