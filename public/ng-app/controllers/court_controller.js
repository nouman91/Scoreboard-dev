(function(){
	var CourtController = function($scope,CourtFactory,$uibModal,$log){
		var alertSuccessClasses="alert alert-success alert-dismissible";
    var alertErorrClasses="alert alert-danger alert-dismissible";
    var selectedCourts=[];

    $scope.sortKey="";
    $scope.reverse="";
    $scope.search="";
    $scope.selectedAll = false;
    $scope.isHide=false;
    $scope.courtName= "";
    $scope.appliedClasses="alert alert-dismissible hideIt";
    $scope.type="";
    $scope.message="";
    $scope.courts=[];

    $scope.modalOptions={
     closeButtonText: 'Cancel',
     actionButtonText: 'Confirm',
     headerText: 'Delete Team',
     bodyText: 'Are you sure you want to delete selected team/teams/?'

   }
   $scope.requiredError="";
   $scope.validationError="";
   $scope.lengthError="";
   $scope.data={modalValue:""};

   function init(){
     CourtFactory.getCourts()
     .success(function(courts){

      for(var i in courts){
        var court={
          selected:false,
          court_name:""
        }
        court.court_name=courts[i].court_name;
        $scope.courts.push(court);
      }

    });
   }

   init();


   $scope.sort = function(keyname){
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
          }
          function showMessageBox(classes,type,message){

           $scope.appliedClasses = classes;
           $scope.type=type;
           $scope.message=message;
           $scope.isHide=true;

         }

         $scope.hideMessage = function(){
           $scope.appliedClasses="alert alert-dismissible hideIt";
         };

        /*******************************************************************************************
		--Delete Section
		*******************************************************************************************/
    $scope.selectAll = function(){
     if($scope.selectedAll){
      for(var i in $scope.courts){
       $scope.courts[i].selected = true;
     }
   }
   else{
    for(var i in $scope.courts){
     $scope.courts[i].selected = false;
   }
 }
 
};

$scope.deleteCourts = function(){
 var isSelected=false;
 selectedCourts=[];
 
 for(var i in $scope.courts){
  if($scope.courts[i].selected){
   isSelected=true;
   selectedCourts.push($scope.courts[i].court_name);
 }
}

if(isSelected){
  deleteSelectedRecords();
}
else{
  showMessageBox(alertErorrClasses,"Error","Please select at least on record");
}
}


function deleteSelectedRecords(){
  var options = {
    closeButtonText: 'Cancel',
    actionButtonText: 'Confirm',
    headerText: 'Delete Court',
    bodyText: 'Are you sure you want to delete selected court/courts?'
  };
  $scope.modalOptions=options;
  var modalInstance = $uibModal.open({
    animation: $scope.animationsEnabled,
    templateUrl: 'ng-app/views/delete_modal.html',
    controller: 'ModalInstanceCtrl',
    size: '',
    bindToController:true,
    controllerAs:'CourtController',
    scope:$scope
  });

  modalInstance.result.then(function () {
    CourtFactory.deleteCourts(selectedCourts)
    .success(function(res){
      $scope.courts=res;
      $scope.selectedAll=false;
      showMessageBox(alertSuccessClasses,"Success","Records Deleted successfully")
    })
    .error(function(err){
      showMessageBox(alertErorrClasses,"Error","Cannot process your request please try again later.")
    })
  });
}

        /*******************************************************************************************
		--Add Section
		*******************************************************************************************/
		$scope.showAddCourtModal = function(){
			var options = {
        closeButtonText: 'Cancel',
        actionButtonText: 'Save',
        headerText: 'Add Court',
        bodyText: 'Court Name',
      };
      $scope.data.modalValue="";
      $scope.modalOptions=options;

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'ng-app/views/simple_modal.html',
        controller: 'ModalAUSCtrl',
        size: '',
        bindToController:true,
        controllerAs:'CourtController',
        scope:$scope
      });
      modalInstance.result.then(function () {
       CourtFactory.addCourt($scope.data.modalValue)
       .success(function(res){
        var court={
         selected:false,
         court_name:$scope.data.modalValue
       }
       $scope.courts.push(court);
       showMessageBox(alertSuccessClasses,"Success","Court Added successfully");

     })
       .error(function(err){
        var message="";
        if(err.message.toLowerCase()==="validation error"){
         message=" Court already exists";	
       }
       else{
         message=err.message;
       }

       showMessageBox(alertErorrClasses,"Error",message);
       $scope.isHide=true;
     });
     });
    }

	/*******************************************************************************************
	--Edit Section
	*******************************************************************************************/

  $scope.editItem = function(oldCourtName){

    var options = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Save',
      headerText: 'Update Court',
      bodyText: 'Court Name',
    };
    $scope.modalOptions=options;
    $scope.data.modalValue=oldCourtName;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'ng-app/views/simple_modal.html',
      controller: 'ModalAUSCtrl',
      size: '',
      bindToController:true,
      controllerAs:'CourtController',
      scope:$scope
    });

    modalInstance.result.then(function () {
      //Check if entered name is unique or not.
          for(var i in $scope.courts){
            if($scope.data.modalValue===$scope.courts[i].court_name){
              showMessageBox(alertErorrClasses,"Error","Court already exists");
              $scope.data.modalValue="";
              return;
            }
          }
      CourtFactory.updateCourtName($scope.data.modalValue,oldCourtName)
      .success(function(res){
       for(var i in $scope.courts){
        if($scope.courts[i].court_name===oldCourtName){
          $scope.courts[i].court_name=$scope.data.modalValue;
        }
      }
      showMessageBox(alertSuccessClasses,"Success","Records Updated successfully");

    })
      .error(function(err){
        var message="";
        if(err.message.toLowerCase()==="validation error"){
          message=" Court already exists"; 
        }
        else{
          message=err.message;
        }
        
        showMessageBox(alertErorrClasses,"Error",message);
        $scope.isHide=true;
      });
    });
  }


//***********************END
};

angular.module('vollyboard').controller('CourtController',CourtController);
}());