# BirdClicker
Bird Clicker app: Inspired from the Cow Clicker app the social game on Facebook by **Ian Bogost**.

The application have a picture of a bird with the bird name, title and number of clicks, all displayed when clicking on one of the list item which is actually a small version of the same displayed image generated using **Grunt**, the number of clicks increment whenever we click on the displayed image.

The solution is responsive since I have adopted the **Flexbox** approach. 

**Version 1 with jQuery**

**Version 2 with vanillaJS**

**Version 3 with knockoutJS**

**Version 4 with backboneJS**

The difference between these four versions is the way we implements the functionalities of the app. In the first version, with jQuery, we are not using any kind of libraries just a pure jQuery functions. In the other versions, we are writing more professional, clean and stable code using **organizational techniques**.

## Version 1 -- jQuery

![Starting Screen](https://github.com/KawtharE/birdClicker/blob/master/assets/birdClickerJQuery.gif)

With **jQuery** we are grabbing DOM elements that we are going to update conditionally by adding dynamically some HTML code, in order to display the data that we have initially save it in an array (in this case our data are static so we keep it in an array).

All we need to install is jQuery itself:

      $ npm install jquery@3.3.1

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
      
With jQuery things get more complex every time we add a new functionalty and the code looks like a very big mess, for this reason adopting some **organizational techniques** will make our application **stable, bug-free and cleanly written**, and future changes will be much more easier and can be added in no time. 

Now with these organizational techniques we are separating things out, at this point we are talking about **separations of concerns**. So we are separating our code into three pieces: **Model, View, and * .**

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

The model is a **literal object**. In this case, it contain two properties, the *currentBird* which represents the current bird displayed in the display section of the DOM and that will be updated every time the user click on one of the list items, and the *birdItems* which is right now an empty array that will be filled soon with a bunch of data.

2- The View:

we are separating the view here into two pieces, a view for the display section and a view for the list of items. That was a choice just to make things more clear.

In each view we are defining tow functions, **init** and **render**.

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
 
The connectorVM holds on all the functions that we need to achieve the features of the application, in this case: *seeting the current bird, getting the current bird, incrementing the click number, updating the title and getting all available data*. These functions are called by views in order to not connect directly to the Model and keep things separate. 

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

Now to start the app, we call at the end the **init function of the connectorVM variable**

      connectorVM.init();

=> In this version we are implementing **separation of concerns** without using any **organizational library or framework**. In the next two versions we are using two organizational libraries to achieve the goal : **KnockoutJS and BackboneJS**.

## Version 3 -- knockoutJS

![Starting Screen](https://github.com/KawtharE/birdClicker/blob/master/assets/birdClickerKnockoutJS.gif)

**KnockoutJS** is an organizational library that adopt the **MVVM pattern**.

Now the five Fundamental elements in any organizational library or framework are:

1- Models: represents the data.

2- Collections: represents an array of Models.

3- * that could be C (Controller), P (Presenter), VM (ViewModel) or whatever depending on the pattern (MVC, MVP, MVVM, MV*), in all cases it represents the connector between the Model and the view. In the Knockout case it is **VM (ViewModel)**.

4- View: represents the interface that the user interact with.

5- Routers: represnts Views for URLs.

To get start with knockout of course we need to install it first:

	$ npm install knockout
	
Starting by defining our data (Model), as showing, each property is defined using **ko.observable**. Well **Observables** help us keep track of our data and whenever it change the view update immediatly, without need to any additional functions just **bind** the value to the DOM by adding **data-bind** attribute to the corresponding HTML element.

We have used **ko.computed** to create the *title variable* since the *title* depends on *clickNumber* observable and in order to change it automatically whenever the *clickNumber* change. We are passing in a function as first argument that will return what we are asking for (the title value), and a second parameter, the keyword **this** to make sure we can use it inside the function.


	var initialData = [
			{
				birdName: 'Javelin',
				birdListImg: 'images_small/bird1-200_small.jpg',
				birdDisplayImg: 'images/bird1.jpg',
				birdImgAttribution: 'https://www.flickr.com/photos/hyalella/38685545911/in/gallery-flickr-72157662070816797/',
				clicksNumber: 0,
				clicked: false,
				birdNicknames: ['Buzby', 'Jinn', 'Kwatoko', 'Belphegor', 'Xavea', 'Poppadom', 'Alcatraz', 'Heresa', 'Dilly', 'Brennus']

			},
			.
			.
			.
	]
	var Model = function(data){
		this.birdName = ko.observable('Bird Name: '+data.birdName);
		this.birdListImg = ko.observable(data.birdListImg);
		this.birdDisplayImg = ko.observable(data.birdDisplayImg);
		this.birdImgAttribution = ko.observable(data.birdImgAttribution);
		this.clicksNumber = ko.observable(data.clicksNumber);
		this.clicked = ko.observable(data.clicked);
		this.birdNicknames = ko.observableArray(data.birdNicknames);
		this.birdAttribution = ko.observable(data.birdImgAttribution);

		this.birdTitle = ko.computed(function(){
			this.bird_title = 'Bird Clicker Level 0';
			if (this.clicksNumber() < 10){
				this.bird_title = 'Bird Clicker Level 1';
			}
			else if ((this.clicksNumber() >= 10) && (this.clicksNumber() < 20)){
				this.bird_title = 'Bird Clicker Level 2';
			}
			else {
				this.bird_title = 'Bird Clicker Level 3';
			}
			return this.bird_title;
		}, this);

	}
	
Next, we are defining the **ViewModel** part in which we create the bird list as an **observable array** from the Model data, then we initialize the display section by displaying the first element of the array. Now since functions and forEach statement both create new context we have saved the **this** keyword, which represents the ViewModel context, inside a ne variable **self** in order to be able to use the variables available in the this context inside functions and forEach statement. 

	var ViewModel = function(){
		var self = this

		this.birdsItems = ko.observableArray([]);
		initialData.forEach(function(item){
			self.birdsItems.push(new Model(item));
		});
		this.birdsItems()[0].clicked(true);
		this.currentBird = ko.observable(this.birdsItems()[0]);
		this.setCurrentItem = function(){
			self.birdsItems().forEach(function(item){
				item.clicked(false);
			});
			this.clicked(true);
			self.currentBird(this);
		};
		this.updateClicksNumber = function(){
			self.currentBird().clicksNumber(self.currentBird().clicksNumber() + 1);
		}
	}
	
Finally for the View part, we are not defining it in the JS file because by using the attribute **bind-data** in the HTML code we are achieving what we need. [More information about data-bind](http://knockoutjs.com/documentation/binding-syntax.html)

			<div class="display-bird" data-bind="with: currentBird">
				<h2 class="bird-name" data-bind="text: birdName"></h2>
				<h3 class="bird-level" data-bind="text: birdTitle"></h3>
				<div class="clicks-number" data-bind="text: clicksNumber"></div>
				<img class="bird-image" src="" alt="a picture of a bird" data-bind="click: $parent.updateClicksNumber, attr: {src:birdDisplayImg}">
				<div><a id="bird-img-attr" href="" data-bind="attr:{href:birdAttribution}" target="_blank">Image Attribution</a></div>
				<div class="bird-nicknames">
					<h3>Bird's Nicknames:</h3>
					<ul class="nicknames" data-bind="foreach: birdNicknames">
						<li data-bind="text: $data"></li>
					</ul>
				</div>
			</div>
			<div class="list-birds">
				<ul class="birds" data-bind="foreach: birdsItems">
					<li><img class="list-img" src="" data-bind="attr: {src:birdListImg}, click: $parent.setCurrentItem, css: {active: clicked}"></li>
				</ul>
			</div>
			
Each HTML element with **data-bind** attribute bind the value of the indicated property of the bird observable object.

Now for the first div element that contain the **'with' binding**, the binding context is not the **ViewModel context**, it is the **currentBird context** since the **'with'** creates a new binding context, so if we need to access a variable or a function that it is defined in the ViewModel context we need to add to the data-bind value **$parent** like we have done to the *updateClicksNumber* function, since it have been defined in the ViewModel context and not the currentBird context.

=> **The binding context** holds data that you can reference directly from your bindings. [More information about 'with' binding](http://knockoutjs.com/documentation/with-binding.html)

Same for **forEach**, it creates a new binding context in the hierarchy of binding context. [More information about 'forEach' binding](http://knockoutjs.com/documentation/foreach-binding.html)

## Version 4 -- backboneJS
## Responsive Design

Developing responsive solutions is one of the most important step to the success of your application.

Now since the most used element in this application is images, we need to think about techniques to make our images responsive and most important we are displaying the same image in two different size, normal size in the display section and small size in the list scrollbar.

First of all, the HTML structure is represented in placing the display section and the list section inside a container:

		<div class="container">
			<div class="display-bird"></div>
			<div class="list-birds"></div>
		</div>
		
The rest is achieved in the CSS file, by affecting the *flex* value to the display property for the *container* element, *justify-content* help us distribute the items inside the conatiner. For the elements inside the container, we are making their width responsive using the property *flex* which is better than using *percentage width*, by giving value 3 to the display section and 1 to the list section we are indicating that whatever the width of the DOM is, the display section will be 3 times bigger than the list section.

		.container{
			display: flex;
			justify-content: flex-start;
		}
		.display-bird{
			flex: 3;
		}
		.list-birds{
			flex: 1;
		}
		
**Responsive Images:** To resize the images and generate the small images that we need it in the list, we have used **Grunt technique**.

	$ npm install -g grunt-cli
	$ npm install grunt-responsive-images --save
	$ npm install grunt-contrib-clean --save
	$ npm install grunt-contrib-copy --save
	$ npm install grunt-mkdir --save
	
We need *grunt-responsive-images, grunt-contrib-clean, grunt-contrib-copy and grunt-mkdir* to add tasks in **Gruntfile.js**:

-grunt-responsive-images: to generate new sized images.

-grunt-contrib-clean: to clean the directory where those new images places whenever we re-execute the grunt command.

-grunt-mkdir: to create the destination directory if it is not already there.

So inside the **Gruntfile.js** we add those tasks at the end of the file:

	  grunt.loadNpmTasks('grunt-responsive-images');
	  grunt.loadNpmTasks('grunt-contrib-clean');
	  grunt.loadNpmTasks('grunt-contrib-copy');
	  grunt.loadNpmTasks('grunt-mkdir');
	  grunt.registerTask('default', ['clean', 'mkdir', 'responsive_images']);
	 
We need to add the configuration part at the beginning, in which we indicate the new width of the images, the quality, the source, the destination etc:

	grunt.initConfig({
	 responsive_images: {
	      dev: {
	        options: {
	          engine: 'im',
	          sizes: [{
	            width: 200,
	            suffix: '_small',
	            quality: 100
	          }]
	        },
	        files: [{
	          expand: true,
	          src: ['*.{gif,jpg,png}'],
	          cwd: 'images/',
	          dest: 'images_small/'
	        }]
	      }
	    },

	    /* Clear out the images_small directory if it exists */
	    clean: {
	      dev: {
	        src: ['images_small'],
	      },
	    },

	    /* Generate the images_small directory if it is missing */
	    mkdir: {
	      dev: {
	        options: {
	          create: ['images_small']
	        },
	      },
	    },
	});

Next, to finally get the new images we need to tap this command:

	$ grunt
	
Now that we have the small images for the list section, back to the CSS file, and make sure that both the small images and the normal images are responsive. We can achieve that by just adding the following CSS rule:

	max-width: 100%;
	
This is not optimal in all cases, actually adopting break points and media queries is much more optimal but in this application this solution works fine.
