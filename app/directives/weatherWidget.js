'use strict';

angular.module('WeatherModule', []).directive('widgetWeather', function($q, $http) {

	


	return {
		restrict: 'E',
		priority: 10,
		//terminal: false,
		templateUrl: 'weather.tpl.html',
		replace: true,
		transclude: false,
		scope: {
			longitud: '@cityLon',
			latitud: '@cityLat',
			cityName: '@city',
			lang: '@lang',
			showMode: '@mode'
		},
		controller: ['$scope', '$http', function($scope, $http) {
			$scope.weatherData = {};

			$scope.onError = function(data) {
				$scope.weatherData.wind = {};
				$scope.weatherData.wind.speedkmh = 0;
			}

			$scope.onSuccess = function(data) {
				// this callback will be called asynchronously
			    // when the response is available
			    $scope.weatherData = data;
			    //change mps to kmh
			    $scope.weatherData.wind.speedkmh = $scope.weatherData.wind.speed * 3.6;
				$scope.showContent = true;
			}

			$scope.getOpenWeatherInfo = function(city, longitud, latitud, lang, successCallback, errorCallback) {
				//make openweather uri in function parameters
				var queryString = '';
				if (angular.isDefined(city)) {
					queryString += "q=" + city;
				} else if (angular.isDefined(longitud) && angular.isDefined(latitud)){
					queryString += "lat=" + latitud + '&lon=' + longitud;
				}

				var uri = 'http://api.openweathermap.org/data/2.5/weather?'+queryString+'&lang='+lang+'&units=metric';
				//init loader
				$http({method: 'GET', url: uri}).
				  success(function(data, status, headers, config) {
				  	if (typeof successCallback == 'function') {
				  		successCallback(data)
				  	}
				  }).
				  error(function(data, status, headers, config) {
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				    if (typeof errorCallback == 'function') {
				  		errorCallback(data)
				  	}
				  });
			};
	    }],
		link: function(scope, $element, iattrs, ctrl) {
			//define mode
			if (angular.isDefined(iattrs.mode) && (iattrs.mode == 'light' || iattrs.mode == 'lite')) {
				scope.showMode = 'light';
			} else {
				scope.showMode = 'complete';
			}
			//make openweather uri in function parameters
			scope.showContent = false;
			scope.getOpenWeatherInfo(iattrs.city, iattrs.cityLon, iattrs.cityLat, iattrs.lang, scope.onSuccess, scope.onError());
		}
	}
})