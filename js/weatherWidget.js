'use strict';

var WeatherModule = angular.module('WeatherModule', [])
.directive('widgetWeather', function($q, $http) {
	return {
		restrict: 'E',
		priority: 10,
		//terminal: false,
		templateUrl: '../html/weather.tpl.html',
		replace: true,
		transclude: false,
		scope: {
			longitud: '@cityLon',
			latitud: '@cityLat',
			cityName: '@city',
			lang: '@lang'
		},
		link: function($scope, $element, $attrs) {
			//make openweather uri in function parameters
			var queryString = '';
			if (angular.isDefined($scope.cityName)) {
				queryString += "q=" + $scope.cityName;
			} else if (angular.isDefined($scope.longitud) && angular.isDefined($scope.latitud)){
				queryString += "lat=" + $scope.latitud + '&lon=' + $scope.longitud;
			}
			$http({method: 'GET', url: 'http://api.openweathermap.org/data/2.5/weather?'+queryString+'&lang='+$scope.lang+'&units=metric'}).
			  success(function(data, status, headers, config) {

			    // this callback will be called asynchronously
			    // when the response is available
			    $scope.weatherData = data;

			    //change mps to kmh
			    $scope.weatherData.wind.speedkmh = $scope.weatherData.wind.speed * 3.6;

//			    console.log($scope.weatherData);

			  }).
			  error(function(data, status, headers, config) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			    $scope.weatherData.wind.speedkmh = 0;
			  });
		}
	}
})