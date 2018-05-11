var routingApp = angular.module("routingApp", ['ui.router', 'ngCookies']);

routingApp.config(function($stateProvider, $urlRouterProvider) {
    var homeState = {
        name : "home",
        url: "/home",
        templateUrl : "home.html",
        controller : "userCtrl"
    };
    var singinState = {
        name : "signin",
        url: "/signin",
        templateUrl : "signin.html",
        controller : "userCtrl"
    };
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
