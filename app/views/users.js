define([
	'jquery',
	'app/lib/ember',
	'app/application',
	'app/controllers/users'
], function($, Ember, Application, UsersController) {
	Application.UsersView = Ember.View.extend({
		controller: UsersController
	});

	return Application.UsersView;
});