"use strict";var weatherModule=angular.module("ptitdamWeather",[]);weatherModule.service("openWeatherMapService",["$http",function(a){function b(a){var b="";return angular.isDefined(a.city)&&null!=a.city?b+="q="+a.city:angular.isDefined(a.longitud)&&angular.isDefined(a.latitud)&&null!=a.longitud&&null!=a.latitud?b+="lat="+a.latitud+"&lon="+a.longitud:angular.isDefined(a.id)&&null!=a.id?b+="id="+a.id:new Error("openWeatherMapService : location is not defined"),angular.isDefined(a.lang)&&(b+="&lang="+a.lang),b+=angular.isDefined(a.units)?"&units="+a.units:"&units=metric",angular.isDefined(a.cnt)&&parseInt(a.cnt)<17&&(b+="&cnt="+a.cnt),b}function c(b,c,d){a({method:"GET",url:b}).success(function(a){"function"==typeof c&&c(a)}).error(function(a){"function"==typeof d&&d(a)})}var d="http://api.openweathermap.org/data/2.5/",e=d+"weather",f=d+"forecast";this.getWeatherInfo=function(a,d,f,g,h,i){var j=b({city:angular.isDefined(a)?a:null,longitud:angular.isDefined(d)?d:null,latitud:angular.isDefined(f)?f:null,lang:angular.isDefined(g)?g:"en"});c(e+"?"+j,h,i)},this.getForecastEvery3hours=function(a,d,e,g,h,i){var j=b({city:angular.isDefined(a)?a:null,longitud:angular.isDefined(d)?d:null,latitud:angular.isDefined(e)?e:null,lang:angular.isDefined(g)?g:"en"});c(f+"?"+j,h,i)},this.getForecastEveryDays=function(a,d,e,g,h,i,j){var k=b({city:angular.isDefined(a)?a:null,longitud:angular.isDefined(d)?d:null,latitud:angular.isDefined(e)?e:null,lang:angular.isDefined(g)?g:"en",cnt:h});c(f+"/daily?"+k,i,j)}}]),weatherModule.directive("widgetWeather",["openWeatherMapService",function(a){return{restrict:"E",priority:10,templateUrl:"weather.tpl.html",replace:!0,transclude:!1,scope:{longitud:"@cityLon",latitud:"@cityLat",cityName:"@city",lang:"@lang",showMode:"@mode"},controller:["$scope",function(a){a.weatherData={},a.onError=function(){a.weatherData.wind={},a.weatherData.wind.speedkmh=0},a.onSuccess=function(b){a.weatherData=b,a.weatherData.wind.speedkmh=3.6*a.weatherData.wind.speed,a.showContent=!0}}],link:function(b,c,d){b.showMode=!angular.isDefined(d.mode)||"light"!=d.mode&&"lite"!=d.mode?"complete":"light",b.showContent=!1,a.getWeatherInfo(d.city,d.cityLon,d.cityLat,d.lang,b.onSuccess,b.onError())}}}]);