(function(){
	var MatchesDashboardController = function($scope){
		$scope.stopwatches = [{ log: [],stopMinutes:2,halfTimeMinutes:1,runningMatchId:1},{ log: [],stopMinutes:2,halfTimeMinutes:1,runningMatchId:1},{ log: [],stopMinutes:2,halfTimeMinutes:1,runningMatchId:1},{ log: [],stopMinutes:2,halfTimeMinutes:1,runningMatchId:1}];

		function callMe(){
			alert("I was called")
		}
	};
angular.module('vollyboard').controller('MatchesDashboardController',MatchesDashboardController);
}())