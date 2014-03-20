define([
	'app/lib/ember'
], function(Ember) {

	var signals = {};

	var SignalManager = Ember.Object.extend({

		signals: {},

		registerForSignal: function(name, callback) {
			if(signals[name] === undefined) {
				signals[name] = [];

				this.signals[name] = function() {
					for (var i = signals[name].length - 1; i >= 0; i--) {
						signals[name][i](arguments);
					};
				}
			}

			signals[name].push(callback);
		}
	});

	return SignalManager.create();
});
