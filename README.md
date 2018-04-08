# BirdClicker
Bird Clicker app: Inspired from the Cow Clicker app the social game on Facebook by **Ian Bogost**.

The application have a picture of a bird with the bird name, title and number of clicks, all displayed when clicking on one of the list item which is actually a small version of the same displayed image generated using **Gulp**, the number of clicks increment whenever we click on the displayed image.

The solution is responsive since I have adopted the **Flexbox** approach. 

**Version 1 with jQuery**

**Version 2 with vanillaJS**

**Version 3 with knockoutJS**

**Version 3 with backboneJS**

The difference between these four versions is the way we implements the functionalities of the app. In the first version, with jQuery we are not using any kind of libraries just a pure jQuery functions. In the other versions, we are writing more professional, clean and stable code using organizational techniques.

## Version 1 -- jQuery

![Starting Screen](https://github.com/KawtharE/birdClicker/blob/master/assets/birdClickerJQuery.gif)

With **jQuery** we are grabbing DOM elements that we are going to update conditionally by adding dynamically some HTML code, in order to display the data that we have initially save it in an array (in this case our data are static so we keep it in an array).

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
      
With jQuery things get more difficulte to implements every time we add a new functionalty and the code looks like a very big mess, for this reason adopting some oraganizational techniques will make our application **stable, bug-free and cleanly written**, future changes will be much more easier to add. 

## Version 2 -- vanillaJS

![Starting Screen](https://github.com/KawtharE/birdClicker/blob/master/assets/birdClickerVanillaJS.gif)

 
## Version 3 -- knockoutJS

![Starting Screen](https://github.com/KawtharE/birdClicker/blob/master/assets/birdClickerKnockoutJS.gif)

## Version 4 --b ackboneJS
## Responsive Design
