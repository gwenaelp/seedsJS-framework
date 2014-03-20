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
			return application.menus[this.get('name')];
		}.property('items')
	});

		}
	});

	routesLoader.initializeRoutes(application, JSON.parse(routes));

	return application;
});