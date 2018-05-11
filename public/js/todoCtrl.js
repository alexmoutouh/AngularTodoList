routingApp.controller('todoCtrl', ['$scope', '$http', '$window', '$cookies', 'todoService', function($scope, $http, $window, $cookies, todoService) {
    var user = {
        username: $cookies.get('user'),
        passwd: $cookies.get('passwd')
    }

    if(!user.username || !user.passwd) {
        $window.location.href = "/#!/signin";        
    } else {
        $scope.taskSet = [];

        $scope.getUser = function() {
            // console.log("getting user...");

            if(user.username) {
                // console.log("user retrieved");
                $scope.user = user.username;
            } else {
                $window.location.href = "/#!/signin";
            }
        };
        $scope.logout = function() {
            // console.log("logging out...");
            todoService.logout(user, function(url) {
                if(!url) {
                    // console.log("An error occured while logging out.");
                } else {
                    $cookies.remove('user');
                    $cookies.remove('passwd');
                    $window.location.href = url;
                }
            });
        };
        $scope.addTask = function() {
            // console.log("adding...")
            if($scope.taskName) {
                todoService.addTask($scope.taskName, user, function(resp) {
                    if(resp) {
                        $scope.refreshTaskSet();
                    }
                });

                $scope.taskName = '';
            }
        };
        $scope.deleteTask = function(task) {
            todoService.deleteTask(task._id, user, function(resp) {
                if(resp) {
                    $scope.refreshTaskSet();
                }
            });
        };
        $scope.saveTaskSet = function(task) {
            todoService.saveTaskSet(task._id, user, function(resp) {
                if(resp) {
                    $scope.refreshTaskSet();
                }
            });
        };
        $scope.refreshTaskSet = function() {
            // console.log("refreshing...");
            todoService.getTaskSet(user, function(taskSet) {
                $scope.taskSet = taskSet;
            });
        };

        $scope.getUser();
        $scope.refreshTaskSet();
    }
}])
