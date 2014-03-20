define(function(require, exports, module) {
	require('ember');
	require('ember-data');

	DS.ArrayTransform = DS.Transform.extend({
		deserialize: function(serialized) {
			if(Ember.typeOf(serialized) === 'array') {
				return serialized;
			}

			return [];
		},

		serialize: function(deserialized) {
			var type = Ember.typeOf(deserialized);

			if(type === 'array') {
				return deserialized;
			}
			else if(type === 'string') {
				return deserialized.split(',').map(function(item) {
					return jQuery.trim(item);
				});
			}

			return [];
		}
	});

	return DS;
});