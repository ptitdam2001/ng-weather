'use strict';

var app = angular.module("ptitdamioApp", ["ngResource", "ngRoute", 'ptitdam-ng-openweathermap'])
    .config(function($routeProvider) {
        $routeProvider.when('/', {
                templateUrl : 'home.html',
                controller  : 'AppCtrl'
            });
    });

// the global controller
app.controller("AppCtrl", ["$scope", function($scope) { }]);