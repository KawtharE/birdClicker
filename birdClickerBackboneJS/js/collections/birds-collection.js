var app = app || {};

(function(){
	'use strict';

	app.birds = new Backbone.Collection([
		{
			birdName: 'Javelin',
			birdListImg: 'images_small/bird1-200_small.jpg',
			birdDisplayImg: 'images/bird1.jpg',
			birdImgAttribution: 'https://www.flickr.com/photos/hyalella/38685545911/in/gallery-flickr-72157662070816797/',
			clicksNumber: 0,
			id: 0
		},
		{
			birdName: 'Tweety',
			birdListImg: 'images_small/bird2-200_small.jpg',
			birdDisplayImg: 'images/bird2.jpg',
			birdImgAttribution: 'https://www.flickr.com/photos/mg_rogers/33229234452/in/gallery-flickr-72157662070816797/',
			clicksNumber: 0,
			id: 1
		},
		{
			birdName: 'Azuryz',
			birdListImg: 'images_small/bird3-200_small.jpg',
			birdDisplayImg: 'images/bird3.jpg',
			birdImgAttribution: 'https://www.flickr.com/photos/139235634@N04/34191401830/in/gallery-flickr-72157662070816797/',
			clicksNumber: 0,
			id: 2
		},
		{
			birdName: 'Dante',
			birdListImg: 'images_small/bird4-200_small.jpg',
			birdDisplayImg: 'images/bird4.jpg',
			birdImgAttribution: 'https://www.flickr.com/photos/130233070@N04/37425778714/in/gallery-flickr-72157662070816797/',
			clicksNumber: 0,
			id: 3
		},
		{
			birdName: 'Owlbundy',
			birdListImg: 'images_small/bird5-200_small.jpg',
			birdDisplayImg: 'images/bird5.jpg',
			birdImgAttribution: 'https://www.flickr.com/photos/frau-specht/37362864975/in/gallery-flickr-72157662070816797/',
			clicksNumber: 0,
			id: 4
		},
		{
			birdName: 'Fanteriso',
			birdListImg: 'images_small/bird6-200_small.jpg',
			birdDisplayImg: 'images/bird6.jpg',
			birdImgAttribution: 'https://www.flickr.com/photos/8805844@N02/32588187075/in/gallery-flickr-72157662070816797/',
			clicksNumber: 0,
			id: 5
		},
		{
			birdName: 'Mia',
			birdListImg: 'images_small/bird7-200_small.jpg',
			birdDisplayImg: 'images/bird7.jpg',
			birdImgAttribution: 'https://www.flickr.com/photos/12341100@N06/37152982943/in/gallery-flickr-72157662070816797/',
			clicksNumber: 0,
			id: 6
		},
		{
			birdName: 'Lexiy',
			birdListImg: 'images_small/bird8-200_small.jpg',
			birdDisplayImg: 'images/bird8.jpg',
			birdImgAttribution: 'https://www.flickr.com/photos/99052565@N03/34435356125/in/gallery-flickr-72157662070816797/',
			clicksNumber: 0,
			id: 7
		},
		{
			birdName: 'Archangel',
			birdListImg: 'images_small/bird9-200_small.jpg',
			birdDisplayImg: 'images/bird9.jpg',
			birdImgAttribution: 'https://www.flickr.com/photos/melvinschar/38599526902/in/gallery-flickr-72157662070816797/',
			clicksNumber: 0,
			id: 8
		},
		{
			birdName: 'Pearl',
			birdListImg: 'images_small/bird10-200_small.jpg',
			birdDisplayImg: 'images/bird10.jpg',
			birdImgAttribution: 'https://www.flickr.com/photos/moggl/37635059085/in/gallery-flickr-72157662070816797/',
			clicksNumber: 0,
			id: 9
		}
	]); 
	app.currentBird = new app.Bird(app.birds.toJSON()[0]);
	
})()