routingApp.controller('todoCtrl', ['$scope', '$http', '$window', '$cookies', 'todoService', function($scope, $http, $window, $cookies, todoService) {
    /* L'acces a la todo liste ne peut se faire que si une authentification a ete faite au préalable 
    (i.e. l'utilisateur accede a la page en etant redirige suite a une authentification valide ou
    rentre l'url de la /#!/todo suite a une connexion anterieure datant de moins d'1 jour et sans 
    s'etre deconnecte explicitement en cliquant sur le bouton Deconnexion).
    Si ce n'est pas le cas, l'utilisateur est redirige vers la page de connexion. */
    var user = {
        login: $cookies.get('user'),
        password: $cookies.get('passwd')
    }
    // console.log(user);

    if(!user.login || !user.password) { 
        $window.location.href = "/#!/signin"; // redirection vers la page de connexion
    } else {
        $scope.taskSet = [];

        $scope.getUser = function() {
            // console.log("getting user...");

            if(user.login) {
                todoService.checkLogin(user, function(success) {
                    if(success) {
                        // console.log("user retrieved");
                        $scope.user = user.login;
                    } else {
                        $window.location.href = "/#!/signin"; // redirection vers la page de connexion
                    }
                });
            } else {
                $window.location.href = "/#!/signin"; // redirection vers la page de connexion
            }
        };
        $scope.logout = function() {
            // console.log("logging out...");
            todoService.logout(user, function(url) {
                if(!url) {
                    alert("An error occured while logging out.");
                } else {
                    $cookies.remove('user');
                    $cookies.remove('passwd');
                    $window.location.href = url; // redirection vers /home, l'url etant transmise depuis le serveur
                }
            });
        };
        $scope.addTask = function() {
            // console.log("adding...")
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
            // console.log(task._id)
            // console.log(task.done)
            todoService.saveTaskSet(task, function(resp) {
                if(resp) {
                    $scope.refreshTaskSet();
                }
            });
        };
        $scope.refreshTaskSet = function() {
            // console.log("refreshing...");
            var toEnable = document.getElementById("submitTask");
            toEnable.value = "Chargement...";
            toEnable.disabled = true; // desactivation du bouton d'ajout le temps que les taches soient chargees
            todoService.getTaskSet(user, function(taskSet) {
                // les taches sont chargees
                $scope.taskSet = taskSet;
                toEnable.value = "Add";
                toEnable.disabled = false;
            });
        };

        $scope.getUser();
        $scope.refreshTaskSet();
    }
}])
