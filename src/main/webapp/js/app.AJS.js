var app = angular.module('MyApp', []);
app.controller('moviesController',['$scope',function($scope) {
	$scope.languages = [{
		id : "EN",
		name : 'English',
		src : 'images/MF-allpages-ENflag.png'
	},{
		id : "ES",
		name : 'Spanish',
		src : 'images/MF-allpages-ESflag.png'
	}];
	
	$scope.selectedLanguage = {
			id : "EN",
			name : 'English',
			src : 'images/MF-allpages-ENflag.png'
	};

	$scope.movies = [{
		"Id":1,
		"Name":"Bad To The Jones",
		"Description":"This film is an action packed Urban Sci Fi. It is a unique niche and genre. The film has CGI and Special effects. The Zombie genre is also red hot. The original webisode version of this received millions of hits on youtube and has a built in audience. There will be a massive internet campaign with over 10 million impressions launched. The film was originally produced yet unreleased in 2011. It was recut with new added scenes in 2015. Synopsis: Bad To The Jones is a story about Craig and Tyrone Jones, two argumentative brothers on a quest to save their sister during a zombie apocalypse. Along the way they encounter some new and old friends that help them on their journey. Pitted against more zombies than they have ever seen and a new, stronger, more powerful breed, the Jones brothers will have fight for something bigger than they ever could have imagined. In doing so they will have to prove that they are not only bad to the bone, but Bad To The Jones.",
		"Cast":"Marlon Ladd, Chris Paul, Cara Black",
		"Director":"Marlon Ladd",
		"Writer":"Marlon Ladd",
		"Year":2015,
		"Genre":"Action, Sci-Fi, Horror",
		"URL":null,
		"Image": "images/Movies/Bad-To-The-Jones.jpg",
		"MoreImages": "",
	},{
		"Id":1,
		"Name":"Bad To The Jones",
		"Description":"This film is an action packed Urban Sci Fi. It is a unique niche and genre. The film has CGI and Special effects. The Zombie genre is also red hot. The original webisode version of this received millions of hits on youtube and has a built in audience. There will be a massive internet campaign with over 10 million impressions launched. The film was originally produced yet unreleased in 2011. It was recut with new added scenes in 2015. Synopsis: Bad To The Jones is a story about Craig and Tyrone Jones, two argumentative brothers on a quest to save their sister during a zombie apocalypse. Along the way they encounter some new and old friends that help them on their journey. Pitted against more zombies than they have ever seen and a new, stronger, more powerful breed, the Jones brothers will have fight for something bigger than they ever could have imagined. In doing so they will have to prove that they are not only bad to the bone, but Bad To The Jones.",
		"Cast":"Marlon Ladd, Chris Paul, Cara Black",
		"Director":"Marlon Ladd",
		"Writer":"Marlon Ladd",
		"Year":2015,
		"Genre":"Action, Sci-Fi, Horror",
		"URL":null,
		"Image": "images/Movies/Bad-To-The-Jones.jpg",
		"MoreImages": "",
	},{
		"Id":1,
		"Name":"Bad To The Jones",
		"Description":"This film is an action packed Urban Sci Fi. It is a unique niche and genre. The film has CGI and Special effects. The Zombie genre is also red hot. The original webisode version of this received millions of hits on youtube and has a built in audience. There will be a massive internet campaign with over 10 million impressions launched. The film was originally produced yet unreleased in 2011. It was recut with new added scenes in 2015. Synopsis: Bad To The Jones is a story about Craig and Tyrone Jones, two argumentative brothers on a quest to save their sister during a zombie apocalypse. Along the way they encounter some new and old friends that help them on their journey. Pitted against more zombies than they have ever seen and a new, stronger, more powerful breed, the Jones brothers will have fight for something bigger than they ever could have imagined. In doing so they will have to prove that they are not only bad to the bone, but Bad To The Jones.",
		"Cast":"Marlon Ladd, Chris Paul, Cara Black",
		"Director":"Marlon Ladd",
		"Writer":"Marlon Ladd",
		"Year":2015,
		"Genre":"Action, Sci-Fi, Horror",
		"URL":null,
		"Image": "images/Movies/Bad-To-The-Jones.jpg",
		"MoreImages": "",
	},{
		"Id":1,
		"Name":"Bad To The Jones",
		"Description":"This film is an action packed Urban Sci Fi. It is a unique niche and genre. The film has CGI and Special effects. The Zombie genre is also red hot. The original webisode version of this received millions of hits on youtube and has a built in audience. There will be a massive internet campaign with over 10 million impressions launched. The film was originally produced yet unreleased in 2011. It was recut with new added scenes in 2015. Synopsis: Bad To The Jones is a story about Craig and Tyrone Jones, two argumentative brothers on a quest to save their sister during a zombie apocalypse. Along the way they encounter some new and old friends that help them on their journey. Pitted against more zombies than they have ever seen and a new, stronger, more powerful breed, the Jones brothers will have fight for something bigger than they ever could have imagined. In doing so they will have to prove that they are not only bad to the bone, but Bad To The Jones.",
		"Cast":"Marlon Ladd, Chris Paul, Cara Black",
		"Director":"Marlon Ladd",
		"Writer":"Marlon Ladd",
		"Year":2015,
		"Genre":"Action, Sci-Fi, Horror",
		"URL":null,
		"Image": "images/Movies/Bad-To-The-Jones.jpg",
		"MoreImages": "",
	},{
		"Id":1,
		"Name":"Bad To The Jones",
		"Description":"This film is an action packed Urban Sci Fi. It is a unique niche and genre. The film has CGI and Special effects. The Zombie genre is also red hot. The original webisode version of this received millions of hits on youtube and has a built in audience. There will be a massive internet campaign with over 10 million impressions launched. The film was originally produced yet unreleased in 2011. It was recut with new added scenes in 2015. Synopsis: Bad To The Jones is a story about Craig and Tyrone Jones, two argumentative brothers on a quest to save their sister during a zombie apocalypse. Along the way they encounter some new and old friends that help them on their journey. Pitted against more zombies than they have ever seen and a new, stronger, more powerful breed, the Jones brothers will have fight for something bigger than they ever could have imagined. In doing so they will have to prove that they are not only bad to the bone, but Bad To The Jones.",
		"Cast":"Marlon Ladd, Chris Paul, Cara Black",
		"Director":"Marlon Ladd",
		"Writer":"Marlon Ladd",
		"Year":2015,
		"Genre":"Action, Sci-Fi, Horror",
		"URL":null,
		"Image": "images/Movies/Bad-To-The-Jones.jpg",
		"MoreImages": "",
	}];
}]);
	