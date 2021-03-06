var confirmOnExit = true;
var MAIL;
var URL;

URL = document.URL;

window.onload = function() {

	urlParams = parseURLParams(window.location.href);

	if (urlParams != null) {
		MAIL = urlParams.user ? urlParams.user[0] : "";
	}
	if (Modernizr.flexbox && Modernizr.flexboxtweener
			&& Modernizr.flexboxlegacy) {
		document.getElementById("VerificationPage").style.display = "flex";
	} else {
		document.getElementById("VerificationPage").style.display = "block";
		document.getElementById("seamless-target").focus();
		document.getElementById("seamless-target").blur();
	}

	renderIframe();

	if (MAIL != null && MAIL != undefined) {

		if (Modernizr.flexbox && Modernizr.flexboxtweener
				&& Modernizr.flexboxlegacy) {
			document.getElementById("VerificationPage").style.display = "flex";
		} else {
			document.getElementById("VerificationPage").style.display = "block";
		}
	} else {
		if (location.hostname == "localhost")
			url = '/starter/';
		else
			url = 'http://www.muvflix.com/';
		window.open(url, '_self', false)
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

function renderIframe() {

	data = {
		timestamp : get_nowUTC(),
		transactionType : "authorization",

	}
	document.getElementById("loadingMask").style.display = "block";

	$
			.ajax(
					{
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
							var transactionType = res[2].split(":")[1];
							var amount = res[3].split(":")[1];
							var currency = res[4].split(":")[1];

							WirecardPaymentPage
									.seamlessRenderForm({
										requestData : {
											request_id : reqId,
											request_time_stamp : data.timestamp,
											merchant_account_id : "25904914-c619-4be9-b529-d4071c809a6f",
											transaction_type : transactionType,
											requested_amount : amount,
											requested_amount_currency : currency,
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
							document.getElementById("loadingMask").style.display = "none";
							alert(response.message);
						}
					}).done(function() {
				document.getElementById("loadingMask").style.display = "none";
			});

}
function get_nowUTC() {
	var now = new Date();

	var now_utc = now.getUTCFullYear() + "" + setNumber(now.getUTCMonth() + 1)
			+ "" + setNumber(now.getUTCDate()) + ""
			+ setNumber(now.getUTCHours()) + ""
			+ setNumber(now.getUTCMinutes()) + ""
			+ setNumber(now.getUTCSeconds());

	return now_utc;
}
// format for days and months < 10
function setNumber(num) {
	if (num < 10) {
		return "0" + num;
	} else {
		return num;
	}
}

function verifyAccount() {
	document.getElementById("loadingMask").style.display = "block";
	WirecardPaymentPage
			.seamlessSubmitForm({
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
						transaction_type : response.transaction_type,
						agregatorId : 4000
					}
					$
							.ajax(
									{
										url : "rest/client/verifyAccount",
										type : "POST",
										dataType : "json", // expected format
										// for response
										contentType : "application/x-www-form-urlencoded; charset=UTF-8",
										data : data,
										success : function(response) {
											if (response.status == 15) {
												document
														.getElementById("VerificationPage").style.display = "none";
												if (Modernizr.flexbox
														&& Modernizr.flexboxtweener
														&& Modernizr.flexboxlegacy) {
													document
															.getElementById("page3").style.display = "flex";
												} else {
													document
															.getElementById("page3").style.display = "block";
												}
												document.getElementById("body").style.backgroundColor = "black";

												setTimeout(function() {
													data = {
														email : MAIL
													}
													chkForLogin(data);
												}, 2000);
											}
										},
										error : function(response, status,
												error) {
											alert(response.message);
											renderIframe();

										}
									})
							.done(
									function() {
										document.getElementById("loadingMask").style.display = "none";
									});
				},
				onError : function(response) {
					if (response.status_description_1 != null) {
						data = {
							email : MAIL,
							affiliate : null,
							country : COUNTRY,
							clickID : null,
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
							transaction_type : response.transaction_type,
							agregatorId : 4000
						}
						$
								.ajax({
									url : "rest/client/setTransaction",
									type : "POST",
									dataType : "json",
									contentType : "application/x-www-form-urlencoded; charset=UTF-8",
									data : data,
									success : function() {
									},
									error : function() {
									}
								});
						alert(response.status_description_1);

					} else if (response.form_validation_result != null) {
						alert(response.form_validation_result);
					}
					document.getElementById("loadingMask").style.display = "none";
					renderIframe();
				},
			})
}
function chkForLogin(data) {
	$.ajax({
		url : "rest/client/setLoggedIn",
		type : "POST",
		dataType : "json",
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		data : data,
		success : function(response) {
			if (response.status == 51) {
				if (location.hostname == "localhost") {
					url = '/starter/movies.html?user=' + MAIL;
				} else {
					url = 'http://www.muvflix.com/movies.html?user=' + MAIL;
				}
				localStorage.setItem('user', MAIL);

				confirmOnExit = false;

				window.open(url, '_self', false);
				history.pushState({}, null, 'index.html');

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
});

function closeDialog() {
	document.getElementById("cvv").style.display = "none";
	document.getElementById("mask").style.display = "none";
}
