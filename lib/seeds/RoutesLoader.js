define([
	'module',
	'jquery',
	'app/lib/ember',
	'app/lib/ember-data',
	'text!seeds/generated/available_files.gen.json',
	'text!app/templates/dashboard.html'
], function(module, $, Ember, DS, availableFiles) {

	availableFiles = JSON.parse(availableFiles);

	var app = undefined;

	isFileAvailable = function(type, url) {
		type += "s";
		if(availableFiles[type] !== undefined)
			return availableFiles[type].contains(url);
		else
			return false;
	}

	//Use requireJs to load files (such as models, views, controllers, templates) if they exists
	requireJsFiles = function(url, routeObject){
		if(routeObject.require !== undefined)
		{
			var requirements = [];

			if(isFileAvailable("model", url+ ".js")) {
				requirements.push("app/models/" + url);
			}
			if(isFileAvailable("view", url+ ".js")) {
				requirements.push("app/views/" + url);
			}
			if(isFileAvailable("controller", url+ ".js")) {
				requirements.push("app/controllers/" + url);
			}
			if(isFileAvailable("template", url+ ".html")) {
				var templateFileName = 'text!app/templates/' + url + '.html';

				require([templateFileName], function(templateContent) {
						Ember.TEMPLATES[url] = Ember.Handlebars.compile(templateContent);
				});
			}
			require(requirements);
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