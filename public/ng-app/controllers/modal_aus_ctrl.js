
angular.module('vollyboard').controller('ModalAUSCtrl', function ($scope, $uibModalInstance) {

  $scope.ok = function () {
    if($scope.data.modalValue.length === 0 || !$scope.data.modalValue.trim()){
		$scope.requiredError="*This field is required";
    }
    else if(!($scope.data.modalValue.match("^[a-zA-Z0-9 \s]+$"))){
        $scope.validationError="*No special characters are allowed";
    }
    else if($scope.data.modalValue.length>30){
        $scope.lengthError="*Maximum 30 characters are allowed"
    }
    else{
    	$uibModalInstance.close();
    }
    
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});