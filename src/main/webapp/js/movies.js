var MAIL;
var PSW;

function openGenres() {
	hideAll();
	document.getElementById("genres").style.display = "flex";
	document.getElementById("moreMovies").style.display = "block";
}
function openBestsellers() {
	hideAll();
	document.getElementById("slider").style.display = "block";
	document.getElementById("littleSlider").style.display = "block";
	document.getElementById("hrGray").style.display = "block";
	document.getElementById("moreMovies").style.display = "block";
}
function openMovies() {
	hideAll();
	document.getElementById("moreMovies").style.display = "block";
}
function openMovie(url) {
	var myVideo = document.getElementsByTagName('video')[0];
	myVideo.src = url;
	myVideo.load();
	myVideo.style.width = "100%";
	myVideo.style.paddingTop = "20px";
	document.getElementById("mask").style.display = "flex";
	document.getElementById("movieWrapper").style.display = "flex";
}
function openSupport() {
	hideAll();
	clearForm();
	document.getElementById("supportPage").style.display = "block";
	document.getElementById("cancelAccount").style.display = "block";
}
function cancelAccount() {
	var email = document.getElementById("Mail").value = "";
	var psw = document.getElementById("Password").value = "";
	document.getElementById("warningScreen").style.display = "flex";
	document.getElementById("mask").style.display = "flex";
	tracking(0, 0, 5, 0, 0, email);
}
function clearForm() {
	document.getElementById("supportName").value = "";
	document.getElementById("supportEmail").value = "";
	document.getElementById("cardDigits").value = "";
	document.getElementById("supportContent").value = "";
	document.getElementById("subjectSupport").value = "";
	document.getElementById("subjectSupport2").value = "";

	document.getElementById("supportName").className = "";
	document.getElementById("supportEmail").className = "";
	document.getElementById("cardDigits").className = "";
	document.getElementById("supportContent").className = "";
	document.getElementById("subjectSupport").className = "";
	document.getElementById("subjectSupport2").className = "";

	document.getElementById("supportName").title = "";
	document.getElementById("supportEmail").title = "";
	document.getElementById("cardDigits").title = "";
	document.getElementById("supportContent").title = "";
	document.getElementById("subjectSupport").title = "";
	document.getElementById("subjectSupport2").title = "";
}
function accountVerification() {
	var email = document.getElementById("Mail");
	var psw = document.getElementById("Password");

	var okMail = false;
	var okPsw = false;

	if (email.value === undefined || email.value == "") {// no empty email
		email.className = "error";
		email.title = "Please type your email";
	} else if (!validEmail(email.value)) { // validate entered email
		email.className = "error";
		email.title = "Please enter a valid email";
	} else {
		email.className = "";
		email.title = "";
		okMail = true;
	}
	if (psw.value === undefined || psw.value == "") {// no empty message
		psw.className = "error";
		psw.title = "Please type your password";
	} else if(!validPassword(psw)) {
		psw.className = "error";
		psw.title = "Please type a valid password";
	} else {
		psw.className = "";
		psw.title = "";
		okPsw = true;
	}

	if (okMail && okPsw) {
		var data = {
			email : email.value,
			psw : psw.value
		};

		$
				.ajax({
					url : "rest/client/accountVerification",
					type : "POST",
					dataType : "json", // expected format for response
					contentType : "application/x-www-form-urlencoded; charset=UTF-8",
					data : data,
					success : function(response) {
						if (response.status === 50) {
							MAIL = email;
							PSW = psw;
							closeDialog()
							document.getElementById("CancelFields").style.display = "table-row";
							document.getElementById("subjectFields").style.display = "none";
							document.getElementById("contactUs").style.display = "none";
							document.getElementById("cancelText").style.display = "flex";
							document.getElementById("supportContent").placeholder = "Please cancel my account.";
							document.getElementById("subjectSupport2").style.display = "block";
							document.getElementById("subjectSupport2").value = 0;
							tracking(0, 0, 6, 0, 0, email);
						} else {
							alert(response.message);
						}
					},
					error : function(response, status, error) {
						alert(response.message);
					}
				});
	} else {
		alert(email.title + " " + psw.title);
	}
}
function sendSupportRequest() {
	var name = document.getElementById("supportName");
	var email = document.getElementById("supportEmail");
	var cardDigits = document.getElementById("cardDigits");
	var message = document.getElementById("supportContent");
	var subjectSupport = document.getElementById("subjectSupport");
	var subjectSupport2 = document.getElementById("subjectSupport2");

	var cancelRequest = (document.getElementById("subjectSupport2").style.display != "none");

	var okName = false;
	var okMail = false;
	var okCardD = false;
	var okMsg = false;
	var okSubj1 = false;
	var okSubj2 = false;

	if (name.value === undefined || name.value == "") {// no empty name
		name.className = "error";
		name.title = "Please type your name";
	} else {
		name.className = "";
		name.title = "";
		okName = true;
	}
	if (message.value === undefined || message.value == "") {// no empty
		// message
		message.className = "error";
		message.title = "Please type your name";
	} else {
		message.className = "";
		message.title = "";
		okMsg = true;
	}
	if (email.value === undefined || email.value == "") {// no empty email
		email.className = "error";
		email.title = "Please type your email";
	} else if (!validEmail(email.value)) { // validate entered email
		email.className = "error";
		email.title = "Please enter a valid email";
	} else {
		email.className = "";
		email.title = "";
		okMail = true;
	}

	if ((cardDigits.value === undefined || cardDigits.value == "")
			&& cancelRequest) { // validate card digits
		cardDigits.className = "error";
		cardDigits.title = "Please type the last 4 digits of your credit card";
	} else {
		cardDigits.className = "";
		cardDigits.title = "";
		okCardD = true;
	}

	if (cancelRequest) {
		if (subjectSupport2.value == "") {
			subjectSupport2.className = "error";
			subjectSupport2.title = "Please select a subject";
		} else {
			subjectSupport2.className = "";
			subjectSupport2.title = "";
			msgCode = subjectSupport2.value;
			okSubj2 = true;
		}
	} else {
		if (subjectSupport.value == "") {
			subjectSupport.className = "error";
			subjectSupport.title = "Please select a subject";
		} else {
			subjectSupport.className = "";
			subjectSupport.title = "";
			msgCode = subjectSupport.value;
			okSubj1 = true;
		}
	}

	if (okName && okMail && okCardD && okMsg
			&& ((okSubj1 && !cancelRequest) || (okSubj2 && cancelRequest))) {
		var data = {
			name : name.value,
			email : email.value,
			cDigits : cardDigits.value,
			msgCode : msgCode,
			msg : message.value
		};

		$.ajax({
			url : "rest/client/support",
			type : "POST",
			dataType : "json", // expected format for response
			async : false,
			data : data,
			success : function(response) {
				if (response.status === 40) {
					alert(response.message);
					openBestsellers();
					if(msgCode == 0) {
						tracking(0, 0, 7, 0, 0, email);
					}
				} else {
					alert(response.message);
				}
			},
			error : function(response, status, error) {
				alert(response.message);
			}
		});
	}
}
function hideAll() {
	document.getElementById("slider").style.display = "none";
	document.getElementById("littleSlider").style.display = "none";
	document.getElementById("hrGray").style.display = "none";
	document.getElementById("moviePreview").style.display = "none";
	document.getElementById("genres").style.display = "none";
	document.getElementById("bringMore").style.display = "none";
	document.getElementById("supportPage").style.display = "none";
	document.getElementById("mask").style.display = "none";
	document.getElementById("warningScreen").style.display = "none";
	document.getElementById("moreMovies").style.display = "none";
	document.getElementById("subjectSupport2").style.display = "none";

}
function closeDialog() {
	document.getElementById("warningScreen").style.display = "none";
	document.getElementById("loginScreen").style.display = "none";
	document.getElementById("tooltip").style.display = "none";

	document.getElementById("movieWrapper").style.display = "none";
	var myVideo = document.getElementsByTagName('video')[0];
	myVideo.src = "";
	document.getElementById("mask").style.display = "none";

}
window.onload = function() {
	MAIL = localStorage.getItem('user');
	if (MAIL != null && MAIL != undefined) {
		checkLoggedInUser(MAIL);

		setTimeout(function() {
			if(location.hostname == "localhost") 
				url='/starter/movies.html';
			else
				url='../movies.html';
			history.pushState({}, null,url);
		}, 2000);

	} else {
		window.open(url, '_self', false)
	}
}
function checkLoggedInUser(user) {
	data = {
		email : user
	}
	$.ajax({
		url : "rest/client/checkLoggedIn",
		type : "POST",
		dataType : "json", // expected format for response
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		data : data,
		success : function(response) {
			if (response.status == 51 ) {
				document.getElementById("logout").style.display = "block";
			} else {
				if(location.hostname == "localhost") 
					url='/starter/mainPage.html';
				else
					url='../mainPage.html';
				window.open(url, '_self', false)
			}
		},
		error : function(response, status, error) {
			alert('Unexpected Error please try again');
		}
	});
}

function logout() {
	data = {
		email : MAIL
	}
	$.ajax({
		url : "rest/client/logout",
		type : "POST",
		dataType : "json", // expected format for response
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		data : data,
		success : function(response) {
			var url;
			if(location.hostname == "localhost") 
				url='/starter/mainPage.html';
			else
				url='../mainPage.html';
				window.open(url, '_self', false)
				localStorage.removeItem('user');

		},
		error : function(response, status, error) {
			alert('Unexpected Error please try again');
		}
	});
}

