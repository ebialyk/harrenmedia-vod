var confirmOnExit = true;
var MAIL;
var PSW;

window.onload = function() {

	var disableExternal = (location.hostname == "localhost");

	document.getElementById('amazonCSS').disabled = disableExternal;
	document.getElementById('amazonMobileCSS').disabled = disableExternal;
	document.getElementById('LHCSS').disabled = !disableExternal;
	document.getElementById('LHMobileCSS').disabled = !disableExternal;

	MAIL = localStorage.getItem('MAIL');
	PSW = localStorage.getItem('PSW');
	document.getElementById("VerificationPage").style.display = "flex";
	var url;

	var now = new Date();
	var now_utc = now.getUTCFullYear() + "" + setNumber(now.getUTCMonth() + 1)
			+ "" + setNumber(now.getUTCDate()) + ""
			+ setNumber(now.getUTCHours()) + ""
			+ setNumber(now.getUTCMinutes()) + ""
			+ setNumber(now.getUTCSeconds());
	var reqID = "REQ" + now_utc;

	function setNumber(num) {
		if (num < 10) {
			return "0" + num;
		} else {
			return num;
		}
	}

	data = { timestamp : now_utc }
	document.getElementById("loadingMask").style.display = "block";
	$.ajax({
		url : "rest/agregator/createSignature",
		type : "POST",
		dataType : "html", // expected format for response
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		data : data,
		success : function(response) {
			response = response.replace("{", '').trim()
					.replace("}", '').trim().replace(/"/g, '')
					.trim();
			var res = response.split(",");
			var sign = res[0].split(":")[1];
			var reqId = res[1].split(":")[1];

			WirecardPaymentPage.seamlessRenderForm({
				requestData : {
					request_id : reqId,
					request_time_stamp : now_utc,
					merchant_account_id : "51b671b8-17da-4ab6-af90-d86d46d774c9",
					transaction_type : "authorization",
					requested_amount : "20",
					requested_amount_currency : "USD",
					payment_method : "creditcard",
					request_signature : sign,
					template_name : "default-cc-template",
				},
				wrappingDivId : "seamless-target",
				onSuccess : function(response) {
				},
				onError : function(response) {
				},
			});
		},
		error : function(response, status, error) {
			alert(response.message);
		}
	}).done(function() {
		document.getElementById("loadingMask").style.display = "none";
	});

	if (MAIL != null && MAIL != undefined) {
		if (location.hostname == "localhost")
			url = '/starter/verificationAccount.html';
		else
			url = '../verificationAccount.html';
		setTimeout(function() {
			history.pushState({}, null, url);
		}, 100);
		document.getElementById("VerificationPage").style.display = "flex";
	} else {
		if (location.hostname == "localhost")
			url = '/starter/';
		else
			url = '../';
		window.open(url, '_self', false)
	}

	var display = document.querySelector('#time'), timer = new CountDownTimer(480);
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
	document.getElementById("loadingMask").style.display = "block";
	WirecardPaymentPage.seamlessSubmitForm({
		onSuccess : function(response) {
			data = {
				email : MAIL,
				authorization_code : response.authorization_code,
				card_type : response.card_type,
				completion_time_stamp : response.completion_time_stamp,
				expiration_month : response.expiration_month,
				expiration_year : response.expiration_year,
				first_name : response.first_name,
				last_name : response.last_name,
				masked_account_number : response.masked_account_number,
				merchant_account_id : response.merchant_account_id,
				parent_transaction_id : response.parent_transaction_id,
				payment_method : response.payment_method,
				request_id : response.request_id,
				requested_amount : response.requested_amount,
				requested_amount_currency : response.requested_amount_currency,
				response_signature : response.response_signature,
				self : response.self,
				status_code_1 : response.status_code_1,
				status_description_1 : response.status_description_1,
				status_severity_1 : response.status_severity_1,
				token_id : response.token_id,
				transaction_id : response.transaction_id,
				transaction_state : response.transaction_state,
				transaction_type : response.transaction_type
			}
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
						
						setTimeout(function() {
							data = {
								email : MAIL,
								pw : PSW
							}
						chkForLogin(data);
						}, 2000);
					}
				},
				error : function(response,status, error) {
					alert(response.message);
				}
			}).done(function() {
			document.getElementById("loadingMask").style.display = "none";
			});
		},
		onError : function(response) {
			alert(response);
		},
	})
}
function chkForLogin(data) {
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
				history.pushState({}, null, 'index.html');
				confirmOnExit = false;
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

function closeDialog() {
	document.getElementById("cvv").style.display = "none";
	document.getElementById("mask").style.display = "none";
}
