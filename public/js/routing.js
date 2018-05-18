var routingApp = angular.module("routingApp", ['ui.router', 'ngCookies']);

routingApp.config(function($stateProvider, $urlRouterProvider) {
    // inscription
    var homeState = {
        name : "home",
        url: "/home",
        templateUrl : "home.html",
        controller : "userCtrl"
    };
    // connexion
    var singinState = {
        name : "signin",
        url: "/signin",
        templateUrl : "signin.html",
        controller : "userCtrl"
    };
    // todo liste
    var todoState = {
        name : "todo",
        url: "/todo",
        templateUrl : "todo.html",
        controller : "todoCtrl"
    };

    $stateProvider.state(homeState);
    $stateProvider.state(singinState);
    $stateProvider.state(todoState);

    $urlRouterProvider.otherwise('/home'); 
});
