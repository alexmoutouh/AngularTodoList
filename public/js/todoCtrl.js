routingApp.controller('todoCtrl', ['$scope', '$http', '$window', '$cookies', 'todoService', function($scope, $http, $window, $cookies, todoService) {
    var user = {
        login: $cookies.get('user'),
        password: $cookies.get('passwd')
    }

    if(!user.login || !user.password) {
        $window.location.href = "/#!/signin";        
    } else {
        $scope.taskSet = [];

        $scope.getUser = function() {
            console.log("getting user...");

            if(user.login) {
                todoService.checkLogin(user, function(success) {
                    if(success) {
                        console.log("user retrieved");
                        $scope.user = user.login;
                    } else {
                        $window.location.href = "/#!/signin";                        
                    }
                });
            } else {
                $window.location.href = "/#!/signin";
            }
        };
        $scope.logout = function() {
            console.log("logging out...");
            todoService.logout(user, function(url) {
                if(!url) {
                    console.log("An error occured while logging out.");
                } else {
                    $cookies.remove('user');
                    $cookies.remove('passwd');
                    $window.location.href = url;
                }
            });
        };
        $scope.addTask = function() {
            console.log("adding...")
            if($scope.taskName) {
                todoService.addTask($scope.taskName, user, function(resp) {
                    if(resp) {
                        $scope.refreshTaskSet();
                        $scope.taskName = '';
                    }
                });
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
            console.log(task._id)
            console.log(task.done)
            todoService.saveTaskSet(task, function(resp) {
                if(resp) {
                    $scope.refreshTaskSet();
                }
            });
        };
        $scope.refreshTaskSet = function() {
            console.log("refreshing...");
            todoService.getTaskSet(user, function(taskSet) {
                $scope.taskSet = taskSet;
            });
        };

        $scope.getUser();
        $scope.refreshTaskSet();
    }
}])
