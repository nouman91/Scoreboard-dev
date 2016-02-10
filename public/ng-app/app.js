(function(){
	var app = angular.module('vollyboard',['ngRoute','ngCookies','ngAnimate','ui.bootstrap','angularUtils.directives.dirPagination','ui.bootstrap.datetimepicker']);
	app.value('isIn', false);
	var templateUrls=['/matches_dashboard','/team_main','/court_main','/match_title_main','/referee_main','/reports','/match_add','/match_ud','/match_update']

	/*******************************************************************************************
	-- Stopwatch directive
	*******************************************************************************************/
	angular.module('vollyboard').directive('bbStopwatch', ['StopwatchFactory','socket', function(StopwatchFactory){
		return {
			restrict: 'EA',
			scope: true,
			compile: function(tElem, tAttrs){
				if (!tAttrs.options){
					throw new Error('Must Pass an options object from the Controller For the Stopwatch to Work Correctly.');
				}

				return function(scope, elem, attrs){   

					var stopwatchService = new StopwatchFactory(scope[attrs.options]);

					scope.startTimer = stopwatchService.startTimer; 
					scope.stopTimer = stopwatchService.stopTimer;
					scope.resetTimer = stopwatchService.resetTimer;

					scope.$on('$destroy', function(node){
						stopwatchService.cancelTimer(); 
					});

				}
			}
		};
	}])

	/*******************************************************************************************
	-- Filter
	*******************************************************************************************/
	angular.module('vollyboard').filter('stopwatchTime', function () {
	return function (input) {
		if(input){

			var elapsed = input.getTime();
			var hours = parseInt(elapsed / 3600000,10);
			elapsed %= 3600000;
			var mins = parseInt(elapsed / 60000,10);
			elapsed %= 60000;
			var secs = parseInt(elapsed / 1000,10);
			var ms = elapsed % 1000;

			return mins + ':' + secs;
		}
	};
})


	/*******************************************************************************************
	-- Configuring routes
	*******************************************************************************************/
	app.config(function($routeProvider,$locationProvider){

		$routeProvider.when('/',{
			templateUrl:'ng-app/views/public_page.html'
		})
		$routeProvider.when('/login',{
			templateUrl:'ng-app/views/login.html',
			controller:'LoginController'
		})
		$routeProvider.when(templateUrls[0],{
			templateUrl:'ng-app/views/matches_dashboard.html',
			controller:'MatchesDashboardController'
		})
		$routeProvider.when(templateUrls[1],{
			controller:'TeamController',
			templateUrl:'ng-app/views/team_main.html',
		})
		$routeProvider.when(templateUrls[2],{
			templateUrl:'ng-app/views/court_main.html',
			controller:'CourtController'
		})
		$routeProvider.when(templateUrls[3],{
			templateUrl:'ng-app/views/match_title_main.html',
			controller:'MatchTitleController'
		})
		$routeProvider.when(templateUrls[4],{
			templateUrl:'ng-app/views/referee_main.html',
			controller:'RefereeController'
		})
		$routeProvider.when(templateUrls[5],{
			templateUrl:'ng-app/views/reports.html',
			controller:'ReportController'
		})
		$routeProvider.when(templateUrls[6],{
			templateUrl:'ng-app/views/match_add.html',
			controller:'MatchAddContorller',
		})
		$routeProvider.when(templateUrls[7],{
			templateUrl:'ng-app/views/match_ud.html',
			controller:'MatchUpdateDeleteContorller',
		})
		$routeProvider.when(templateUrls[8],{
			templateUrl:'ng-app/views/match_update.html',
			controller:'MatchUpdateController',
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
.run(function($rootScope,$location,$cookies,isIn){
	$rootScope.$on("$routeChangeStart", function(event, next, current) {
		var temp=$cookies.get('globals')
		$rootScope.globals = $cookies.get('globals') || {};
		console.log($rootScope.global);
		if(typeof temp!=='undefined'){
			$rootScope.globals=JSON.parse($rootScope.globals);
		}


		var date = new Date();
		date.setHours(0,0,0,0);

		if ($rootScope.globals.currentUser) {
			if($rootScope.globals.currentUser.role==="admin"){
				if($rootScope.globals.currentUser.rememberMe==false && date>$rootScope.globals.currentUser.creationDate){
					$location.path("/login")
				}
				else{
        			if($location.path()==="/login"){//skip login
        				$location.path(templateUrls[0]);
        			}
        		}
        		
        	}
        }
        else{
        	if(templateUrls.indexOf($location.path())>=0){
        		$location.path("/login")
        	}

        }

    })
	$rootScope.$on('$viewContentLoaded',function(){
		if(!isIn){
			if(templateUrls.indexOf($location.path())>=0){
				isIn=true;
				document.getElementById("sidebar-wrapper").style.display = "block"
			}
			else{
				isIn=false;
				document.getElementById("sidebar-wrapper").style.display = "none"
			}

		}
	});
})
}());