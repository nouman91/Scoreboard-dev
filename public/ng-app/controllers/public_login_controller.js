(function(){
	var PublicLoginController = function($scope,$location,CourtFactory){
		$scope.selectedCourt="";
		$scope.courts=[];

				var alertSuccessClasses="alert alert-success alert-dismissible";
		var alertErorrClasses="alert alert-danger alert-dismissible";

		$scope.appliedClasses="alert alert-dismissible hideIt";
		/*function init(){
			CourtFactory.getCourts()
			.success(function(courts){
				$scope.courts=courts;
			})
			.error(function(err){
				showMessageBox(alertErorrClasses,"Error","No Courts Found");
			})
		}

		init();*/

		function showMessageBox(classes,type,message){

           $scope.appliedClasses = classes;
           $scope.type=type;
           $scope.message=message;
           $scope.isHide=true;

         }

         $scope.hideMessage = function(){
           $scope.appliedClasses="alert alert-dismissible hideIt";
         };

        $scope.submitForm = function(){
        	/*if($scope.selectedCourt.length === 0 || !$scope.selectedCourt.trim()){
        		showMessageBox(alertErorrClasses,"Error","Please Select a court");
        	}
        	else{
        		
        	}*/

        	$location.path('/public_dashboard/'+$scope.selectedCourt);	
        }
	};

	angular.module('vollyboard').controller('PublicLoginController',PublicLoginController)
}())