(function(){
	var ReportController = function($scope,ReportFactory){
		$scope.reports=[];

		function init(){
			ReportFactory.getReports()
			.success(function(reports){
				$scope.reports = reports;
			});
		}

		init();
	};

	angular.module('vollyboard').controller('ReportController',ReportController);
}());