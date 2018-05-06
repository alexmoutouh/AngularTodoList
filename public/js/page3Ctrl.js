routingApp.controller("page3Ctrl", ["$scope", "ComputeService", function($scope, ComputeService) {
    $scope.comp = function() {
        $scope.resPage3 = ComputeService.addNumber($scope.val1, $scope.val2);
    };
}]);
