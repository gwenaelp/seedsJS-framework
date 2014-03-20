define([
	'jquery',
	'app/lib/ember',
	'app/lib/ember-data',
	'app/application'
], function($, Ember, DS, Application) {
	Application.Dashboard = DS.Model.extend({
		name: DS.attr('string'),
	});

	Application.Dashboard.reopenClass({
	});

	return Application.Dashboard;
});