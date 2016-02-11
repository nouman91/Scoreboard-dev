(function(){
	var MatchTitleController = function($scope,MatchTitleFactory,$uibModal,$log){

		var alertSuccessClasses="alert alert-success alert-dismissible";
    var alertErorrClasses="alert alert-danger alert-dismissible";
    var selectedMatchTitles=[];

    $scope.sortKey="";
    $scope.reverse="";
    $scope.search="";
    $scope.selectedAll = false;
    $scope.isHide=false;
    $scope.matchTitle= "";
    $scope.appliedClasses="alert alert-dismissible hideIt";
    $scope.type="";
    $scope.message="";
    $scope.matchTitles= new Array;
    $scope.modalOptions={
     closeButtonText: 'Cancel',
     actionButtonText: 'Confirm',
     headerText: 'Delete Match Title',
     bodyText: 'Are you sure you want to delete selected Match Title/Match Titles/?'

   }
   $scope.requiredError="";
   $scope.validationError="";
   $scope.lengthError="";
   $scope.data={modalValue:""};

   function init(){
     MatchTitleFactory.getMatchTitles()
     .success(function(matchTitles){


      for(var i in matchTitles){
        var matchTitle={
          selected:false,
          title:""
        }
        matchTitle.title=matchTitles[i].title;
        $scope.matchTitles.push(matchTitle);
      }
    })
   };

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
      for(var i in $scope.matchTitles){
       $scope.matchTitles[i].selected = true;
     }
   }
   else{
    for(var i in $scope.matchTitles){
     $scope.matchTitles[i].selected = false;
   }
 }
 
};

$scope.deleteMatchTitles = function(){
 var isSelected=false;
 selectedMatchTitles=[];
 for(var i in $scope.matchTitles){
  if($scope.matchTitles[i].selected){
   isSelected=true;
   selectedMatchTitles.push($scope.matchTitles[i].title);
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
    headerText: 'Delete Match title',
    bodyText: 'Are you sure you want to delete selected match title/titles?'
  };
  $scope.modalOptions=options;
  var modalInstance = $uibModal.open({
    animation: $scope.animationsEnabled,
    templateUrl: 'ng-app/views/delete_modal.html',
    controller: 'ModalInstanceCtrl',
    size: '',
    bindToController:true,
    controllerAs:'MatchTitleController',
    scope:$scope
  });

  modalInstance.result.then(function () {
    MatchTitleFactory.deleteMatchTitles(selectedMatchTitles)
    .success(function(res){
      $scope.matchTitles=res;
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
		$scope.showAddMatchTitleModal = function(){
			var options = {
        closeButtonText: 'Cancel',
        actionButtonText: 'Save',
        headerText: 'Match Title',
        bodyText: 'Match Title',
      };

      $scope.data.modalValue="";
      $scope.modalOptions=options;

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'ng-app/views/simple_modal.html',
        controller: 'ModalAUSCtrl',
        size: '',
        bindToController:true,
        controllerAs:'MatchTitleController',
        scope:$scope
      });

      modalInstance.result.then(function () {
       MatchTitleFactory.addMatchTitle($scope.data.modalValue)
       .success(function(res){
        var matchTitle={
         selected:false,
         title:$scope.data.modalValue
       }
       $scope.matchTitles.push(matchTitle);
       showMessageBox(alertSuccessClasses,"Success","Match Title Added successfully");
       
     })
       .error(function(err){
        var message="";
        if(err.message.toLowerCase()==="validation error"){
         message=" Match Title already exists";	
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

  $scope.editItem = function(oldMatchTitle){

    var options = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Save',
      headerText: 'Update Match Title',
      bodyText: 'Match Title',
    };
    $scope.modalOptions=options;
    $scope.data.modalValue=oldMatchTitle;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'ng-app/views/simple_modal.html',
      controller: 'ModalAUSCtrl',
      size: '',
      bindToController:true,
      controllerAs:'MatchTitleController',
      scope:$scope
    });
    modalInstance.result.then(function () {
      //Check if entered name is unique or not.
      for(var i in $scope.matchTitles){
        if($scope.data.modalValue===$scope.matchTitles[i].title){
          showMessageBox(alertErorrClasses,"Error","Title already exists");
          $scope.data.modalValue="";
          return;
        }
      }

      MatchTitleFactory.updateMatchTitle($scope.data.modalValue,oldMatchTitle)
      .success(function(res){
       for(var i in $scope.matchTitles){
        if($scope.matchTitles[i].title===oldMatchTitle){
          $scope.matchTitles[i].title=$scope.data.modalValue
        }
      }
      showMessageBox(alertSuccessClasses,"Success","Records Updated successfully");
      
    })
      .error(function(err){
        var message="";
        if(err.message.toLowerCase()==="validation error"){
          message=" Match Title already exists"; 
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

angular.module('vollyboard').controller('MatchTitleController',MatchTitleController);
}());