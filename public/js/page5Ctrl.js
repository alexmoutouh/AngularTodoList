routingApp.controller('page5Ctrl', ['$scope', '$http', function($scope, $http) {
    $scope.loadCounter = function() {
        $http.post('/getCounter').then(function(dt) {
            $scope.counter = dt.data.counter;
        });
    };

    $scope.addCounter = function() {
        $http.post('/plusPlusCounter').then(function(data) {
            $scope.counter = data.data.counter;
        });
    }

    $scope.loadCounter();
}]);
