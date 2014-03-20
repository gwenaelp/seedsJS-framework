define([
	'jquery',
	'app/lib/ember',
	'app/lib/ember-data',
	"lib/foundation/RoutesLoader",
	"app/utils/SignalManager",
	"text!app/routes.json"
], function($, Ember, DS, routesLoader,signalManager, routes) {

	var application = Ember.Application.create({
		"signalManager": signalManager,
		"menus":{}
	});

	application.MenuView = Ember.View.extend({
		templateName: 'menu',
		items: function() {
			console.old.log("application.menus[this.get('name')]");
			console.old.log(application.menus[this.get('name')]);
			return application.menus[this.get('name')];
		}.property('items'),
		
		testVar:"aa"
	});

	Ember.Handlebars.helper('menu', application.MenuView);

	application.IndexRoute = Ember.Route.extend({
		setupController: function(controller) {
			// Set the IndexController's `title`
			// console.log("index route");
		}
	});

	routesLoader.initializeRoutes(application, JSON.parse(routes));

	console.log("test application");

	return application;
});