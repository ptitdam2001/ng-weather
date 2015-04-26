weatherModule.directive('widgetWeather', ['openWeatherMapService', function(openWeatherMapService) {
	return {
		restrict: 'E',
		priority: 10,
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
		controller: ['$scope', function($scope) {
			$scope.weatherData = {};

			$scope.onError = function(data) {
				$scope.weatherData.wind = {};
				$scope.weatherData.wind.speedkmh = 0;
			};

			$scope.onSuccess = function(data) {
				// this callback will be called asynchronously
			    // when the response is available
			    $scope.weatherData = data;
			    //change mps to kmh
			    $scope.weatherData.wind.speedkmh = $scope.weatherData.wind.speed * 3.6;
				$scope.showContent = true;
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
			openWeatherMapService.getWeatherInfo(iattrs.city, iattrs.cityLon, iattrs.cityLat, iattrs.lang, scope.onSuccess, scope.onError());
		}
	}
}])