(function(){
	var CourtMatchController = function($scope,MatchFactory,CourtFactory,ScheduledMatchesFactory){
		$scope.courts=[];
		$scope.matches=[];
		$scope.selectedCourt = "";
		$scope.selectedCourtMatches=[];
		$scope.search = "";

		var alertSuccessClasses="alert alert-success alert-dismissible";
        var alertErorrClasses="alert alert-danger alert-dismissible";
        $scope.appliedClasses="alert alert-dismissible hideIt";

		function init(){
			CourtFactory.getCourts()
			.success(function(courts){
				for(var i in courts){
					var court={
						court_name:courts[i].court_name,
						isSelected:false
					}

					$scope.courts.push(court);
				}
				$scope.courts[0].isSelected=true;
				$scope.selectedCourt = $scope.courts[0].court_name;
				MatchFactory.getMatches()
				.success(function(matches){
					$scope.matches=matches;

					for(var i in $scope.matches){
						if($scope.courts[0].court_name===$scope.matches[i].court){
							$scope.selectedCourtMatches.push($scope.matches[i]);
						}
					}
				})
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

		 $scope.sort = function(keyname){
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
          }

          $scope.selectCourtMatches = function(courtName){
            $scope.selectedCourt=courtName;

          	for (var i in $scope.courts){
          		if($scope.courts[i].court_name===courtName){
          			$scope.courts[i].isSelected=true;
          		}
          		else{
          			$scope.courts[i].isSelected=false;	
          		}
          	}
          	$scope.selectedCourtMatches=[];
          	for(var i in $scope.matches){
					if(courtName===$scope.matches[i].court){
						$scope.selectedCourtMatches.push($scope.matches[i]);
					}
				}
          }


          $scope.scheduleMatch = function(matchId,matchStatus){
          	if(matchStatus!="SCH" && matchStatus!="RUN"){
          		ScheduledMatchesFactory.scheduleMatch(matchId)
          		.success(function(success){
          			showMessageBox(alertSuccessClasses,'Success','Macth has been scheduled successfully!');

          			for(var i in $scope.matches){
          				if(matchId===$scope.matches[i].match_id){
          					$scope.matches[i].match_status="SCH";
          					break;
          				}
          			}

          			for(var i in $scope.selectedCourtMatches){
          				if(matchId===$scope.selectedCourtMatches[i].match_id){
          					$scope.selectedCourtMatches[i].match_id="SCH";
          					break;
          				}
          			}
          		})
          		.error(function(err){
          			showMessageBox(alertErorrClasses,'Error','Macth cannot be scheduled please try again');
          		})
          	}
          	else{
          		showMessageBox(alertErorrClasses,'Error','Macth is already scheduled');
          	}
          }
	}

	angular.module('vollyboard').controller('CourtMatchController',CourtMatchController);
}());