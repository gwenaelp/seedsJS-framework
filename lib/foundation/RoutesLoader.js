define([
	'module',
	'jquery',
	'app/lib/ember',
	'app/lib/ember-data',
	'text!app/templates/run.html'
], function(module, $, Ember, DS) {

	//module private variables
	var app = undefined;

	//Use requireJs to load files if specified with the "require" key
	requireJsFiles = function(url, routeObject){
		var controllerName = url.charAt(0).toUpperCase() + url.slice(1) + "Controller";
		if(routeObject.require !== undefined)
		{
			var requirements = [];

			if(routeObject.require.indexOf("m") !== -1) {
				requirements.push("app/models/" + url + "Model.js");
			}
			if(routeObject.require.indexOf("v") !== -1) {
				requirements.push("app/view/" + url + "View.js");
			}
			if(routeObject.require.indexOf("c") !== -1) {
				requirements.push("app/controllers/" + url + "Controller.js");
			}
			if(routeObject.require.indexOf("t") !== -1) {
				requirements.push("text!app/templates/" + url + ".html");
			}
			require(requirements, function() {
				console.log("files required");
			});
		}
	}

	addRoute = function(currentScope, url, parentMenuItem, routeObject) {
		requireJsFiles(url, routeObject);

		var routeName = url.charAt(0).toUpperCase() + url.slice(1) + "Route";

		app[routeName] = Ember.Route.extend({});

		//fill app's menus
	};

	fillAppMenu = function(currentRoute) {

		for (var i = 0; i <= currentRoute.appears_on.length - 1; i++) {
			var menu = currentRoute.appears_on[i];

			if(app.menus[menu] === undefined) {
				app.menus[menu] = [];
			}

			app.menus[menu].push({"label" : currentRoute.url});
		};
	}

	initializeRoutesRecursive = function(currentScope, routes) {
		console.log("initializeRoutesRecursive");
		console.old.log(routes);
		for (var i = 0; i <= routes.length - 1; i++) {
			var currentRoute = routes[i];

			addRoute(currentScope, currentRoute.url, [], currentRoute);

			fillAppMenu(currentRoute);

			var childRoutes = function(){
				if(currentRoute.children !== undefined) {
					initializeRoutesRecursive(this,currentRoute.children);
				}
			};
			currentScope.resource(currentRoute.url, childRoutes);

		};
	};

	var RoutesLoader = Ember.Object.extend({
		initializeRoutes : function(application, routes) {
			app = application;

			application.Router.map(function() {
				initializeRoutesRecursive(this, routes);
			});
		}
	});

	return RoutesLoader.create();
});