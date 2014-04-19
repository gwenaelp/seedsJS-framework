define([
	'module',
	'jquery',
	'app/lib/ember',
	'app/lib/ember-data',
	'text!seeds/generated/available_files.gen.json',
], function(module, $, Ember, DS, availableFiles) {

	console.log(availableFiles);
	availableFiles = JSON.parse(availableFiles);

	var app = undefined;

	isFileAvailable = function(type, name) {
		type += "s";
		if(availableFiles[type] !== undefined)
			return availableFiles[type].contains(name);
		else
			return false;
	}

	//Use requireJs to load files (such as models, views, controllers, templates) if they exists
	getRequirementsOfRoute = function(name, routeObject){
		var requirements = [];

		if(isFileAvailable("model", name + ".js")) {
			requirements.push("app/models/" + name);
		}
		if(isFileAvailable("view", name + ".js")) {
			requirements.push("app/views/" + name);
		}
		if(isFileAvailable("controller", name + ".js")) {
			requirements.push("app/controllers/" + name);
		}
		if(isFileAvailable("template", name + ".html")) {
			requirements.push('text!app/templates/' + name + '.html');

			// require([templateFileName], function(templateContent) {
			// 		Ember.TEMPLATES[name] = Ember.Handlebars.compile(templateContent);
			// });
		}
		return requirements;
	}

	addRoute = function(currentScope, name, parentMenuItem, routeObject) {
		//fill app's menus
		var routeName = name.charAt(0).toUpperCase() + name.slice(1) + "Route";

		app[routeName] = Ember.Route.extend({
			setupController: function(controller, model) {
				console.log("setupController for :"  + routeName);
				console.old.log(arguments);
			}

		});
	};

	fillAppMenu = function(currentRoute) {

		for (var i = 0; i <= currentRoute.appears_on.length - 1; i++) {
			var menu = currentRoute.appears_on[i];

			if(app.menus[menu] === undefined) {
				app.menus[menu] = [];
			}

			app.menus[menu].push({
				"label" : currentRoute.name,
				"type" : currentRoute.type
			});
		};
	}

	getRequirementsList = function(currentRequirements, routes) {
		for (var i = 0; i <= routes.length - 1; i++) {
			var currentRoute = routes[i];

			var newRequirements = getRequirementsOfRoute(currentRoute.name, routes);
			currentRequirements = currentRequirements.concat(newRequirements);

			var childRoutes = function(){
				if(currentRoute.children !== undefined) {
					getRequirementsList(currentRequirements,currentRoute.children);
				}
			};
		};
		return currentRequirements;
	}
	initializeRoutesRecursive = function(currentScope, routes) {
		for (var i = 0; i <= routes.length - 1; i++) {
			var currentRoute = routes[i];

			addRoute(currentScope, currentRoute.name, [], currentRoute);

			fillAppMenu(currentRoute);

			var childRoutes = function(){
				if(currentRoute.children !== undefined) {
					initializeRoutesRecursive(this,currentRoute.children);
				}
			};
			currentScope.resource(currentRoute.name, childRoutes);
		};
	};

	var requirements = [];

	var RoutesLoader = Ember.Object.extend({
		initializeFiles : function(application, routes, callback) {
			app = application;
			requirements = getRequirementsList([], routes);

			return require(requirements, function() {

				for (var i = 0; i < requirements.length; i++) {
					if(requirements[i].slice(0,5) === "text!"){
						var name = requirements[i].split("templates/")[1].slice(0,-5);
						console.log("name");
						console.log(name);
						Ember.TEMPLATES[name] = Ember.Handlebars.compile(arguments[i]);
					}
				};

				callback();
			})
		},
		initializeRoutes : function(application, routes) {
			app = application;

			application.Router.map(function() {
				initializeRoutesRecursive(this, routes);
			});
		}
	});

	return RoutesLoader.create();
});