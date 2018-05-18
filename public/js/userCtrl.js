routingApp.controller('userCtrl', ['$scope', '$http', '$window', '$cookies', 'userService', function($scope, $http, $window, $cookies, userService) {
    var error = false;

    document.getElementById("msgLog").style.display = "none";

    $scope.login = function() {
        if($scope.log && $scope.pass) {
            var logData = {
                login: $scope.log,
                password : $scope.pass
            };

            msg = "Connexion...";
            $scope.msg = msg;
            document.getElementById("msgLog").style.display = "flex";
            document.getElementById("msgLog").style.color = "green";
            userService.login(logData, function(success) {
                if(!success) {
                    error = true;
                    msg = "Mauvais login ou mot de passe";
                    $scope.msg = msg;
                    document.getElementById("msgLog").style.color = "red";
                    document.getElementById("msgLog").style.display = "flex";
                } else {
                    // on a dit qu'il ne s'agissait pas une appli securisee
                    var expired = new Date();
                    expired.setDate(expired.getDate() + 1); // date d'expiration des cookies : dans 1 jour
                    $cookies.put('user', logData.login, {expires : expired });
                    $cookies.put('passwd', logData.password, {expires : expired });
                    console.log('cookies expire  : ' + expired);
                    $window.location.href = "/#!/todo"; // acces a la todo liste
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

            msg = "Inscription...";
            $scope.msg = msg;
            document.getElementById("msgLog").style.display = "flex";
            document.getElementById("msgLog").style.color = "blue";
            userService.register(regData, function(success) {
                if(!success) {
                    error = true;
                    msg = "Utilisateur déjà existant";
                    $scope.msg = msg;
                    document.getElementById("msgLog").style.display = "flex";
                    document.getElementById("msgLog").style.color = "red";
                } else {
                    error = false;
                    msg = "Utilisateur créé. Redirection...";
                    $scope.msg = msg;
                    document.getElementById("msgLog").style.display = "flex";
                    document.getElementById("msgLog").style.color = "green";

                    // une fois l'utilisateur cree, login automatique avec les donnees d'inscription
                    userService.login(regData, function(success) {
                        if(!success) {
                            error = true;
                            msg = "Mauvais login ou mot de passe";
                            document.getElementById("msgLog").style.display = "flex";
                            $scope.msg = msg;
                        } else {
                            // on a dit qu'il ne s'agissait pas une appli securisee
                            var expired = new Date();
                            expired.setDate(expired.getDate() + 1); // date d'expiration des cookies : dans 1 jour
                            $cookies.put('user', regData.login, {expires : expired });
                            $cookies.put('passwd', regData.password, {expires : expired });
                            console.log('cookie expire : ' + expired);
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
