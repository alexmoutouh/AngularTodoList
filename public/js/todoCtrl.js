routingApp.controller('todoCtrl', ['$scope', '$http', 'todoService', function($scope, $http, todoService) {
    $scope.taskSet = [];

    $scope.getUser = function() {
        todoService.getUser(function(userResp) {
            console.log("userresp " + userResp);
            $scope.user = userResp;
        });
    };
    $scope.addTask = function() {
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
        todoService.getTaskSet(function(taskSet) {
            $scope.taskSet = taskSet;
        });
    };

    $scope.getUser();
    $scope.refreshTaskSet();
}])
