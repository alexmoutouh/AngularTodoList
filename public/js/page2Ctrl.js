routingApp.controller("page2Ctrl", ["$scope", 'ComputeService', function($scope,ComputeService) {
    $scope.comp = function() {
        $scope.result = ComputeService.addNumber($scope.val.paramA, $scope.val.paramB);
    };
}]);