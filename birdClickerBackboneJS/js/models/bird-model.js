var app = app || {};

(function(){
	'use strict';

	app.Bird = Backbone.Model.extend({
		default: {
			birdName: '',
			birdListImg: '',
			birdDisplayImg: '',
			birdImgAttribution: '',
			clicksNumber: 0,
			id: 0
		},
		updateClicksNumber: function(){
			app.currentBird.set('clicksNumber', app.currentBird.get('clicksNumber') + 1);
			this.updateTitle(app.currentBird.get('clicksNumber'));
		},
		updateCurrentBird: function(bird){
			app.currentBird = new app.Bird(bird);
			this.updateTitle(app.currentBird.get('clicksNumber'));
		},
		updateTitle: function(clicksNumber){
			app.bird_title = '';
			if (clicksNumber < 10){
				app.bird_title = '1';
			}
			else if ((clicksNumber >= 10) && (clicksNumber < 20)){
				app.bird_title = '2';
			}
			else {
				app.bird_title = '3';
			}
			return app.bird_title;
		}
	});
})();

