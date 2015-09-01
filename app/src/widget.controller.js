(function () {
    'use strict';

    angular
        .module('ptitdam-ng-openweathermap')
        .controller('widgetCtrl', widgetCtrl);

    /** ng-inject */
    function widgetCtrl($scope, openWeatherMapService, $log) {
        var ctrl = this;

        ctrl.weatherData = {};
        ctrl.showContent = false;

        var onError = function () {
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
        openWeatherMapService.getWeatherInfo($scope.cityName, $scope.longitud, $scope.latitud, $scope.lang, onSuccess, onError);
    }
})();
