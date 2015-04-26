/* GruntFile config */
//var util = require('./libs/grunt/utils.js');

module.exports = function(grunt) {
	// Load the plugins.
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-livereload');

	//variables
	var basePath = 'example';
	var jsDist = 'dist/ptitdamWeather.js';
	var PathDist = 'dist/';
	var jsSource = ['libs/**/*.js', 'app/**/*.js', 'app/app.js']

	//global beforeEach
	//util.init();

	//Grunt Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			all: ['Gruntfile.js', 'libs/**/*.js', 'app/**/*.js','test/**/*.js']
		},
		less: {
			dist: {
				options: {
					paths: ["assets/css"],
					cleancss: true,
					imports: {
						reference: [
						"less/mixins.less", 
						"less/variables.less" 
						]
					}
		  		},
		  		files: [
					{
						expand: true,
						cwd: 'less',
						src: ['weather.less', '!{var,mix,version}*.less'],
						dest: PathDist,
						ext: '.css'
					}
				]
			},
			compileAsset: {
				options: {
					paths: ["assets/css"],
					cleancss: true,
					imports: {
		          // Use the new "reference" directive, e.g.
		          // @import (reference) "variables.less";
						reference: [
						"less/mixins.less", 
						"less/variables.less" 
						]
					}
		  		},
		  		files: [
					{
						expand: true,
						cwd: 'less',
						src: ['weather.less', '!{var,mix,version}*.less'],
						dest: basePath + '/css',
						ext: '.css'
					}
				]
			},
			compileBootstrap: {
				options: {
					strictMath: true,
					sourceMap: true,
					outputSourceFiles: true,
					sourceMapURL: 'bootstrap.css.map',
					sourceMapFilename: basePath + '/css/bootstrap.css.map'
				},
				src: 'libs/bootstrap/less/bootstrap.less',
				dest: basePath + '/css/bootstrap.css'
			}
		},
		watch: {
			options: {
				livereload: true
			},
			scripts: {
				files: ['**/*.js'],
				tasks: ['jshint'],
				options: {
					spawn: false,
					livereload: true,
					livereloadOnError: false
				},
			},
			styles: {
				files: ['**/*.less'],
				tasks: ['less:compileAsset'],
				options: {
					livereload: true,
					livereloadOnError: false
				}
			},
			templates: {
				files: ['**/*.html'],
				options: {
					livereload: true,
					livereloadOnError: false
				}
			}

		},
		concat: {
			options: {
				separator: ';',
			},
			libs: {
				src: ['libs/jquery/dist/jquery.js', 'libs/angular/angular.js', 'libs/bootstrap/js/*.js'],
				dest: basePath + '/js/libraries.js'
			},
			app: {
				src: ['app/*.js', 'app/services/*.js', 'app/controllers/*.js', 'app/directives/*.js', 'app/filters/*.js'],
				dest: basePath + '/js/application.js'
			},
			dist: {
				src: ['app/*.js', 'app/services/*.js', 'app/controllers/*.js', 'app/directives/*.js', 'app/filters/*.js'],
				dest: jsDist		
			}
		},
		uglify: {
			options: {
				separator: ';'
			},
			app: {
				src: ['app/controllers/*.js', 'app/directives/*.js', 'app/filters/*.js', 'app/app.js'],
				dest: basePath + '/js/application.js'
			},
			dist: {
				src: jsDist,
				dest: jsDist
			}
		},
		copy: {
			moveHtmlToDist: {
				files: [
					{
						src: 'app/index.html', 
						dest: 'dist/index.html'
					},
					{
						expand: true, 
						flatten: true, 
						src: ['app/templates/**/*.html'], 
						dest: basePath
					},
					{
						expand: true, 
						flatten: true, 
						src: ['app/templates/**/*.html'], 
						dest: PathDist
					},
					{
						src: ['assets/**/*'],
						dest: PathDist
					}
				]
			},
			moveAssets :{
				files: [{
					src: ['assets/**/*'],
					dest: basePath + '/'
				}]
			},
			angular: {
				files: [
				{
					expand: true, 
					flatten: true, 
					src: ['libs/angular-*/angular-*.min.js', 'libs/angular-*/angular-*.js', 'libs/angular-*/angular-*.min.js.map'], 
					dest: basePath + '/js', 
					filter: 'isFile'
				}
				]
			}
		},
		connect: {
			demo: {
				options: {
					port: 8080,
					protocol: 'http',
					hostname: '127.0.0.1',
					base: 'example/',
					keepalive: true,
					middleware: function(connect, options) {

						var base = Array.isArray(options.base) ? options.base[options.base.length - 1] : options.base;
						
						return [
							//Enable CORS
							connect().use(function (req, res, next) {
							 	res.setHeader('Access-Control-Allow-Credentials', true);
							 	res.setHeader("Access-Control-Allow-Headers", "*");
							 	res.setHeader('Access-Control-Allow-Origin', '*');
							 	next();
							}),
							connect.static(base),
							connect.directory(base)
			              ];
		          	},
		          	livereload: true
		      	}
		  	}
		}
	});


	//Grunt Tasks definition
	grunt.registerTask('default', ['dev', 'watch']);
	grunt.registerTask('init-js-libs', ['concat:libs', 'copy:angular']);
	grunt.registerTask('init-css', ['less:compileAsset', 'less:compileBootstrap']);
	grunt.registerTask('dev', ['init-css', 'init-js-libs', 'concat:app', 'copy:moveHtmlToDist', 'copy:moveAssets']);
	grunt.registerTask('demo', ['init-css', 'init-js-libs', 'concat:app', 'copy:moveHtmlToDist', 'copy:moveAssets', 'connect:demo']);
	grunt.registerTask('dist', ['less:dist', 'concat:dist', 'uglify:dist', 'copy:moveHtmlToDist']);
	//grunt.registerTask('production', ['init-css', 'uglify:libs', 'uglify:app', 'copy:moveHtmlToDist', 'copy:moveAssets']);
}