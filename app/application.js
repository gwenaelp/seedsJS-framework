define([
	'jquery',
	'app/lib/ember',
	'app/lib/ember-data',
	"lib/seeds/RoutesLoader",
	"app/utils/SignalManager",
	"text!app/manifest.json"
], function($, Ember, DS, routesLoader,signalManager, manifest) {

	var application = Ember.Application.create({
		"signalManager": signalManager,
		"menus":{}
	});

	application.MenuView = Ember.View.extend({
		actions: {
			showmenu: function() {
				console.log("showing mmenu (app)");
			},
			menuAction: function() {
				console.old.log("Action");
				console.old.log(arguments);

				//convert args to array
				var args = Array.prototype.slice.call(arguments);
				var actionName = args.shift();

				// this.get('controller.controllers.another').send('someAction');
				this.send(actionName, args);
			}
		},
		templateName: 'menu',
		items: function() {
			return application.menus[this.get('name')];
		}.property('items'),

		isAction: function (scenarioStep) {
			return scenarioStep.type === "action";
		}
	});
	Ember.Handlebars.helper('menu', application.MenuView);

	Ember.Handlebars.registerHelper('ifeq', function(a, b, options) {
		return Ember.Handlebars.bind.call(options.contexts[0], a, options, true, function(result) {
			return result === b;
		});
	});

	routesLoader.initializeFiles(application, JSON.parse(manifest), function(){
		console.log("files loaded (from app)")
		routesLoader.initializeRoutes(application, JSON.parse(manifest));
	});

	return application;
});