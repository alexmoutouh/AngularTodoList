routingApp.controller("page1Ctrl", ["$scope", "ComputeService", function($scope, ComputeService) {
    $scope.comp = function() {
        $scope.result = ComputeService.addNumber($scope.val1, $scope.val2);
    };
}]);