$(function(){

	// The Model of our application
	var model = {
		currentBird: null,
		birdItems: []
	};

	// The * in the MV* pattern
	var connectorVM = {
		init: function(){
			this.getAllBirdItems();
			model.currentBird = model.birdItems[0];
			viewList.init();
			viewDisplay.init();
		},
		getAllBirdItems: function(){
			var birdNames = ['Javelin', 'Tweety', 'Azuryz', 'Dante', 'Owlbundy', 'Fanteriso', 'Mia', 'Lexiy', 'Archangel', 'Pearl'] ;
			var listImagesUrl = ['images_small/bird1-200_small.jpg', 'images_small/bird2-200_small.jpg', 'images_small/bird3-200_small.jpg', 'images_small/bird4-200_small.jpg', 'images_small/bird5-200_small.jpg', 'images_small/bird6-200_small.jpg', 'images_small/bird7-200_small.jpg', 'images_small/bird8-200_small.jpg', 'images_small/bird9-200_small.jpg', 'images_small/bird10-200_small.jpg'];
			var displayImagesUrl = ['images/bird1.jpg', 'images/bird2.jpg', 'images/bird3.jpg', 'images/bird4.jpg', 'images/bird5.jpg', 'images/bird6.jpg', 'images/bird7.jpg', 'images/bird8.jpg', 'images/bird9.jpg', 'images/bird10.jpg'];
			var birdImageAttribution = ['https://www.flickr.com/photos/hyalella/38685545911/in/gallery-flickr-72157662070816797/','https://www.flickr.com/photos/mg_rogers/33229234452/in/gallery-flickr-72157662070816797/','https://www.flickr.com/photos/139235634@N04/34191401830/in/gallery-flickr-72157662070816797/','https://www.flickr.com/photos/130233070@N04/37425778714/in/gallery-flickr-72157662070816797/','https://www.flickr.com/photos/frau-specht/37362864975/in/gallery-flickr-72157662070816797/','https://www.flickr.com/photos/8805844@N02/32588187075/in/gallery-flickr-72157662070816797/','https://www.flickr.com/photos/12341100@N06/37152982943/in/gallery-flickr-72157662070816797/','https://www.flickr.com/photos/99052565@N03/34435356125/in/gallery-flickr-72157662070816797/','https://www.flickr.com/photos/melvinschar/38599526902/in/gallery-flickr-72157662070816797/','https://www.flickr.com/photos/moggl/37635059085/in/gallery-flickr-72157662070816797/'];
			for (var i=0; i<birdNames.length; i++) {
				model.birdItems.push({
					birdName: birdNames[i],
					birdListImage: listImagesUrl[i],
					birdDisplayImage: displayImagesUrl[i],
					clickCounts: 0,
					birdImageAttribution: birdImageAttribution[i]
				});
			}
		},
		updateCurrentBird: function(newBird){
			model.currentBird = newBird;
		},
		updateClicksNumber: function(){
			model.currentBird.clickCounts++;
			viewDisplay.render();
		},
		getCurrentBird: function(){
			return model.currentBird;
		}, 
		getAllBirds: function(){
			return model.birdItems;
		}, 
		updateLevel: function(birdItem){
			var bird_level = 'Bird Clicker Level';
			if (birdItem.clickCounts < 10) {
				var bird_level = 'Bird Clicker Level 0';
			}
			else if ((birdItem.clickCounts >= 10) && (birdItem.clickCounts < 20)) {
				bird_level = 'Bird Clicker Level 1';
			}
			else if ((birdItem.clickCounts >= 20) && (birdItem.clickCounts < 30)) {
				bird_level = 'Bird Clicker Level 2';
			} else{
				bird_level = 'Bird Clicker Level 3';
			}
			return bird_level;
		}

	};

	// the first View: the List View
	var viewList = {
		init: function(){
			this.bird_list_container = document.getElementById('bird-list');
			this.render();
			var list_images = document.querySelectorAll('.list-item');
			list_images[0].classList.add('active');
		},
		render: function(){
			var all_birds = connectorVM.getAllBirds();
			for(var i=0; i<all_birds.length; i++){
				var bird = all_birds[i];
				var bird_list_elem = document.createElement('li');
				var bird_list_img = document.createElement('img');
				bird_list_img.src = bird.birdListImage;
				bird_list_img.classList.add('list-img');
				bird_list_elem.appendChild(bird_list_img);
				bird_list_elem.classList.add('list-item');
				bird_list_elem.addEventListener('click', (function(bird, bird_list_elem){
					return function(){
						var list = document.querySelectorAll('.list-item');
						list.forEach(function(item){
							item.classList.add('initial-state');
						});
						bird_list_elem.classList.remove('initial-state');
						bird_list_elem.classList.add('active');
						connectorVM.updateCurrentBird(bird);
						viewDisplay.render();
					}
				})(bird, bird_list_elem) );
				this.bird_list_container.appendChild(bird_list_elem);
			}
			
		}
	};

	// the second View: the Display View
	var viewDisplay = {
		init: function(){
			this.current_bird_container = document.getElementById('current-bird');
			this.current_bird_name = document.getElementById('bird-name');
			this.current_bird_img = document.getElementById('current-bird-image');
			this.current_bird_clicks = document.getElementById('clicks-number');
			this.current_bird_imgAttr = document.getElementById('bird-img-attr');
			this.current_bird_title = document.getElementById('bird-title');
			this.current_bird_img.addEventListener('click', function(){
				connectorVM.updateClicksNumber();
			});
			this.render();
		}, 
		render: function(){
			var current_bird = connectorVM.getCurrentBird();
			this.current_bird_name.textContent = 'Bird Name: '+current_bird.birdName;
			this.current_bird_img.src = current_bird.birdDisplayImage;
			this.current_bird_clicks.textContent = 'Clicks count: '+current_bird.clickCounts;
			this.current_bird_imgAttr.href = current_bird.birdImageAttribution;
			this.current_bird_title.textContent = connectorVM.updateLevel(current_bird);

		}
	};

	connectorVM.init();
})