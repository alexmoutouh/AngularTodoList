routingApp.controller('page4Ctrl', ['$scope', '$http', function($scope, $http) {
    $scope.load = function() {
        $http.post('/getData').then(function(data) {
            $scope.myData = data.data;
        });
    }

    $scope.load();
}]);
