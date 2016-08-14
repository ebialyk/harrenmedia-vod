var images = new Array()  
function preload() {
    for (i = 0; i < preload.arguments.length; i++) {
          images[i] = new Image()
          images[i].src = preload.arguments[i]
      }
  } 
preload(
		  'http://s3-eu-west-1.amazonaws.com/vodresources/images/LandingPage/frame.png',
		  'http://s3-eu-west-1.amazonaws.com/vodresources/images/MF-allpages-TOPLOGO.png', 
		  'http://s3-eu-west-1.amazonaws.com/vodresources/images/LandingPage/spin.svg"',
		  'http://s3-eu-west-1.amazonaws.com/vodresources/images/LandingPage/player_V2-greenBG.jpg',
		  'http://s3-eu-west-1.amazonaws.com/vodresources/images/LandingPage/loading.svg',
		  'http://s3-eu-west-1.amazonaws.com/vodresources/images/LandingPage/MF-L1_Vplayer-HDbut.png',
		  'http://s3-eu-west-1.amazonaws.com/vodresources/images/LandingPage/MF-L1_Vplayer-playbut.png',
		  'http://s3-eu-west-1.amazonaws.com/vodresources/images/LandingPage/MF-L1_Vplayer-indicators.png',
		  'http://s3-eu-west-1.amazonaws.com/vodresources/images/LandingPage/flags.png'
);