define([
	'jquery',
	'app/lib/ember',
	'app/application',
	'app/models/dashboard'
], function($, Ember, Application, Dashboard) {

	Application.DashboardController = Ember.ObjectController.extend({
	});

	return Application.DashboardController;
});