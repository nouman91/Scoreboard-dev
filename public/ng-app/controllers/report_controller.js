(function(){
	var ReportController = function($scope,ReportFactory){
		$scope.reports=[];

		$scope.isOpen = false;
		$scope.matchDateTime;

		function init(){
		ReportFactory.getReports()
			.success(function(reports){
				$scope.reports = reports;
			});
		}

		init();

		$scope.openCalendar = function(e) {
			e.preventDefault();
			e.stopPropagation();
			$scope.isOpen = true;
		};



	};

	angular.module('vollyboard').controller('ReportController',ReportController);
}());