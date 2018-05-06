routingApp.controller('todoCtrl', ['$scope', '$http', 'todoService', function($scope, $http, todoService) {
    $scope.taskSet = [];

    $scope.getUser = function() {
        console.log("getting user...");
        todoService.getUser(function(userResp) {
            console.log("userresp " + userResp);
            $scope.user = userResp;
        });
    };
    $scope.addTask = function() {
        console.log("adding...")
        if($scope.taskName) {
            todoService.addTask($scope.taskName, function(resp) {
                if(resp) {
                    $scope.refreshTaskSet();
                }
            });

            $scope.taskName = '';
        }
    };
    $scope.deleteTask = function(task) {
        todoService.deleteTask(task._id, function(resp) {
            if(resp) {
    			$scope.refreshTaskSet();
    		}
    	});
    };
    $scope.saveTaskSet = function(task) {
        todoService.saveTaskSet(task._id, function(resp) {
            if(resp) {
                $scope.refreshTaskSet();
            }
        });
    };
    $scope.refreshTaskSet = function() {
        console.log("refreshing...");
        todoService.getTaskSet(function(taskSet) {
            $scope.taskSet = taskSet;
        });
    };

    $scope.getUser();
    $scope.refreshTaskSet();
}])
