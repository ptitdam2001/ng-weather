ng-weather
==========

Angular Directive which show weather


Example
==========
To display the example, you can execute ./server.sh

If there is a problem, you must install npm and http-server via npm

- npm install http-server -g
- http-server -o --cors -i

How to install directive
==========

Add js/weatherWidget.js into html links
Inject module 'WeatherModule' into the main application
implement the tag '<widget-weather lang="fr" city="montpellier"></widget-weather>'

Available parameters
=========

+ lang : the language to display
+ city : what city which we want display its weather