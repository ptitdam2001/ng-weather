/*
 * Author: Sari Haj Hussein
 */
var app = angular.module("app", ["ngResource", "WeatherModule"])
	.constant("apiUrl", "http://localhost:9000\:9000/api") // to tell AngularJS that 9000 is not a dynamic parameter
	.config(["$routeProvider", function($routeProvider) {
		return $routeProvider.when("/", {
			templateUrl: "/views/main",
			controller: "ListCtrl"
		});
	}
	]).config([
	"$locationProvider", function($locationProvider) {
		return $locationProvider.html5Mode(true).hashPrefix("!"); // enable the new HTML5 routing and histoty API
	}
]);

// the global controller
app.controller("AppCtrl", ["$scope", "$location", function($scope, $location) {
	// the very sweet go function is inherited to all other controllers
	$scope.go = function (path) {
		$location.path(path);
	};
}]);