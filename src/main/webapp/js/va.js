var confirmOnExit = true;
var MAIL;
var CLICKID;
var AFF;
var CSS;
var LANG;
var COUNTRY;
var PSW;
 
window.onload = function() {

var disableExternal = (location.hostname == "localhost");
	
	document.getElementById('amazonCSS').disabled  = disableExternal;
	document.getElementById('amazonMobileCSS').disabled  = disableExternal;
	document.getElementById('LHCSS').disabled  = !disableExternal;
	document.getElementById('LHMobileCSS').disabled  = !disableExternal;
	
	MAIL = localStorage.getItem('MAIL');
	PSW = localStorage.getItem('PSW');
	document.getElementById("VerificationPage").style.display = "flex";
	var url;
	
	
	if (MAIL != null && MAIL != undefined) {
		
		if(location.hostname == "localhost") 
			url='/starter/verification.html';
		else
			url='../verification.html';
		setTimeout(function() {
			history.pushState({}, null,url);
		}, 100);

	} else {
		if(location.hostname == "localhost") 
			url='/starter/index.html';
		else
			url='../index.html';
		window.open(url, '_self', false)
	}
	urlParams = parseURLParams(window.location.href);
	
	if(urlParams != null) {
		AFF = urlParams.aff?urlParams.aff[0]:0;
		COUNTRY = urlParams.country?urlParams.country[0]:0;
		CSS = urlParams.theme?urlParams.theme[0]:"";
		LANG = urlParams.lang?urlParams.lang[0]:0;
		CLICKID = urlParams.clickid?urlParams.clickid[0]:"";

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
					data = {
							affiliate: AFF,
							clickID: CLICKID
					}
					//check for sending postback
					$.ajax({
						url: "rest/client/postback",
						type : "POST",
						dataType : "json", // expected format for response
						contentType : "application/x-www-form-urlencoded; charset=UTF-8",
						data : data,
						success : function(response) {
							if(response.url != "") {
								ID = response.id;
								$.ajax({
									url : response.url,
									type : response.type,
									success : function(response) {
										setTimeout(function() {
											data = {
												email : MAIL,
												pw : PSW
											}
											login(data);
										}, 2000);
									},
									error : function(response, status, error) {
										setTimeout(function() {
											data = {
												email : MAIL,
												pw : PSW
											}
											login(data);
										}, 2000);	
									}
								});
							} else {
								setTimeout(function() {
									data = {
										email : MAIL,
										pw : PSW
									}
									login(data);
								}, 2000);
							}
						},
					error : function(response, status, error) {
						alert(response.message);
					}
				});
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
function login(data) {
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
					
					window.open(url, '_self', false);
					history.pushState({}, null,'index.html');
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




