(function(){
	var ReportFactory = function($http){
		var service="match_report";
		var factory={};

		factory.getReports=function(date){
			var req={
				method:'GET',
				url:'app/match_report',
				params:{service:service,date:date}
			}
			return $http(req);
		}

		return factory;
	};

	angular.module('vollyboard').factory('ReportFactory',ReportFactory);
}());