var confirmOnExit = true;
var MAIL;
var PSW;
var CLICKID;
var AFF;
var CSS;
var LANG;
var COUNTRY;
var COUNTRYCODE;
$('html').css('display', 'none');
resizeScreen();
$.ajax({
	url : "rest/client/checkByIp",
	type : "GET",
	dataType : "json", // expected format for response
	contentType : "application/x-www-form-urlencoded; charset=UTF-8",
	success : function(response) {
		if (response != undefined && response.countryId != null) {
			urlParams = parseURLParams(window.location.href);

			if (urlParams != null) {
				AFF = urlParams.aff ? urlParams.aff[0] : 0;
				COUNTRY = urlParams.countryCode ? urlParams.countryCode[0] : 0;
				CSS = urlParams.theme ? urlParams.theme[0] : "";
				LANG = urlParams.lang ? urlParams.lang[0] : 0;
				CLICKID = urlParams.clickid ? urlParams.clickid[0] : "";
				MAIL = urlParams.user ? urlParams.user[0] : "";
			}

			if (CSS != null && CSS == '0320') { // TV STYLE
				document.getElementById('LHMovieCSS').disabled = true;
				document.getElementById('LHMobileCSS').disabled = true;
				document.getElementById('LHSportCSS').disabled = true;
				document.getElementById('LHSportMobileCSS').disabled = true;
				document.getElementById('LHBrazilCSS').disabled = true;
				document.getElementById('LHBrazilMobileCSS').disabled = true;

				document.getElementById('LHTVCSS').disabled = false;
				document.getElementById('LHTVMobileCSS').disabled = false;
				document.getElementById('numLoaderCSS').disabled = false;

				document.getElementById("link1").innerHTML = 'besttvnow.com';
				document.getElementById("link2").innerHTML = 'moviesme.com';
				document.getElementById("link3").innerHTML = 'goodmoviesonline.com';
				document.getElementById("link4").innerHTML = 'gozlan.cc';
				document.getElementById("link5").innerHTML = 'movies.tv';
				
				$('.radial-progress').attr('data-progress', 0);
				document.getElementById('radial-progress').display = "block";
				setTimeout(function() {
					window.randomize = function() {
						$('.radial-progress').attr('data-progress', 100);
					}
					window.randomize();
				}, 800);

			} else if (CSS != null && CSS == '0420') { // SPORT STYLE
				document.getElementById('LHMovieCSS').disabled = true;
				document.getElementById('LHMobileCSS').disabled = true;
				document.getElementById('LHTVCSS').disabled = true;
				document.getElementById('LHTVMobileCSS').disabled = true;
				document.getElementById('numLoaderCSS').disabled = true;
				document.getElementById('LHBrazilCSS').disabled = true;
				document.getElementById('LHBrazilMobileCSS').disabled = true;


				document.getElementById('LHSportCSS').disabled = false;
				document.getElementById('LHSportMobileCSS').disabled = false;

				document.getElementById("link1").innerHTML = 'sat1';
				document.getElementById("link2").innerHTML = 'sat2';
				document.getElementById("link3").innerHTML = 'sat3';
				document.getElementById("link4").innerHTML = 'sat4';
				document.getElementById("link5").innerHTML = 'sat5';
				
				runLoader();

			}  else if (CSS != null && CSS == '0520') { // SPORT STYLE
				document.getElementById('LHMovieCSS').disabled = true;
				document.getElementById('LHMobileCSS').disabled = true;
				document.getElementById('LHTVCSS').disabled = true;
				document.getElementById('LHTVMobileCSS').disabled = true;
				document.getElementById('numLoaderCSS').disabled = true;
				document.getElementById('LHSportCSS').disabled = false;
				document.getElementById('LHSportMobileCSS').disabled = false;
				
				document.getElementById('LHBrazilCSS').disabled = false;
				document.getElementById('LHBrazilMobileCSS').disabled = false;

				document.getElementById("link1").innerHTML = 'sat1';
				document.getElementById("link2").innerHTML = 'sat2';
				document.getElementById("link3").innerHTML = 'sat3';
				document.getElementById("link4").innerHTML = 'sat4';
				document.getElementById("link5").innerHTML = 'sat5';
				
				runLoader();

			} else {
				document.getElementById('LHMovieCSS').disabled = false;
				document.getElementById('LHMobileCSS').disabled = false;
				document.getElementById('LHSportCSS').disabled = true;
				document.getElementById('LHSportMobileCSS').disabled = true;
				document.getElementById('LHBrazilCSS').disabled = true;
				document.getElementById('LHBrazilMobileCSS').disabled = true;

				document.getElementById('LHTVCSS').disabled = true;
				document.getElementById('LHTVMobileCSS').disabled = true;
				document.getElementById('numLoaderCSS').disabled = true;

				document.getElementById('radial-progress').display = "none";
			}

			$('html').css('display', 'block');
			COUNTRYCODE = response.countryId;
			COUNTRY = COUNTRYCODE;
			
			// tracking(affiliate, step, css, languageId, email, clickId
			tracking(AFF, 0, CSS, LANG, 0, CLICKID);
			resizeScreen();
		} else {
			confirmOnExit = false;
			window.open("https://www.google.co.il/", '_self', false);
		}
	},
	error : function(response, status, error) {
		confirmOnExit = false;
		window.open("https://www.google.co.il/", '_self', false);
	}
});

window.onload = function() {
	resizeScreen();
	urlParams = parseURLParams(window.location.href);
	var disableExternal = (location.hostname == "localhost");

	if (urlParams != null) {
		if (urlParams.aff && urlParams.country
				&& urlParams.theme && urlParams.lang && urlParams.clickid) {
			var title = "";
			AFF = urlParams.aff ? urlParams.aff[0] : 0;
			CSS = urlParams.theme ? urlParams.theme[0] : "";
			LANG = urlParams.lang ? urlParams.lang[0] : 0;
			CLICKID = urlParams.clickid ? urlParams.clickid[0] : "";

			document.getElementById("movieTitle").innerHTML += title;

			setTimeout(function() {
				document.getElementById("screen").style.display = "block";
				document.getElementById("loading").style.position = "absolute";
			}, 1500);

			setTimeout(function() {
				openCreateAccountDialog();
			}, 5000);

			
		} else {
			confirmOnExit = false;
			if (location.hostname == "localhost") {
				url = '/starter/';
			} else {
				url = '../';
			}
			window.open(url, '_self', false)
		}
	} else {
		confirmOnExit = false;
		if (location.hostname == "localhost") {
			url = '/starter/';
		} else {
			url = '../';
		}
		window.open(url, '_self', false)
	}
}

$(window).on('resize', function() {
	resizeScreen();
});

function resizeScreen() {
	if ($('html').width() < 920) {
		$('.ratio16-9').height($('.ratio16-9').width() * 9 / 16);
	} else {
		$('.ratio16-9').height('auto');
	}
}
function openCreateAccountDialog() {
	/*
	 * document.getElementById("circularG").style.display = "none";
	 * document.getElementById("loadSpan").style.display = "none";
	 * document.getElementById("contentBar").style.display = "none";
	 * document.getElementById("loading").style.display = "none";
	 */

	if (Modernizr.flexbox && Modernizr.flexboxtweener
			&& Modernizr.flexboxlegacy) {
		document.getElementById("CreateAccount").style.display = "flex";
	} else {
		document.getElementById("CreateAccount").style.display = "block";
	}
	document.getElementById("CreateAccount").style.opacity = "1";
	document.getElementById("mask").style.display = "block";

	document.getElementById("email").focus();
}
function CreateAccountValidation() {

	document.getElementById("loadingMask").style.display = "block";
	var email = document.getElementById("email");
	var psw = document.getElementById("psw");
	var psw2 = document.getElementById("psw2");

	var okEmail = false;
	var okPsw = false;
	var okPsw2 = false;
	var okPswEquals = false;

	var alertTXT = "";

	// not allow empty fields
	if (email.value === undefined || email.value == "") {
		email.className = "error";
		email.title = "Please enter an email";
		alertTXT = "\nPlease enter an email"
	} else if (!validEmail(email.value)) { // validate entered email
		email.className = "error";
		email.title = "Please enter a valid email";
		alertTXT += "\nPlease enter a valid email";
	} else { // no email errors
		email.className = "";
		email.title = "";
		okEmail = true;
	}
	if (psw.value === undefined || psw.value == "") {
		psw.className = "error";
		psw.title = "Please enter a password";
		alertTXT += "\nPlease enter a password";
	} else if (!validPassword(psw)) {
		psw.className = "error";
		psw.title = "Please type a valid password";
		alertTXT += "\nPlease type a valid password";
	} else {
		psw.className = "";
		psw.title = "";
		okPsw = true;
	}
	if (psw2.value === undefined || psw2.value == "") {
		psw2.className = "error";
		psw2.title = "Please confirm your password";
		alertTXT += "\nPlease confirm your password";
	} else {
		psw2.className = "";
		psw2.title = "";
		okPsw2 = true;
	}

	if (psw.value === psw2.value) { // validate password and confirm password
		// are equals
		okPswEquals = true;
	} else {
		psw.className = "error";
		psw2.className = "error";
		psw.title = "password and confirm password are not the same, please type again";
		psw2.title = "password and confirm password are not the same, please type again";
		alertTXT += "\npassword and confirm password are not the same, please type again";
	}

	if (okEmail && okPsw && okPsw2 && okPswEquals) {

		tracking(AFF,  1, CSS, LANG, email.value, CLICKID);
		data = {
			email : email.value,
			pw : psw.value,
			pwConfirm : psw2.value,
			affiliate : AFF,
			country : COUNTRY,
			clickID : CLICKID
		};
		$
				.ajax(
						{
							url : "rest/client/register",
							type : "POST",
							dataType : "json", // expected format for response
							contentType : "application/x-www-form-urlencoded; charset=UTF-8",
							data : data,
							success : function(response) {
								if (response.status == 15) {

									MAIL = email.value;
									PSW = psw.value;
									localStorage.setItem('MAIL', MAIL);
									localStorage.setItem('CLICKID', CLICKID);
									localStorage.setItem('PSW', PSW);

									openVerificationPage();
									tracking(AFF, 2, CSS, LANG, MAIL,
											CLICKID);
								} else {
									alert(response.message);
									document.getElementById("loadingMask").style.display = "none";

									if (response.status == 61
											|| response.status == 62) {
										email.value = "";
										email.readOnly = true;
									} else {
										tracking(AFF, 8, CSS, LANG,
												email.value, CLICKID);
									}
								}
							},
							error : function(response, status, error) {
								alert(response.message);
								document.getElementById("loadingMask").style.display = "none";

							}
						})
	} else {
		alert(alertTXT);
		document.getElementById("loadingMask").style.display = "none";
	}
}
function openVerificationPage() {
	if (location.hostname == "localhost") {
		url = '/starter/verification.html' + window.location.search + '&user=' 
				+ MAIL + '&countryCode=' + COUNTRYCODE ;
	} else {
		url = 'https://ver.muvflix.com/verification.html'
				+ window.location.search + '&user=' + MAIL + '&countryCode=' + COUNTRYCODE;
	}

	confirmOnExit = false;
	window.open(url, '_self', false)

	tracking(AFF, 3, CSS, LANG, MAIL, CLICKID);
}

// prevent to leave the page before ends the inscription
$(function() {
	$(window).on('beforeunload', function() {
		if (confirmOnExit)
			return "Are you sure you want to leave the page?";
	});

});

function checkEnter(e,obj) {
	if (e.which == 13 || e.keyCode == 13) {
		if(obj.id == "email") {
			document.getElementById("psw").focus();
		} else if (obj.id == "psw") {
			document.getElementById("psw2").focus();
		} else {
			CreateAccountValidation();
		}
	}
}

function runLoader() {
	var width = 0;
	var id = setInterval(frame, 150);
	function frame() {
		if (width >= 100) {
			clearInterval(id);
		} else {
			width++;
			document.getElementById("loaderPercentage").innerHTML = 'loading ' + width * 1
					+ '%';
		}
	}
}
var images = new Array()  
function preload() {
    for (i = 0; i < preload.arguments.length; i++) {
          images[i] = new Image()
          images[i].src = preload.arguments[i]
      }
  } 
  preload(
		  'http://s3-us-west-2.amazonaws.com/vod.resources/images/LandingPage/frame.png',
		  'http://s3-us-west-2.amazonaws.com/vod.resources/images/MF-allpages-TOPLOGO.png', 
		  'http://s3-us-west-2.amazonaws.com/vod.resources/images/LandingPage/spin.svg',
		  'http://s3-us-west-2.amazonaws.com/vod.resources/images/LandingPage/player_V2-greenBG.jpg',
		  'http://s3-us-west-2.amazonaws.com/vod.resources/images/LandingPage/loading.svg',
		  'http://s3-us-west-2.amazonaws.com/vod.resources/images/LandingPage/MF-L1_Vplayer-HDbut.png',
		  'http://s3-us-west-2.amazonaws.com/vod.resources/images/LandingPage/MF-L1_Vplayer-playbut.png',
		  'http://s3-us-west-2.amazonaws.com/vod.resources/images/LandingPage/MF-L1_Vplayer-indicators.png',
		  'http://s3-us-west-2.amazonaws.com/vod.resources/images/LandingPage/flags.png'
		  
		  
);
