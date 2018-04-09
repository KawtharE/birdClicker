var app = app || {};

(function(){
	'use strict';

	var BirdRouter = Backbone.Router.extend({
		routes: {
			'*filter': 'setFilter'
		},

		setFilter: function (param) {
			// Set the current filter to be used
			app.BirdFilter = param || '';

		}
	});

	app.BirdRouter = new BirdRouter();
	Backbone.history.start();
})();