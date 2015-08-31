(function() {
    'use strict';

    angular.module('ptitdam-ng-openweathermap', []);

})();

(function() {
	'use strict';

	angular
		.module('ptitdam-ng-openweathermap')
		.directive('widgetWeather', function() {
			return {
				restrict: 'E',
				template: '<div><div class=loader ng-hide={{!showContent}}><div class=loading-circle></div><div class=loading-circle></div><div class=loading-circle></div><div class=loading-circle></div><div class=loading-circle></div><div class=loading-circle></div><div class=loading-circle></div><div class=loading-circle></div></div><section class=weather-widget ng-hide="{{showMode == \'light\'}}"><div class="row header"><div class="col-sm-8 col-xs-8 text-left"><h5>{{weatherData.name}}</h5></div><div class="col-sm-4 col-xs-4 text-right">{{weatherData.main.temp | number : 0}}<object type=image/svg+xml data=/assets/svg/Degrees-celcius.svg class="wicons small"></object></div></div><div class=row ng-repeat="weather in weatherData.weather"><div class="col-sm-6 col-xs-6 text-center"><object type=image/svg+xml data=/assets/svg/{{weather.icon}}.svg class="wicons large"><div>{{weather.description}}</div></object></div><div class="col-sm-6 col-xs-6"><ul class=text-right><li>{{weatherData.wind.speedkmh | number : 0}} km/h <span class=fontawesome-leaf></span></li><li>{{weatherData.main.humidity | number : 0}}% <span class=fontawesome-tint></span></li><li>{{weatherData.clouds.all | number : 0}}% <span class=fontawesome-umbrella></span></li></ul></div></div></section><section class="weather-widget small-size" ng-show="{{showMode == \'light\'}}"><div class=row><div class="col-sm-12 col-xs-12 text-center">{{weatherData.name}}</div></div><div class=row><div class="col-sm-6 col-xs-6 text-left" ng-repeat="weather in weatherData.weather"><object type=image/svg+xml data=/assets/svg/{{weather.icon}}.svg class="wicons medium"></object></div><div class="col-sm-6 col-xs-6 text-right small-desc-part">{{weatherData.main.temp | number : 0}}<object type=image/svg+xml data=/assets/svg/Degrees-celcius.svg class="wicons small"></object></div></div></section></div>',
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
(function () {
    'use strict';

    angular
        .module('ptitdam-ng-openweathermap')
        .controller('widgetCtrl', widgetCtrl);

    /** ng-inject */
    function widgetCtrl(openWeatherMapService) {
        var ctrl = this;

        ctrl.weatherData = {};
        ctrl.showContent = false;


        var onError = function (error) {
            ctrl.weatherData.wind = {};
            ctrl.weatherData.wind.speedkmh = 0;
        };

        var onSuccess = function (data) {
            // this callback will be called asynchronously
            // when the response is available
            ctrl.weatherData = data;
            //change mps to kmh
            ctrl.weatherData.wind.speedkmh = ctrl.weatherData.wind.speed * 3.6;
            ctrl.showContent = true;
        };

        //make openweather uri in function parameters
        openWeatherMapService.getWeatherInfo(ctrl.cityName, ctrl.longitud, ctrl.latitud, ctrl.lang, onSuccess, onError);
    }
    widgetCtrl.$inject = ["openWeatherMapService"];
})();

(function() {
    'use strict';

    angular
        .module('ptitdam-ng-openweathermap')
        .service("openWeatherMapService", ['$http', function($http) {

            var basePath = 'http://api.openweathermap.org/data/2.5/';
            var weatherPath = basePath + 'weather';
            var forecastPath = basePath + 'forecast';

            function makeRequest(parameters) {
                var queryString = '';

                //coordinates
                if (angular.isDefined(parameters.city) && parameters.city != null) {
                    queryString += "q=" + parameters.city;
                } else if (angular.isDefined(parameters.longitud) && angular.isDefined(parameters.latitud) && parameters.longitud != null && parameters.latitud != null) {
                    queryString += "lat=" + parameters.latitud + '&lon=' + parameters.longitud;
                } else if (angular.isDefined(parameters.id) && parameters.id != null) {
                    queryString += 'id=' + parameters.id;
                } else {
                    new Error("openWeatherMapService : location is not defined");
                }

                //lang
                if (angular.isDefined(parameters.lang)) {
                    queryString += '&lang='+ parameters.lang;
                }

                //metrics
                if (angular.isDefined(parameters.units)) {
                    queryString += '&units=' + parameters.units;
                } else {
                    queryString += '&units=metric';
                }

                //nb days to forecast
                if (angular.isDefined(parameters.cnt) && parseInt(parameters.cnt) < 17) {
                    queryString += '&cnt=' + parameters.cnt;
                }

                return queryString;
            }

            function executeQuery(uri, successCallback, errorCallback) {
                $http({
                    method: 'GET',
                    url: uri
                }).
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
            }
            this.getWeatherInfo = function(city, longitud, latitud, lang, successCallback, errorCallback) {
                //make openweather uri in function parameters
                var queryString = makeRequest({
                    'city' : angular.isDefined(city) ? city : null,
                    'longitud' : angular.isDefined(longitud) ? longitud : null,
                    'latitud' : angular.isDefined(latitud) ? latitud : null,
                    'lang' : angular.isDefined(lang) ? lang : 'en'
                });

                executeQuery(weatherPath + '?' + queryString, successCallback, errorCallback);
            };

            this.getForecastEvery3hours = function(city, longitud, latitud, lang, successCallback, errorCallback) {
                var queryString = makeRequest({
                    'city' : angular.isDefined(city) ? city : null,
                    'longitud' : angular.isDefined(longitud) ? longitud : null,
                    'latitud' : angular.isDefined(latitud) ? latitud : null,
                    'lang' : angular.isDefined(lang) ? lang : 'en'
                });

                executeQuery(forecastPath + '?' + queryString, successCallback, errorCallback);
            };

            this.getForecastEveryDays = function(city, longitud, latitud, lang, nbDays, successCallback, errorCallback) {
                //make openweather uri in function parameters
                var queryString = makeRequest({
                    'city' : angular.isDefined(city) ? city : null,
                    'longitud' : angular.isDefined(longitud) ? longitud : null,
                    'latitud' : angular.isDefined(latitud) ? latitud : null,
                    'lang' : angular.isDefined(lang) ? lang : 'en',
                    'cnt' : nbDays
                });

                executeQuery(forecastPath + '/daily?' + queryString, successCallback, errorCallback);
            };

        }
        ]);

})();