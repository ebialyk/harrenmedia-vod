var MAIL;
var PSW;
var COUNTRYCODE;
$('html').css('display', 'none');
$.ajax({
	url : "rest/client/checkByIp",
	type : "GET",
	dataType : "json", // expected format for response
	contentType : "application/x-www-form-urlencoded; charset=UTF-8",
	success : function(response) {
		if (response != undefined && response.countryId != null) {
			$('html').css('display', 'block');
			COUNTRYCODE = response.countryId;
			COUNTRY = COUNTRYCODE;
		} else {
			confirmOnExit = false;
			window.open("https://www.google.co.il/", '_self', false);
		}
	},
	error : function(response, status, error) {
		confirmOnExit = false;
		window.open("https://www.google.co.il/", '_self', false);
	}
})
window.onload = function() {
	document.getElementById("genresContent").style.opacity = "1";
	var disableExternal = (location.hostname == "localhost");

}
function openBestsellers() {
	hideAll();
	document.getElementById("mainContainer").style.display = "block";
}
function ResetPassword() {
	hideAll();
	document.getElementById("mainContainer").style.display = "block";
	if (Modernizr.flexbox && Modernizr.flexboxtweener
			&& Modernizr.flexboxlegacy) {
		document.getElementById("forgotPswScreen").style.display = "flex"
		document.getElementById("mask").style.display = "flex"
	} else {
		document.getElementById("forgotPswScreen").style.display = "block"
		document.getElementById("mask").style.display = "block"
	}

}
function sendPassword() {
	if (Modernizr.flexbox && Modernizr.flexboxtweener
			&& Modernizr.flexboxlegacy) {
		document.getElementById("mask").style.display = "flex";
	} else {
		document.getElementById("mask").style.display = "block";
	}
	$(".mask").addClass("waiting");
	document.getElementById("loadingMask").style.display = "block";

	var email = document.getElementById("UserPsw");
	data = {
		email : email.value
	};
	$.ajax({
		url : "rest/client/passwordRecovery",
		type : "POST",
		dataType : "json", // expected format for response
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		data : data,
		success : function(response) {
			if (response.status == 51) {
				MAIL = email.value;
				PSW = psw.value;
				$(".mask").removeClass("waiting");
				document.getElementById("loadingMask").style.display = "none";

				hideAll();
				openBestsellers();
			} else {
				document.getElementById("mask").style.display = "none";
				$(".mask").removeClass("waiting");
				document.getElementById("loadingMask").style.display = "none";

				alert(response.message);
			}
		},
		error : function(response, status, error) {
			document.getElementById("mask").style.display = "none";
			$(".mask").removeClass("waiting");
			document.getElementById("loadingMask").style.display = "none";

			alert(response.message);
		}
	});
}
function openLogin() {
	hideAll();
	document.getElementById("mainContainer").style.display = "block";
	if (Modernizr.flexbox && Modernizr.flexboxtweener
			&& Modernizr.flexboxlegacy) {
		document.getElementById("loginScreen").style.display = "flex";
		document.getElementById("mask").style.display = "flex";
	} else {
		document.getElementById("loginScreen").style.display = "block";
		document.getElementById("mask").style.display = "block";
	}

	var email = document.getElementById("User");
	var psw = document.getElementById("Psw");
	email.value = "";
	psw.value = "";

	email.focus();
}
function logIn() {
	if (Modernizr.flexbox && Modernizr.flexboxtweener
			&& Modernizr.flexboxlegacy) {
		document.getElementById("mask").style.display = "flex";
	} else {
		document.getElementById("mask").style.display = "block";
	}
	$(".mask").addClass("waiting");
	document.getElementById("loadingMask").style.display = "block";

	var email = document.getElementById("User");
	var psw = document.getElementById("Psw");

	var okMail = false;
	var okPsw = false;

	var errorMsg = "";

	if (email.value === undefined || email.value == "") {// no empty email
		email.className = "error";
		email.title = "Please type your email";
		errorMsg += "Please type your email";
	} else if (!validEmail(email.value)) { // validate entered email
		email.className = "error";
		email.title = "Please enter a valid email";
		errorMsg += "Please enter a valid email";
	} else {
		email.className = "";
		email.title = "";
		okMail = true;
	}
	if (psw.value === undefined || psw.value == "") {// no empty message
		psw.className = "error";
		psw.title = "Please type your name";
		errorMsg += "Please type your name";
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
		document.getElementById("loadingMask").style.display = "block";

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

					url = 'movies.html?user=' + MAIL;
					localStorage.setItem('user', MAIL);
					window.open(url, '_self', false)

					email = "";
					psw = "";

				} else {
					document.getElementById("mask").style.display = "none";
					$(".mask").removeClass("waiting");
					document.getElementById("loadingMask").style.display = "none";

					alert(response.message);
				}
			},
			error : function(response, status, error) {
				document.getElementById("mask").style.display = "none";
				document.getElementById("loadingMask").style.display = "none";

				$(".mask").removeClass("waiting");
				alert("something was wrong, please try again later");
			}
		});
	} else {
		document.getElementById("mask").style.display = "none";
		$(".mask").removeClass("waiting");
		document.getElementById("loadingMask").style.display = "none";

		alert(errorMsg);
	}
}

function closeDialog() {
	document.getElementById("loginScreen").style.display = "none";
	document.getElementById("tooltip").style.display = "none";
	document.getElementById("cvv").style.display = "none";
	document.getElementById("forgotPswScreen").style.display = "none";

	document.getElementById("mask").style.display = "none";
}

function SignIn() {
	hideAll()
	closeDialog();
	document.getElementById("mainContainer").style.display = "none";
	if (Modernizr.flexbox && Modernizr.flexboxtweener
			&& Modernizr.flexboxlegacy) {
		document.getElementById("SignInPage").style.display = "flex"
	} else {
		document.getElementById("SignInPage").style.display = "block"
	}
}

function SignUp() {
	if (Modernizr.flexbox && Modernizr.flexboxtweener
			&& Modernizr.flexboxlegacy) {
		document.getElementById("mask").style.display = "flex";
	}
	$(".mask").addClass("waiting");
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
		alertTXT = "\nPlease enter an email";
	} else if (!validEmail(email.value)) { // validate entered email
		email.className = "error";
		email.title = "Please enter a valid email";
		alertTXT += "\nPlease enter  a valid email";
	} else { // no email errors
		email.className = "";
		email.title = "";
		okEmail = true;
	}
	if (psw.value === undefined || psw.value == "") {
		psw.className = "error";
		psw.title = "Please enter a password";
		alertTXT += "\nPlease enter a password";
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
		alertTXT = "";
		data = {
			email : email.value,
			pw : psw.value,
			pwConfirm : psw2.value,
			affiliate : "0",
			country : "0",
			clickID : ""
		};
		$
				.ajax({
					url : "rest/client/register",
					type : "POST",
					dataType : "json", // expected format for response
					contentType : "application/x-www-form-urlencoded; charset=UTF-8",
					data : data,
					success : function(response) {
						if (response.status == 15) {
							MAIL = email.value;
							PSW = psw.value;

							$(".mask").removeClass("waiting");
							document.getElementById("loadingMask").style.display = "none";

							hideAll();

							if (location.hostname == "localhost") {
								url = '/starter/verification.html'
										+ window.location.search + '?user='
										+ MAIL + '&countryCode=' + COUNTRYCODE;
							} else {
								url = 'https://ver.muvflix.com/verificationAccount.html'
										+ window.location.search
										+ '?user='
										+ MAIL + '&countryCode=' + COUNTRYCODE;
							}
							window.open(url, '_self', false);
						} else {
							document.getElementById("loadingMask").style.display = "none";
							alert(response.message);
						}
					},
					error : function(response, status, error) {
						document.getElementById("loadingMask").style.display = "none";
						alert(response.message);
					}
				});
	} else {
		alert(alertTXT);
		document.getElementById("mask").style.display = "none";
		$(".mask").removeClass("waiting");
		document.getElementById("loadingMask").style.display = "none";

	}
}

function verifyAccount() {
	if (Modernizr.flexbox && Modernizr.flexboxtweener
			&& Modernizr.flexboxlegacy) {
		document.getElementById("mask").style.display = "flex";
	}
	$(".mask").addClass("waiting");
	document.getElementById("loadingMask").style.display = "block";

	var uName = document.getElementById("FName").value + " "
			+ document.getElementById("LName").value;

	data = {
		email : MAIL,
		affiliate : 0,
		country : COUNTRYCODE,
		userName : uName
	};
	$
			.ajax({
				url : "rest/client/verifyAccount",
				type : "POST",
				dataType : "json", // expected format for response
				contentType : "application/x-www-form-urlencoded; charset=UTF-8",
				data : data,
				success : function(response) {
					if (response.status == 15) {
						tracking(0, 4, 0, 0, MAIL, "");
						setTimeout(
								function() {
									data = {
										email : MAIL,
										pw : PSW
									}
									$
											.ajax({
												url : "rest/client/logIn",
												type : "POST",
												dataType : "json", // expected
																	// format
																	// for
																	// response
												contentType : "application/x-www-form-urlencoded; charset=UTF-8",
												data : data,
												success : function(response) {
													if (response.status == 51) {
														url = 'movies.html';
														localStorage.setItem(
																'user', MAIL);
														window.open(url,
																'_self', false);
														confirmOnExit = false;
														tracking(0,  5, 0, 0,
																MAIL, "");
													} else {
														document
																.getElementById("mask").style.display = "none";
														$(".mask").removeClass(
																"waiting");
														document.getElementById("loadingMask").style.display = "none";

														alert(response.message);
													}
												},
												error : function(response,
														status, error) {
													document
															.getElementById("mask").style.display = "none";
													$(".mask").removeClass(
															"waiting");
													document.getElementById("loadingMask").style.display = "none";

													alert(response.message);
												}
											});
								}, 100);
					} else {
						document.getElementById("mask").style.display = "none";
						$(".mask").removeClass("waiting");
						document.getElementById("loadingMask").style.display = "none";

						alert(response.message);
					}
				},
				error : function(response, status, error) {
					document.getElementById("mask").style.display = "none";
					$(".mask").removeClass("waiting");
					document.getElementById("loadingMask").style.display = "none";

					tracking(0,  9, 0, 0, MAIL, "");
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
function openPricing() {
	hideAll();
	document.getElementById("pricingPage").style.display = "block";
}
function sendSupportRequest() {
	if (Modernizr.flexbox && Modernizr.flexboxtweener
			&& Modernizr.flexboxlegacy) {
		document.getElementById("mask").style.display = "flex";
	}
	$(".mask").addClass("waiting");
	document.getElementById("loadingMask").style.display = "block";

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

	var alertTXT = "";

	if (name.value === undefined || name.value == "") {// no empty name
		name.className = "error";
		name.title = "Please type your name";
		alertTXT += "Please type your name";
	} else {
		name.className = "";
		name.title = "";
		okName = true;
	}
	if (message.value === undefined || message.value == "") {// no empty
		// message
		message.className = "error";
		message.title = "Please type a message";
		alertTXT += "\nPlease type a message";
	} else {
		message.className = "";
		message.title = "";
		okMsg = true;
	}
	if (email.value === undefined || email.value == "") {// no empty email
		email.className = "error";
		email.title = "Please type your email";
		alertTXT += "\nPlease type your email";
	} else if (!validEmail(email.value)) { // validate entered email
		email.className = "error";
		email.title = "Please enter a valid email";
		alertTXT += "\nPlease enter a valid email";
	} else {
		email.className = "";
		email.title = "";
		okMail = true;
	}

	if ((cardDigits.value === undefined || cardDigits.value == "")
			&& cancelRequest) { // validate card digits
		cardDigits.className = "error";
		cardDigits.title = "Please type the last 4 digits of your credit card";
		alertTXT += "\nPlease type the last 4 digits of your credit card";
	} else {
		cardDigits.className = "";
		cardDigits.title = "";
		okCardD = true;
	}

	if (cancelRequest) {
		if (subjectSupport2.value == "") {
			subjectSupport2.className = "error";
			subjectSupport2.title = "Please select a subject";
			alertTXT += "\nPlease select a subject";
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
			alertTXT += "\nPlease select a subject";
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

		$
				.ajax({
					url : "rest/client/support",
					type : "POST",
					dataType : "json", // expected format for response
					async : false,
					data : data,
					success : function(response) {
						if (response.status === 40) {
							$(".mask").removeClass("waiting");
							document.getElementById("loadingMask").style.display = "none";

							alert(response.message);
							hideAll();
							document.getElementById("mainContainer").style.display = "block";
							if (msgCode == 0) {
								tracking(0, 7, 0, 0, email);
							}
						} else {
							document.getElementById("mask").style.display = "none";
							$(".mask").removeClass("waiting");
							document.getElementById("loadingMask").style.display = "none";

							alert(response.message);
						}
					},
					error : function(response, status, error) {
						document.getElementById("mask").style.display = "none";
						$(".mask").removeClass("waiting");
						document.getElementById("loadingMask").style.display = "none";

						alert(response.message);
					}
				});
	} else {
		alert(alertTXT)
		document.getElementById("mask").style.display = "none";
		$(".mask").removeClass("waiting");
		document.getElementById("loadingMask").style.display = "none";

	}
}
function showCvv() {
	if (Modernizr.flexbox && Modernizr.flexboxtweener
			&& Modernizr.flexboxlegacy) {
		document.getElementById("cvv").style.display = "flex";
	}
	document.getElementById("mask").style.display = "block";
}
function hideAll() {
	document.getElementById("mainContainer").style.display = "none";
	document.getElementById("mask").style.display = "none";
	document.getElementById("loginScreen").style.display = "none";
	document.getElementById("SignInPage").style.display = "none";
	document.getElementById("cancelAccount").style.display = "none";
	document.getElementById("SignUpPage").style.display = "none";
	document.getElementById("pricingPage").style.display = "none";
	document.getElementById("supportPage").style.display = "none";
	document.getElementById("cvv").style.display = "none";
	document.getElementById("forgotPswScreen").style.display = "none";
}

function checkEnter(e, obj) {
	if (e.which == 13 || e.keyCode == 13) {
		if (obj.id == "email") {
			document.getElementById("psw").focus();
		} else if (obj.id == "psw") {
			document.getElementById("psw2").focus();
		} else if (obj.id == "psw2") {
			SignUp();
		} else if (obj.id == "User") {
			document.getElementById("Password").focus();
		} else if (obj.id == "Password") {
			logIn();
		} else if (obj.id == "UserPsw") {
			sendPassword();
		} else if (obj.id == "supportName") {
			document.getElementById("supportEmail").focus();
		} else if (obj.id == "supportEmail") {
			document.getElementById("subjectSupport").focus();
		} else if (obj.id == "subjectSupport") {
			document.getElementById("supportContent").focus();
		} else if (obj.id == "supportContent") {
			sendSupportRequest();
		}
	}
}