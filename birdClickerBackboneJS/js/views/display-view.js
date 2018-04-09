var app = app || {};

(function(){
	'use strict';

	app.DisplayView = Backbone.View.extend({
		el: '#display',
		template: _.template($('#display-template').html()),
		events: function(){
			var selector = '#displayed-item' + app.currentBird.get('id');
		  	var ev = {};
		  	ev['click ' + selector] = 'updateClicksNumber';
		  return ev;
		},
		initialize: function(){			
			app.bird_title = 0;
			this.listenTo(app.currentBird, 'change', this.render);
			this.render();
		},
		render: function(){
			this.$el.html(this.template({bird: app.currentBird.toJSON(), title: app.bird_title}));
			return this;
		},
		updateClicksNumber: function(ev){
			ev.stopImmediatePropagation();
			app.currentBird.updateClicksNumber();
		}
	});

	app.displayView = new app.DisplayView();
})();