var routingApp = angular.module("routingApp", ["ui.router"]);

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
    var page2State = {
        name : "page2",
        url: "/page2",
        templateUrl : "page2.html",
        controller : "page2Ctrl"
    };
    var page3State = {
        name : "page3",
        url: "/page3",
        templateUrl : "page3.html",
        controller : "page3Ctrl"
    };
    var page4State = {
        name : "page4",
        url: "/page4",
        templateUrl : "page4.html",
        controller : "page4Ctrl"
    };
    var page5State = {
        name : "page5",
        url: "/page5",
        templateUrl : "page5.html",
        controller : "page5Ctrl"
    };
    var todoState = {
        name : "todo",
        url: "/todo",
        templateUrl : "todo.html",
        controller : "todoCtrl"
    };
    var helloState = {
        name : "hello",
        url: "/hello",
        template : "hello"
    };

    $stateProvider.state(homeState);
    $stateProvider.state(singinState);
    $stateProvider.state(page2State);
    $stateProvider.state(page3State);
    $stateProvider.state(page4State);
    $stateProvider.state(page5State);
    $stateProvider.state(todoState);
    $stateProvider.state(helloState);

    $urlRouterProvider.otherwise('/home'); 
});
