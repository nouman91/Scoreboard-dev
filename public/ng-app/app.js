(function(){
	var app = angular.module('vollyboard',['ngRoute','ngCookies']);
	app.value('isIn', false);
	var templateUrls=['/admin-login-success','/team-main']
	/*******************************************************************************************
	-- Configuring routes
	*******************************************************************************************/
	app.config(function($routeProvider,$locationProvider){
		/*$locationProvider.html5Mode({
  			enabled: true,
  			requireBase: false
		});*/
		$routeProvider.when('/',{
			templateUrl:'ng-app/views/public_page.html'
		})
		$routeProvider.when('/login',{
			templateUrl:'ng-app/views/login.html',
			controller:'LoginController'
		})
		$routeProvider.when(templateUrls[0],{
			templateUrl:'ng-app/views/admin_main.html'
		})
		$routeProvider.when(templateUrls[1],{
			templateUrl:'ng-app/views/team_main.html'
		})
		$routeProvider.when('/match-add',{
			templateUrl:'ng-app/views/macth_add.html'
		})
		$routeProvider.when('/match-update',{
			templateUrl:'ng-app/views/macth_update.html'
		})
		$routeProvider.when('/team-main',{
			templateUrl:'ng-app/views/team_main.html'
		})
		$routeProvider.when('/court-main',{
			templateUrl:'ng-app/views/court_main.html'
		})
		$routeProvider.when('/match-title-main',{
			templateUrl:'ng-app/views/macth_title_main.html'
		})
		/*$routeProvider.when('/match-add',{
			templateUrl:'ng-app/views/macth_add.html'
		})
		$routeProvider.when('/match-add',{
			templateUrl:'ng-app/views/macth_add.html'
		})
		$routeProvider.when('/match-add',{
			templateUrl:'ng-app/views/macth_add.html'
		})*/
		.otherwise({redirectTo:'/'});
	})
	.run(function($rootScope,$location,$cookieStore,isIn){
		$rootScope.$on("$routeChangeStart", function(event, next, current) {
			 $rootScope.globals = $cookieStore.get('globals') || {};

        if ($rootScope.globals.currentUser) {
        	if($rootScope.globals.currentUser.role==="admin"){
        		if(templateUrls.indexOf($location.path())>=0){
		      		if(!isIn){
		      			isIn=true;
		      		}
	      		}
        	}
        }
	     else{
	     	$location.path("/login")
	     }
	       
    });
	})
}());