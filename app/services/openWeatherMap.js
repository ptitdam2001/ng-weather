weatherModule.service("openWeatherMapService", ['$http', 
	function($http) {

		var basePath = 'http://api.openweathermap.org/data/2.5/weather';

		this.getWeatherInfo = function(city, longitud, latitud, lang, successCallback, errorCallback) {
			//make openweather uri in function parameters
			var queryString = '';
			if (angular.isDefined(city)) {
				queryString += "q=" + city;
			} else if (angular.isDefined(longitud) && angular.isDefined(latitud)){
				queryString += "lat=" + latitud + '&lon=' + longitud;
			}

			var uri = basePath + '?' + queryString+'&lang='+lang+'&units=metric';
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
	}
]);