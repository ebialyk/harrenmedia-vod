var confirmOnExit = true;
var MAIL;
var PSW;
var CLICKID;
var AFF;
var CSS;
var LANG;
var COUNTRY;

window.onload = function() {
	// url format
	// ?aff=affiliateNumber&country=countryNumber&theme=themeCode&titleMovie=movieTitle&lang=language&clickid=clickid
	//?aff=4001&country=20&theme=0220&titleMovie=THE%20SECRET%20OF%20YOUR%20&lang=0&clickid=ZjI2MTg1NzNjYzQ3NGYxN2EwYjIwMjI5ODAxOGI1NTcsLCwxMzg5NDgsSUwsNTUsLA=="
	urlParams = parseURLParams(window.location.href);
	
	resizeScreen();
	
	if(urlParams != null) {
		var title = " " + urlParams.titleMovie[0];
		AFF = urlParams.aff?urlParams.aff[0]:0;
		COUNTRY = urlParams.country?urlParams.country[0]:0;
		CSS = urlParams.theme?urlParams.theme[0]:"";
		LANG = urlParams.lang?urlParams.lang[0]:0;
		CLICKID = urlParams.clickid?urlParams.clickid[0]:"";
		
		document.getElementById("movieTitle").innerHTML += title;
		
		setTimeout(function() {
			document.getElementById("screen").style.display = "block";
			document.getElementById("loading").style.position = "absolute";
		}, 1500);

		setTimeout(function() {
			openCreateAccountDialog();
		}, 7000);

		//tracking(affiliate,country, step, css, languageId, email, clickId
		tracking(AFF, COUNTRY, 0, CSS, LANG, 0, CLICKID);

	}
	
}

$(window).on('resize', function(){
	resizeScreen();
});

function resizeScreen() {
	if($('html').width() < 736)
	 $('.ratio16-9').height($('.ratio16-9').width()* 9 / 16);
}
function openCreateAccountDialog() {
	document.getElementById("CreateAccount").style.display = "flex";
	document.getElementById("mask").style.display = "block";
	document.getElementById("circularG").style.display = "none";
	document.getElementById("loadSpan").style.display = "none";
	document.getElementById("contentBar").style.display = "none";
	document.getElementById("loading").style.display = "none";

	document.getElementById("w8").style.display = "none";
	
	document.getElementById("email").focus();
}
function CreateAccountValidation() {
	
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
	} else if(!validPassword(psw)) {
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

	if (psw.value === psw2.value) { // validate password and confirm password are equals
		okPswEquals = true;
	} else {
		psw.className = "error";
		psw2.className = "error";
		psw.title = "password and confirm password are not the same, please type again";
		psw2.title = "password and confirm password are not the same, please type again";
		alertTXT += "\npassword and confirm password are not the same, please type again";
	}

	if (okEmail && okPsw && okPsw2 && okPswEquals) {
		tracking(AFF, COUNTRY, 1, CSS, LANG, email.value, CLICKID);
		data = {
			email : email.value,
			pw : psw.value,
			pwConfirm : psw2.value,
			affiliate : AFF,
			country : COUNTRY,
			clickID : CLICKID
		};
		$.ajax({
			url : "rest/client/register",
			type : "POST",
			dataType : "json", // expected format for response
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			data : data,
			success : function(response) {
				if (response.status == 15) {
					openVerificationPage();
					MAIL = email.value;
					PSW = psw.value;
					localStorage.setItem('MAIL', MAIL);
					localStorage.setItem('CLICKID', CLICKID);
					localStorage.setItem('PSW', PSW);
					tracking(AFF, COUNTRY, 2, CSS, LANG, MAIL, CLICKID);
				} else {
					tracking(AFF, COUNTRY, 8, CSS, LANG, email.value, CLICKID);
					alert(response.message);
				}
			},
			error : function(response, status, error) {
				alert(response.message);
			}
		});
	} else {
		alert(alertTXT);
	}
}
function openVerificationPage() {
	//document.getElementById("LandingPage").style.display = "none";
	//document.getElementById("mask").style.display = "none";

	
	//document.getElementById("body").className = "whiteBg";
	//document.getElementById("html").className = "whiteBg";
	url = 'verification.html'+window.location.search;
	confirmOnExit = false;
	window.open(url, '_self', false)

	
	
	tracking(AFF, COUNTRY, 3, CSS, LANG, MAIL, CLICKID);
}

// prevent to leave the page before ends the inscription
$(function() {
	$(window).on('beforeunload', function() {
		if (confirmOnExit)
		return "Are you sure you want to leave the page?";
	});

	$(window).on('unload', function() {
		if (confirmOnExit)
			logOut(MAIL);
	});
});

function checkEnter(e) {
	if (e.which == 13 || e.keyCode == 13) {
		CreateAccountValidation();
    }
}



