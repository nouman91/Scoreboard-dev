angular.module('vollyboard').service('simpleModalService', ['$modal',
    function ($modal) {

        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            templateUrl: 'ng-app/views/simple_modal.html'
        };

        var modalOptions = {
            closeButtonText: 'Close',
            actionButtonText: 'OK',
            headerText: 'Proceed?',
            bodyText: 'Team Name'
        };

        this.showModal = function (customModalDefaults, customModalOptions) {
            if (!customModalDefaults) customModalDefaults = {};
            customModalDefaults.backdrop = 'static';
            return this.show(customModalDefaults, customModalOptions);
        };

        this.show = function (customModalDefaults, customModalOptions) {
            //Create temp objects to work with since we're in a singleton service
            var tempModalDefaults = {};
            var tempModalOptions = {};

            //Map angular-ui modal custom defaults to modal defaults defined in service
            angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

            //Map modal.html $scope custom properties to defaults defined in service
            angular.extend(tempModalOptions, modalOptions, customModalOptions);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = function ($scope, $modalInstance) {
                    $scope.modalOptions = tempModalOptions;
                    $scope.data={name:$scope.modalOptions.name};
                    $scope.requiredError="";
                    $scope.validationError="";
                    $scope.lengthError="";
                    $scope.modalOptions.ok = function (result) {
                        console.log($scope.data.name);
                        if($scope.data.name.length === 0 || !$scope.data.name.trim()){
                            $scope.requiredError="*This field is required";
                        }
                        else if(!($scope.data.name.match("^[a-zA-Z0-9 \s]+$"))){
                            $scope.validationError="*No special characters are allowed";
                        }
                        else if($scope.data.name.length>30){
                            $scope.lengthError="*Maximum 30 characters are allowed"
                        }
                        else{
                            $modalInstance.close($scope.data.name);
                        }
                        
                    };
                    $scope.modalOptions.close = function (result) {
                        $modalInstance.dismiss('cancel');
                    };
                }
            }

            return $modal.open(tempModalDefaults).result;
        };

    }]);