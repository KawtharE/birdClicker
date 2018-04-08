# BirdClicker
Bird Clicker app: Inspired from the Cow Clicker app the social game on Facebook by **Ian Bogost**.

The application have a picture of a bird with the bird name, title and number of clicks, all displayed when clicking on one of the list item which is actually a small version of the same displayed image generated using **Gulp**, the number of clicks increment whenever we click on the displayed image.

The solution is responsive since I have adopted the **Flexbox** approach. 

**Version 1 with jQuery**

**Version 2 with vanillaJS**

**Version 3 with knockoutJS**

**Version 3 with backboneJS**

The difference between these four versions is the way we implements the functionalities of the app. In the first version, with jQuery we are not using any kind of libraries just a pure jQuery functions. In the other versions, we are writing more professional, clean and stable code using **organizational techniques**.

## Version 1 -- jQuery

![Starting Screen](https://github.com/KawtharE/birdClicker/blob/master/assets/birdClickerJQuery.gif)

With **jQuery** we are grabbing DOM elements that we are going to update conditionally by adding dynamically some HTML code, in order to display the data that we have initially save it in an array (in this case our data are static so we keep it in an array).

All we need is installing jQuery:

      $npm install jquery@3.3.1

##### 1- Grabbing the DOM elements

      // Getting the DOM elements with jQuery
      var display_area = $('#display');
      var display_name = $('#bird-name');
      var display_title = $('#bird-title');
      var display_counts = $('#bird-clicks-number');
      var display_img = $('#bird-dislay-img');
      var display_img_attr = $('#img-attr');
      var list_area = $('#list');
      var list_ul = $('#bird-list');

##### 2- Initialize the Data

      // Storing the birds list data in an array
      var birds_list = [
        {
          name: 'Javelin',
          listImg: 'images_small/bird1-200_small.jpg',
          displayImg: 'images/bird1.jpg',
          imgAttribution: 'https://www.flickr.com/photos/hyalella/38685545911/in/gallery-flickr-72157662070816797/'
        },
        .
        .
        .
      ]
      
##### 3- Update the DOM

Initialize the View with the Data of the first element in the array:

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


Adding the whole array of birds data to be displayed as a scrolling list:

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
      
With jQuery things get more difficulte to implements every time we add a new functionalty and the code looks like a very big mess, for this reason adopting some **organizational techniques** will make our application **stable, bug-free and cleanly written**, future changes will be much more easier to add in no time. 

Now with these organizational techniques we are separating things out, at this point we are talking about **separations of concerns**. So we are separating our code into three pieces: **Model, View, and * **:

1- The Model represents the Data.

2- The View represents the interface that the user interacts with.

3- The * represents the connector between the Model and the View, the goal is to organize things together by separating the Model and the view and never connect them directly.

## Version 2 -- vanillaJS

![Starting Screen](https://github.com/KawtharE/birdClicker/blob/master/assets/birdClickerVanillaJS.gif)

**VanillaJS** is not a library, nor a framework, it is a native JavaScript code with no additional extensions that adopt **separations of concerns**.

1- The Model:

	// The Model of our application
	var model = {
		currentBird: null,
		birdItems: []
	};

The model is a **literal object**. In this case, it contain two properties, the *currentBird* which represents the current bird displayed in the display section in the DOM and that will be updated every time the user click on one of the list items, and the *birdItems* which is right now an empty array that will be filled soon with a bunch of data.

2- The View:

we are separating the view here into two pieces of view, a view for the display section and another for the list of items. That was a choice just to make things more clear.

In each view we are defining tow functions, **inti** and **render**.

In the **init function** we are grabbing elements from the DOM that we will update and that we need to grab only once, also we are calling the render function.

In the **render function** we are implementing the functionalties that update the DOM and the Model by calling the functions defined in the connector.

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
 
 3- The * (in our case we are calling it connectorVM)
 
The connectorVM holds on all the functions that we need to achieve the features of the application, in this case: *seeting the current bird, getting the current bird, incrementing the click number, updating the title and getting all available data*. These function are called by views in order to not connect diractly to the Model and keep things separate. 

the **init function** call the views init functions to setup the app.

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
      
We could enter the data in the Model and not writing the function *getAllBirdItems*, but we choose too make the Model in its simplest version.

=> Now to kick of the app we call at the end the **init function of the connectorVM variable**

      connectorVM.init();
      
## Version 3 -- knockoutJS

![Starting Screen](https://github.com/KawtharE/birdClicker/blob/master/assets/birdClickerKnockoutJS.gif)

## Version 4 -- backboneJS
## Responsive Design
