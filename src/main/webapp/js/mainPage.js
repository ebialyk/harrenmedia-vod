var MAIL;
var PSW;

function openLogin() {
	hideAll();
	document.getElementById("mainContainer").style.display = "block";
	document.getElementById("loginScreen").style.display = "flex"
	document.getElementById("mask").style.display = "flex"
	var email = document.getElementById("User");
	var psw = document.getElementById("Psw");
	email.value = "";
	psw.value = "";
}
function logIn() {
	var email = document.getElementById("User");
	var psw = document.getElementById("Psw");

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
		psw.title = "Please type your name";
	} else {
		psw.className = "";
		psw.title = "";
		okPsw = true;
	}

	if (okMail && okPsw) {
		var data = {
			email : email.value,
			pw : psw.value
		};

		$.ajax({
			url : "rest/client/logIn",
			type : "POST",
			dataType : "json", // expected format for response
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			data : data,
			success : function(response) {
				if (response.status === 51) {
					MAIL = email.value;
					PSW = psw.value;

					closeDialog()
					email.value = "";
					psw.value = "";

					url = 'movies.html';
					localStorage.setItem('user', MAIL);
					window.open(url, '_self', false)

					email = "";
					psw = "";

				} else {
					alert(response.message);
				}
			},
			error : function(response, status, error) {
				alert("something was wrong, please try again later");
			}
		});
	}
}

function closeDialog() {
	document.getElementById("loginScreen").style.display = "none";
	document.getElementById("tooltip").style.display = "none";
	document.getElementById("mask").style.display = "none";
}

function SignIn() {
	closeDialog();
	document.getElementById("mainContainer").style.display = "none";
	document.getElementById("SignInPage").style.display = "flex"
}

function SignUp() {
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

	if (psw.value === psw2.value) { // validate password and confirm password
		// are equals
		okPswEquals = true;
	} else {
		psw.className = "error";
		psw2.className = "error";
		psw.title = "password and confirm password are not the same, please type again";
		psw2.title = "password and confirm password are not the same, please type again";
	}

	if (okEmail && okPsw && okPsw2 && okPswEquals) {

		data = {
			email : email.value,
			pw : psw.value,
			pwConfirm : psw2.value,
			affiliate : "0",
			country : "0"
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

							document.getElementById("SignInPage").style.display = "none";
							document.getElementById("SignUpPage").style.display = "flex";
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

function openVerificationPage() {
	hideAll();
	document.getElementById("SignUpPage").style.display = "flex"
}
function verifyAccount() {
	var affiliateCode = 0;
	var countryCode = 0;
	var cssTheme = 0;
	var language = 0;
	
	data = {
		email : MAIL,
		pw : PSW
	};
	$.ajax({
		url : "rest/client/logIn",
		type : "POST",
		dataType : "json", // expected format for response
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		data : data,
		success : function(response) {
			if (response.status == 51) {
				
				tracking(affiliateCode, countryCode, 4, cssTheme, language, MAIL);
				setTimeout(function() {
					url = 'movies.html';
					localStorage.setItem('user', MAIL);
					window.open(url, '_self', false)
					confirmOnExit = false;
				}, 100);
			} else {
				alert(response.message);
			}
		},
		error : function(response, status, error) {
			alert(response.message);
		}
	});
}

function openSupport() {
	hideAll();
	clearForm();
	document.getElementById("supportPage").style.display = "block";
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

function sendSupportRequest() {
	var name = document.getElementById("supportName");
	var email = document.getElementById("supportEmail");
	var cardDigits = document.getElementById("cardDigits");
	var message = document.getElementById("supportContent");
	var subjectSupport = document.getElementById("subjectSupport");
	var subjectSupport2 = document.getElementById("subjectSupport2");

	var cancelRequest = false;

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
					hideAll();
					document.getElementById("mainContainer").style.display = "block";
	
					if (msgCode == 0) {
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
	document.getElementById("mainContainer").style.display = "none";
	document.getElementById("mask").style.display = "none";
	document.getElementById("loginScreen").style.display = "none";
	document.getElementById("SignInPage").style.display = "none";
	document.getElementById("cancelAccount").style.display = "none";
	document.getElementById("SignUpPage").style.display = "none";

}
