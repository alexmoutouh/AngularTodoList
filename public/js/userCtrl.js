routingApp.controller('userCtrl', ['$scope', '$http', '$window', 'userService', function($scope, $http, $window, userService) {
    var error = false;
    var msg = "";

    document.getElementById("msgLog").style.display = "none";

    $scope.login = function() {
        if($scope.log && $scope.pass) {
            var logData = {
                login: $scope.log,
                password : $scope.pass
            }
            userService.login(logData, function(success) {
                if(!success) {
                    error = true;
                    msg = "Mauvais login ou mot de passe";
                    document.getElementById("msgLog").style.display = "flex";
                    $scope.msg = msg;
                } else {
                    $window.location.href = "/#!/todo";
                }
            });
        } else {
            $scope.msgLog = "Veuillez saisir tous les champs";
        }
    };

    $scope.register = function() {
        if($scope.log && $scope.pass) {
            var regData = {
                login: $scope.log,
                password : $scope.pass
            }

            userService.register(regData, function(success) {
                if(!success) {
                    error = true;
                    msg = "Utilisateur déjà existant";
                    $scope.msg = msg;
                    document.getElementById("msgLog").style.display = "flex";
                    document.getElementById("msgLog").style.color = "red";
                } else {
                    error = false;
                    msg = "Utilisateur créé redirection...";
                    $scope.msg = msg;
                    document.getElementById("msgLog").style.display = "flex";
                    document.getElementById("msgLog").style.color = "green";

                    userService.login(regData, function(success) {
                        if(!success) {
                            error = true;
                            msg = "Mauvais login ou mot de passe";
                            document.getElementById("msgLog").style.display = "flex";
                            $scope.msg = msg;
                        } else {
                            $window.location.href = "/#!/todo";
                        }
                    });
                }
            });
        } else {
            $scope.msgLog = "Veuillez saisir tous les champs";
        }
    };
}])
