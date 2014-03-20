require.config({
	paths: {
		'app': 'app',
		'lib': 'lib',

		'seeds': 'lib/seeds',
		'jquery': 'lib/jquery',

		'handlebars': 'lib/handlebars-1.0.0',
		'ember': 'lib/ember',
		'ember-data': 'lib/ember-data',

		//requirejs plugins
		'text': 'lib/requirejs-plugins/text'
	},

	shim: {
		'ember': {
			deps: ['jquery', 'handlebars']
		},

		'ember-data': {
			deps: ['ember']
		}
	}
});

require(['seeds/utils/console'], function() {
	require(['main']);
});