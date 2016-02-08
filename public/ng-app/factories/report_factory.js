(function(){
	var ReportFactory = function($http){
		var service="match_report";
		var factory={};

		factory.getReports=function(){
			var req={
				method:'GET',
				url:'app/match_report',
				params:{service:service,date:new Date()}
			}
			return $http(req);
		}

		return factory;
	};

	angular.module('vollyboard').factory('ReportFactory',ReportFactory);
}());