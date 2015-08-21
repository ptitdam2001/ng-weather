"use strict";

weatherModule.controller('widgetCtrl', ['$scope', 'openWeatherMapService', function($scope, openWeatherMapService) {
  $scope.weatherData = {};

  var onError = function(data) {
    $scope.weatherData.wind = {};
    $scope.weatherData.wind.speedkmh = 0;
  };

  var onSuccess = function(data) {
    // this callback will be called asynchronously
      // when the response is available
      $scope.weatherData = data;
      //change mps to kmh
      $scope.weatherData.wind.speedkmh = $scope.weatherData.wind.speed * 3.6;
    $scope.showContent = true;
  };

  //make openweather uri in function parameters
  $scope.showContent = false;
  openWeatherMapService.getWeatherInfo($scope.cityName, $scope.longitud, $scope.latitud, $scope.lang, onSuccess, onError);
});
