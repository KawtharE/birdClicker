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
		{
			birdName: 'Tweety',
			birdListImg: 'images_small/bird2-200_small.jpg',
			birdDisplayImg: 'images/bird2.jpg',
			birdImgAttribution: 'https://www.flickr.com/photos/mg_rogers/33229234452/in/gallery-flickr-72157662070816797/',
			clicksNumber: 0,
			clicked: false,
			birdNicknames: ['Buzby', 'Jinn', 'Kwatoko', 'Belphegor', 'Xavea', 'Poppadom', 'Alcatraz', 'Heresa', 'Dilly', 'Brennus']

		},
		{
			birdName: 'Azuryz',
			birdListImg: 'images_small/bird3-200_small.jpg',
			birdDisplayImg: 'images/bird3.jpg',
			birdImgAttribution: 'https://www.flickr.com/photos/139235634@N04/34191401830/in/gallery-flickr-72157662070816797/',
			clicksNumber: 0,
			clicked: false,
			birdNicknames: ['Buzby', 'Jinn', 'Kwatoko', 'Belphegor', 'Xavea', 'Poppadom', 'Alcatraz', 'Heresa', 'Dilly', 'Brennus']

		},
		{
			birdName: 'Dante',
			birdListImg: 'images_small/bird4-200_small.jpg',
			birdDisplayImg: 'images/bird4.jpg',
			birdImgAttribution: 'https://www.flickr.com/photos/130233070@N04/37425778714/in/gallery-flickr-72157662070816797/',
			clicksNumber: 0,
			clicked: false,
			birdNicknames: ['Buzby', 'Jinn', 'Kwatoko', 'Belphegor', 'Xavea', 'Poppadom', 'Alcatraz', 'Heresa', 'Dilly', 'Brennus']

		},
		{
			birdName: 'Owlbundy',
			birdListImg: 'images_small/bird5-200_small.jpg',
			birdDisplayImg: 'images/bird5.jpg',
			birdImgAttribution: 'https://www.flickr.com/photos/frau-specht/37362864975/in/gallery-flickr-72157662070816797/',
			clicksNumber: 0,
			clicked: false,
			birdNicknames: ['Buzby', 'Jinn', 'Kwatoko', 'Belphegor', 'Xavea', 'Poppadom', 'Alcatraz', 'Heresa', 'Dilly', 'Brennus']

		},
		{
			birdName: 'Fanteriso',
			birdListImg: 'images_small/bird6-200_small.jpg',
			birdDisplayImg: 'images/bird6.jpg',
			birdImgAttribution: 'https://www.flickr.com/photos/8805844@N02/32588187075/in/gallery-flickr-72157662070816797/',
			clicksNumber: 0,
			clicked: false,
			birdNicknames: ['Buzby', 'Jinn', 'Kwatoko', 'Belphegor', 'Xavea', 'Poppadom', 'Alcatraz', 'Heresa', 'Dilly', 'Brennus']

		},
		{
			birdName: 'Mia',
			birdListImg: 'images_small/bird7-200_small.jpg',
			birdDisplayImg: 'images/bird7.jpg',
			birdImgAttribution: 'https://www.flickr.com/photos/12341100@N06/37152982943/in/gallery-flickr-72157662070816797/',
			clicksNumber: 0,
			clicked: false,
			birdNicknames: ['Buzby', 'Jinn', 'Kwatoko', 'Belphegor', 'Xavea', 'Poppadom', 'Alcatraz', 'Heresa', 'Dilly', 'Brennus']

		},
		{
			birdName: 'Lexiy',
			birdListImg: 'images_small/bird8-200_small.jpg',
			birdDisplayImg: 'images/bird8.jpg',
			birdImgAttribution: 'https://www.flickr.com/photos/99052565@N03/34435356125/in/gallery-flickr-72157662070816797/',
			clicksNumber: 0,
			clicked: false,
			birdNicknames: ['Buzby', 'Jinn', 'Kwatoko', 'Belphegor', 'Xavea', 'Poppadom', 'Alcatraz', 'Heresa', 'Dilly', 'Brennus']

		},
		{
			birdName: 'Archangel',
			birdListImg: 'images_small/bird9-200_small.jpg',
			birdDisplayImg: 'images/bird9.jpg',
			birdImgAttribution: 'https://www.flickr.com/photos/melvinschar/38599526902/in/gallery-flickr-72157662070816797/',
			clicksNumber: 0,
			clicked: false,
			birdNicknames: ['Buzby', 'Jinn', 'Kwatoko', 'Belphegor', 'Xavea', 'Poppadom', 'Alcatraz', 'Heresa', 'Dilly', 'Brennus']

		},
		{
			birdName: 'Pearl',
			birdListImg: 'images_small/bird10-200_small.jpg',
			birdDisplayImg: 'images/bird10.jpg',
			birdImgAttribution: 'https://www.flickr.com/photos/moggl/37635059085/in/gallery-flickr-72157662070816797/',
			clicksNumber: 0,
			clicked: false,
			birdNicknames: ['Buzby', 'Jinn', 'Kwatoko', 'Belphegor', 'Xavea', 'Poppadom', 'Alcatraz', 'Heresa', 'Dilly', 'Brennus']

		}
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
ko.applyBindings(new ViewModel());