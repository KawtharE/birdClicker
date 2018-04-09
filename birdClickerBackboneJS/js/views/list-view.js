var app = app || {};

(function(){
	'use strict';

	app.ListView = Backbone.View.extend({
		el: '#list',
		tagName: 'li',
		template: _.template($('#item-template').html()),
		events: {
			'click .list-item': 'updateDisplayImg'
		},
		initialize: function(){
			this.render();
			$('#list-item0').addClass('active');
		},
		render: function(){
			this.$el.html(this.template({birds: app.birds.toJSON()}));					
			return this;
		},
		updateDisplayImg: function(ev){
			var birdName = $(ev.currentTarget).attr('data-name');
			$('.list-item').removeClass('active');
			$(ev.currentTarget).addClass('active');
			_.each(app.birds.toJSON(), function(bird){
					if (bird.birdName === birdName) {
						app.currentBird.updateCurrentBird(bird);
					}
			});
			app.displayView = new app.DisplayView();
		}
	});
	app.listView = new app.ListView();
})()