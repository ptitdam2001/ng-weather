weatherModule.service("openWeatherMapService", ['$http',
	function($http) {

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
