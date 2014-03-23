define([
	'jquery',
	'app/lib/ember',
	'app/lib/ember-data',
	'app/application'
], function($, Ember, DS, Application) {
	Application.Widget = DS.Model.extend({
		name: DS.attr('string'),
	});

	Application.Dashboard = DS.Model.extend({
		name: DS.attr('string'),
		items: DS.hasMany('widget')
	});

	Application.Dashboard.reopenClass({
	});

	var store = this.store;

	return Application.Dashboard;
});