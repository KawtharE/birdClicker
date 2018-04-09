var AppView = Backbone.View.extend({
	el: '#container',
	initialize: function() {
		this.listenTo(app.birds, 'all', this.render);
	},
	render: function() {
		this.container = $('#container');
		this.list = $('#list');
		this.display = $('#display');
		this.list.show();
		this.display.show();
		this.container.show();
	}
});


