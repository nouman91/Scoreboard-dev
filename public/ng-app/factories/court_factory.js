(function(){
	var CourtFactory = function($http){
		var service="court";
		var factory={};

		factory.getCourts=function(){
			var req={
				method:'GET',
				url:'app/courts',
				params:{service:service}
			}
			return $http(req);
		}

		factory.addCourt = function(courtName){
			var req={
				method:'POST',
				url:'app/courts',
				data:{service:service, courtName:courtName}
			}
			return $http(req);
		}

		factory.deleteCourts = function(courts) {
			var req={
				method:'DELETE',
				url:'app/courts',
				data:{service:service, courts:courts},
				 headers: {"Content-Type": "application/json;charset=utf-8"}
			}
			return $http(req);
		}

		factory.updateCourtName = function(courtName,oldCourtName){
			var req={
				method:'PUT',
				url:'app/courts',
				data:{service:service, courtName:courtName,oldCourtName:oldCourtName}
			}

			return $http(req);
		}

		return factory;
	};

	angular.module('vollyboard').factory('CourtFactory',CourtFactory);
}());