define([
	'jquery',
	'app/lib/ember',
	'app/application'
], function($, Ember, Application, Dashboard) {

	Application.UsersController = Ember.ObjectController.extend({
		setupController: function(controller, model) {
			controller.set('content', {
				testcontent: "pwet"
			});

			console.log("UsersController setupController");
		},
		actions: {
			testaction: function() {
				console.log("showing mmenu");
			},
			showmenu: function() {
				console.log("showing mmenu");
			}
		}
	});
	console.log("UsersController loaded");
	return Application.UsersController;
});