'use strict';

var WeatherModule = angular.module('WeatherModule', [])
.directive('widgetWeather', function($q, $http) {

/*
'<div class="weather-widget"><div class="temperature"><div class="de"><div class="den"><div class="dene"><div class="denem"><div class="deneme">23<span>.9</span><strong>&deg;</strong></div></div></div></div></div></div><div class="icon"><i class="wi wi-night-alt-snow"></i>{{weatherData.name}}</div></div>',
*/

	var templateHtml = '<section class="weather-widget">'
  +'<h1>{{weatherData.name}}</h1>'
  +'<table><tr><td>'
  +'<div class="temperature wi wi-{{weatherData.weather.0.icon}}"></div>'
 // +'  <h2>{{weatherData.main.temp | number : 1}}<span class="degree-symbol">°</span><span class="celcius">C</span></h2>'
  +'</td><td>'
  +'<div class="ico_temp"><div class="de"><div class="den"><div class="dene"><div class="denem"><div class="deneme">{{weatherData.main.temp | number : 0}}<strong>&deg;</strong><!--<i class="wi wi-celsius"></i>--></div></div></div></div></div></div>'
  +'</td><td>'
  +'<div class="information">'
  +'  <span class="description">{{weatherData.weather.0.description}}</span>'
  +'</div>'
  +'</td></tr></table>'
  +'<ul>'
  +'  <li class="fontawesome-leaf left">'
  +'    <span>{{weatherData.wind.speedkmh | number : 1}} km/h</span>'
  +'  </li>'
  +'  <li class="fontawesome-tint center">'
  +'    <span>{{weatherData.main.humidity | number : 1}}%</span>'
  +'  </li>'
  +' <li class="fontawesome-umbrella right">'
  +'   <span>{{weatherData.clouds.all | number : 1}}%</span>'
  +'  </li>'
  +'</ul>'
  +'</section>';

	return {
		restrict: 'E',
		priority: 10,
		terminal: false,
//		template_url: 'html/weather.tpl.html',
		template: templateHtml,
		replace: true,
		transclude: false,
		scope: true,
		link: function($scope, $element, $attrs) {
			$http({method: 'GET', url: 'http://api.openweathermap.org/data/2.5/weather?q='+$attrs.city+'&lang='+$attrs.lang+'&units=metric'}).
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
			  });
		}
	}
})