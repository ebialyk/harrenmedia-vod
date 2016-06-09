var confirmOnExit = true;
var MAIL;
var PSW;
var CLICKID;
var AFFILIATE;
var CSS;
var LANG;
var COUNTRY;

window.onload = function() {
	// url format
	// ?aff=affiliateNumber&country=countryNumber&theme=themeCode&titleMovie=movieTitle&lang=language&clickId=clickid
	urlParams = parseURLParams(window.location.href);
	
	if(urlParams != null) {
		var title = " " + urlParams.titleMovie[0];
		AFF = urlParams.aff?urlParams.aff[0]:0;
		COUNTRY = urlParams.country?urlParams.country[0]:0;
		CSS = urlParams.theme?urlParams.theme[0]:"";
		LANG = urlParams.lang?urlParams.lang[0]:0;
		CLICKID = urlParams.clickId?urlParams.clickId[0]:"";
		
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
	
	var display = document.querySelector('#time'), timer = new CountDownTimer(
			480);
	timer.onTick(format).onTick(restart).start();

	function restart() {
		if (this.expired()) {
			setTimeout(function() {
				timer.start();
			}, 1000);
		}
	}

	function format(minutes, seconds) {
		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;
		display.textContent = minutes + ':' + seconds;
	}
};

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

	// not allow empty fields
	if (email.value === undefined || email.value == "") {
		email.className = "error";
		email.title = "Please enter an email";
	} else if (!validEmail(email.value)) { // validate entered email
		email.className = "error";
		email.title = "Please enter a valid email";
	} else { // no email errors
		email.className = "";
		email.title = "";
		okEmail = true;
	}
	if (psw.value === undefined || psw.value == "") {
		psw.className = "error";
		psw.title = "Please enter a password";
	} else if(!validPassword(psw)) {
		psw.className = "error";
		psw.title = "Please type a valid password";
	} else {
		psw.className = "";
		psw.title = "";
		okPsw = true;
	}
	if (psw2.value === undefined || psw2.value == "") {
		psw2.className = "error";
		psw2.title = "Please confirm your password";
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
	}

	if (okEmail && okPsw && okPsw2 && okPswEquals) {
		tracking(AFF, COUNTRY, 1, CSS, LANG, email.value, CLICKID);
		data = {
			email : email.value,
			pw : psw.value,
			pwConfirm : psw2.value,
			affiliate : AFF,
			country : COUNTRY
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
	}
}
function openVerificationPage() {
	document.getElementById("LandingPage").style.display = "none";
	document.getElementById("mask").style.display = "none";

	document.getElementById("VerificationPage").style.display = "flex";
	document.getElementById("body").className = "whiteBg";
	document.getElementById("html").className = "whiteBg";
	urlParams = parseURLParams(window.location.href);

	var affiliateCode = urlParams.aff[0];
	var countryCode = urlParams.country[0];
	var cssTheme = urlParams.theme[0];
	var language = urlParams.lang[0];
	
	
	tracking(AFF, COUNTRY, 3, CSS, LANG, MAIL, CLICKID);
}
function verifyAccount() {
	var uName = document.getElementById("FName").value +" "+ document.getElementById("LName").value;
	data = {
		email : MAIL,
		affiliate : AFF,
		country : COUNTRY,
		userName : uName
	};
	$.ajax({
		url : "rest/client/verifyAccount",
		type : "POST",
		dataType : "json", // expected format for response
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		data : data,
		success : function(response) {
			if (response.status == 15) {
				document.getElementById("VerificationPage").style.display = "none";
					document.getElementById("page3").style.display = "flex";
					document.getElementById("body").className = "";
					tracking(AFF, COUNTRY,4, CSS, LANG, MAIL, CLICKID);
					setTimeout(function() {
						data = {
								email : MAIL,
								pw : PSW
						}
						$.ajax({
							url : "rest/client/logIn",
							type : "POST",
							dataType : "json", // expected format for response
							contentType : "application/x-www-form-urlencoded; charset=UTF-8",
							data : data,
							success : function(response) {
								if (response.status == 51) {
										url = 'movies.html';
										localStorage.setItem('user', MAIL);
										window.open(url, '_self', false)
										confirmOnExit = false;
										tracking(AFF, COUNTRY,5, CSS, LANG, MAIL, CLICKID);
								} else {
									alert(response.message);
								}
							},
							error : function(response, status, error) {
								alert(response.message);
							}
						});
					}, 2000);
			} else {
				tracking(AFF, COUNTRY, 9, CSS, LANG, MAIL, CLICKID);
				alert(response.message);
			}
		},
		error : function(response, status, error) {
			alert(response.message);
		}
	});

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

function showCvv() {
	document.getElementById("cvv").style.display = "flex";
	document.getElementById("mask").style.display = "block";
}
function closeDialog() {
	document.getElementById("cvv").style.display = "none";
	document.getElementById("mask").style.display = "none";
}
// Validate the create Account data and open the Verification page




