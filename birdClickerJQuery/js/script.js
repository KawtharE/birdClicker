$(function(){

	// Getting the DOM elements with jQuery
	var display_area = $('#display');
	var display_name = $('#bird-name');
	var display_title = $('#bird-title');
	var display_counts = $('#bird-clicks-number');
	var display_img = $('#bird-dislay-img');
	var display_img_attr = $('#img-attr');
	var list_area = $('#list');
	var list_ul = $('#bird-list');

	// Storing the birds list data in an array
	var birds_list = [
		{
			name: 'Javelin',
			listImg: 'images_small/bird1-200_small.jpg',
			displayImg: 'images/bird1.jpg',
			imgAttribution: 'https://www.flickr.com/photos/hyalella/38685545911/in/gallery-flickr-72157662070816797/'
		},
		{
			name: 'Tweety',
			listImg: 'images_small/bird2-200_small.jpg',
			displayImg: 'images/bird2.jpg',
			imgAttribution: 'https://www.flickr.com/photos/mg_rogers/33229234452/in/gallery-flickr-72157662070816797/'
		},
		{
			name: 'Azuryz',
			listImg: 'images_small/bird3-200_small.jpg',
			displayImg: 'images/bird3.jpg',
			imgAttribution: 'https://www.flickr.com/photos/139235634@N04/34191401830/in/gallery-flickr-72157662070816797/'
		},
		{
			name: 'Dante',
			listImg: 'images_small/bird4-200_small.jpg',
			displayImg: 'images/bird4.jpg',
			imgAttribution: 'https://www.flickr.com/photos/130233070@N04/37425778714/in/gallery-flickr-72157662070816797/'
		},
		{
			name: 'Owlbundy',
			listImg: 'images_small/bird5-200_small.jpg',
			displayImg: 'images/bird5.jpg',
			imgAttribution: 'https://www.flickr.com/photos/frau-specht/37362864975/in/gallery-flickr-72157662070816797/'
		},
		{
			name: 'Fanteriso',
			listImg: 'images_small/bird6-200_small.jpg',
			displayImg: 'images/bird6.jpg',
			imgAttribution: 'https://www.flickr.com/photos/8805844@N02/32588187075/in/gallery-flickr-72157662070816797/'
		},
		{
			name: 'Mia',
			listImg: 'images_small/bird7-200_small.jpg',
			displayImg: 'images/bird7.jpg',
			imgAttribution: 'https://www.flickr.com/photos/12341100@N06/37152982943/in/gallery-flickr-72157662070816797/'
		},
		{
			name: 'Lexiy',
			listImg: 'images_small/bird8-200_small.jpg',
			displayImg: 'images/bird8.jpg',
			imgAttribution: 'https://www.flickr.com/photos/99052565@N03/34435356125/in/gallery-flickr-72157662070816797/'
		},
		{
			name: 'Archangel',
			listImg: 'images_small/bird9-200_small.jpg',
			displayImg: 'images/bird9.jpg',
			imgAttribution: 'https://www.flickr.com/photos/melvinschar/38599526902/in/gallery-flickr-72157662070816797/'		},
		{
			name: 'Pearl',
			listImg: 'images_small/bird10-200_small.jpg',
			displayImg: 'images/bird10.jpg',
			imgAttribution: 'https://www.flickr.com/photos/moggl/37635059085/in/gallery-flickr-72157662070816797/'
		}
	];

	// set up the initial state of the display view
	(function addBirdDisplay(){
		var count = 0;
		var item = $('#list-item0');
		item.addClass('active');
		display_name.text('Bird Name: '+birds_list[0].name);
		display_img.attr('src', birds_list[0].displayImg);
		display_img_attr.attr('href', birds_list[0].imgAttribution);
		display_counts.text('Clicks count: '+count);
		count++;
		setTheTitle(count)
		display_img.on('click', function(){
			display_counts.text('Clicks count: '+count);
			setTheTitle(count)
			count++;
		});
	})();
	
	// set up the view
	(function birdView(){
		for(var i=0; i< birds_list.length; i++){
			var bird = birds_list[i];
			list_ul.append('<li class="list-item" id="list-item'+i+'">'+'<img class="img-list" src="'+bird.listImg+'"></li>');
			var item = $('#list-item'+i+'');
			item.on('click',(function(bird, item){
				return function(){
					var items = $('.list-item');
					items.removeClass('active');
					item.addClass('active');
					display_img.attr('src', bird.displayImg);
					display_img_attr.attr('href', bird.imgAttribution);
					display_name.text('Bird Name: '+bird.name);
					var count = 0;
					display_counts.text('Clicks count: '+count);
					count++;
					setTheTitle(count);
					display_img.on('click', function(){
							display_counts.text('Clicks count: '+count);
							setTheTitle(count);
							count++;
					});
				}
			})(bird, item));			
		};


	})();

	function setTheTitle(count){
		display_title.text('Bird Clicker Level');
		if (count < 10){
			display_title.text('Bird Clicker Level 0');
		} 
		else if ((count >= 10) && (count < 20)){
			display_title.text('Bird Clicker Level 1');
		}
		else if ((count >=20) && (count < 30)){
			display_title.text('Bird Clicker Level 2');
		}
		else{
			display_title.text('Bird Clicker Level 3');
		}
	}


})
