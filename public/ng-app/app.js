(function(){
	var app = angular.module('vollyboard',['ngRoute']);
	/*******************************************************************************************
	-- Configuring routes
	*******************************************************************************************/
	app.config(function($routeProvider,$locationProvider){
		$locationProvider.html5Mode({
  			enabled: true,
  			requireBase: false
		});
		$routeProvider.when('/first',{
			templateUrl:'ng-app/views/first.html'
		})
		.otherwise({redirectTo:'/'});
	});
}());