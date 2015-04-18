ng-weather
==========

Angular Directive which show weather


Environment
==========

Go to project directory

```
npm install

bower install

npm install -g grunt-cli (if not installed)

grunt production

```


Example
==========
To display the example, you can execute ./server.sh

If there is a problem, you must install npm and http-server via npm

```
npm install http-server -g
```

```
http-server -o --cors -i
``

How to install directive
==========

Add js/weatherWidget.js into html links
Inject module 'WeatherModule' into the main application
implement the tag '<widget-weather lang="fr" city="montpellier"></widget-weather>'

By default, the language is english.

Available parameters
=========

+ mode : 'complete' by default, if mode="light|lite" then we display a light wersion of the widget
+ lang : the language to display
+ city : what city which we want display its weather
+ city-lat [Optional] : the latitud of the city
+ city-lon [Optional] : the longitud of the city