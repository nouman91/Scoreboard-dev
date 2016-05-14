(function(){
	var ReportController = function($scope,ReportFactory){
		$scope.reports=[];
		$scope.isOpen = false;
		$scope.matchDate;

		var alertSuccessClasses="alert alert-success alert-dismissible";
    	var alertErorrClasses="alert alert-danger alert-dismissible";
 		$scope.appliedClasses="alert alert-dismissible hideIt";


		function init(){
			getReportsByDate(new Date());
		}

		function getReportsByDate(date){
			ReportFactory.getReports(date)
			.success(function(reports){
				$scope.reports = reports;
			})
			.error(function(err){
				$scope.reports=[];
				showMessageBox(alertErorrClasses,"Error",err);
			})
		}

		init();

		function showMessageBox(classes,type,message){

           $scope.appliedClasses = classes;
           $scope.type=type;
           $scope.message=message;
           $scope.isHide=true;

         }

         $scope.hideMessage = function(){
           $scope.appliedClasses="alert alert-dismissible hideIt";
         };

		$scope.openCalendar = function(e) {
			e.preventDefault();
			e.stopPropagation();
			$scope.isOpen = true;
		};

		$scope.getReports = function(isValid){
			if(!isValid){
				showMessageBox(alertErorrClasses,"Error","Please select date");
			}
			else{
				getReportsByDate($scope.matchDate)
			}
		}

	};

	angular.module('vollyboard').controller('ReportController',ReportController);
}());