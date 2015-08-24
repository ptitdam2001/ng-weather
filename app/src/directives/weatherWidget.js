(function() {
	'use strict';

	angular
		.module('ptitdam-ng-openweathermap')
		.directive('widgetWeather', function() {
			return {
				restrict: 'E',
				templateUrl: 'src/templates/weather.tpl.html',
				replace: true,
				transclude: false,
				scope: {
					longitud: '@cityLon',
					latitud: '@cityLat',
					cityName: '@city',
					lang: '@lang'
				},
				controller: 'widgetCtrl',
				link: function(scope, $element, iattrs, ctrl) {
					//define mode
					if (angular.isDefined(iattrs.mode) && (iattrs.mode == 'light' || iattrs.mode == 'lite')) {
						scope.showMode = 'light';
					} else {
						scope.showMode = 'complete';
					}
				}
			}
		});
})();