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
})();
