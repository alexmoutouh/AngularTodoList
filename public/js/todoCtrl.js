routingApp.controller('todoCtrl', ['$scope', '$http', '$window', 'todoService', function($scope, $http, $window, todoService) {
    $scope.taskSet = [];

    $scope.getUser = function() {
        console.log("getting user...");
        todoService.getUser(function(userResp) {
            console.log("user logged : " + userResp);
            if(userResp) {
                $scope.user = userResp;
            } else {
                $window.location.href = "/#!/signin";
            }
        });
    };
    $scope.logout = function() {
        console.log("logging out...");
        todoService.logout(function(url) {
            if(!url) {
                console.log("An error occured while logging out.");
            } else {
                $window.location.href = url;
            }
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
