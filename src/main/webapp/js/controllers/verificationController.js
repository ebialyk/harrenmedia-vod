var app = angular.module('MuvFlixApp');
app
		.controller(
				'verificationController',
				[
						'$scope',
						'$location',
						'$window',
						'$filter',
						'commonFunctions',
						'Api', '$timeout',
						function($scope, $location, $window, $filter,
								commonFunctions, Api, $timeout) {
							urlParams = commonFunctions
									.parseURL($window.location.href);
							if (urlParams != null) {
								$scope.CSS = urlParams.theme ? urlParams.theme[0]
										: "";
								$scope.AFF = urlParams.aff ? urlParams.aff[0]
										: 0;
								$scope.COUNTRY = urlParams.countryCode ? urlParams.countryCode[0]
										: 0;
								$scope.LANG = urlParams.lang ? urlParams.lang[0]
										: 0;
								$scope.CLICKID = urlParams.clickid ? urlParams.clickid[0]
										: "";
								$scope.MAIL = urlParams.user ? urlParams.user[0]
										: "";
							}
							$scope.allData = [
									{
										lang : 'EN',
										content : {
											headerTitle : "Account Verification",
											clarification : "This is a free registration. Why am I asked for my credit"
													+ "	card details? It's for verification purposes. "
													+ "If you do not cancel your account within the trial period, "
													+ "five days your account will be automatically extended to a "
													+ "premium account at the cost of usd 49.99 per month. "
													+ "When you sign up for the free trial muvflix may charge or capture "
													+ "one or more variable amounts to your account in order to verify "
													+ "if the card is valid, and that you are the authorised and "
													+ "legitimate cardholder. These amounts will appear on your card "
													+ "statement along with the corresponding refund. If you cancel your "
													+ "account within the free trial period, you will only see the "
													+ "verification charges and their corresponding refunds in your "
													+ "statement.",
											explanation : [
													{
														title : "Why do we ask you for your billing information?",
														detail1 : "Because our library is only licensed to distribute our content to					"
																+ "certain countries, we ask that you provide your mailing address by "
																+ "providing us with a valid credit card number. ",
														detailBold : "NO CHARGES GUARANTEED. ",
														detail2 : "No charges will appear on your credit card statement "
																+ "unless you upgrade to a Premium Membership or make a purchase."
													},
													{
														title : "Privacy Guaranteed",
														detail1 : "In order to keep your personal information private, we use "
																+ "encryption security technology. Our site employs ",
														detailBold : "Secure Sockets Layering (SSL)",
														detail2 : " to encrypt your personal information such "
																+ "as credit card number, name, and address before it travels over "
																+ "the Internet. Your data is encrypted and password-protected to "
																+ "make sure no one ever sees your personal information!!!"
													},
													{
														title : "No Hidden Fees",
														detail1 : "We always provide our members with a detailed purchase history in "
																+ "order for them to know exactly what they are paying for. Your "
																+ "payment method information is required to future purchases only.  ",
														detailBold : "NO CHARGES ",
														detail2 : "will appear on your credit card statement unless you "
																+ "upgrade to a Premium Membership or make a purchase. By creating an "
																+ "account, you agree our  ",
														link : "http://www.muvflix.com/TermsAndConditions.html",
														linkTitle : "Terms & Conditions"
													}, ],
											timer : "Our special offer will be available only in the next ",
											starsTitle : "Normal Membership",
											free : "FREE",
											price : "$0.00",
											verificationTitle : "VERIFY	MY ACCOUNT NOW",
											srcImg : "images/MF_verification-Vgreen.png",
											tnxTitle : "Thank you.",
											tnxExplanation1 : "a verification email has been send to you,",
											tnxExplanation2 :	" you will be redirect to the movie library now. Enjoy",
											tnxLogo : "images/MF-allpages-TOPLOGO.png"

										}
									},
									{
										lang : 'ES',
										content : {
											headerTitle : "Verificacion de Cuenta",
											clarification : "This is a free registration. Why am I asked for my credit"
													+ "	card details? It's for verification purposes. "
													+ "If you do not cancel your account within the trial period, "
													+ "five days your account will be automatically extended to a "
													+ "premium account at the cost of usd 49.99 per month. "
													+ "When you sign up for the free trial muvflix may charge or capture "
													+ "one or more variable amounts to your account in order to verify "
													+ "if the card is valid, and that you are the authorised and "
													+ "legitimate cardholder. These amounts will appear on your card "
													+ "statement along with the corresponding refund. If you cancel your "
													+ "account within the free trial period, you will only see the "
													+ "verification charges and their corresponding refunds in your "
													+ "statement.",
											explanation : [
													{
														title : "Why do we ask you for your billing information?",
														detail : "Because our library is only licensed to distribute our content to					"
																+ "certain countries, we ask that you provide your mailing address by "
																+ "providing us with a valid credit card number. <b>NO CHARGES "
																+ "GUARANTEED</b>. No charges will appear on your credit card statement "
																+ "unless you upgrade to a Premium Membership or make a purchase."
													},
													{
														title : "Privacy Guaranteed",
														detail : "In order to keep your personal information private, we use "
																+ "encryption security technology. Our site employs <b>Secure "
																+ "Sockets Layering (SSL)</b> to encrypt your personal information such "
																+ "as credit card number, name, and address before it travels over "
																+ "the Internet. Your data is encrypted and password-protected to "
																+ "make sure no one ever sees your personal information!!!"
													},
													{
														title : "No Hidden Fees",
														detail : "We always provide our members with a detailed purchase history in "
																+ "order for them to know exactly what they are paying for. Your "
																+ "payment method information is required to future purchases only. <b>NO "
																+ "CHARGES</b> will appear on your credit card statement unless you "
																+ "upgrade to a Premium Membership or make a purchase. By creating an "
																+ "account, you agree our <a class=\"underlined\" "
																+ "href=\"http://www.muvflix.com/TermsAndConditions.html\" target=\"_blank\">"
																+ "Terms & Conditions</a>"
													}, ],
											timer : "Our special offer will be available only in the next ",
											starsTitle : "Normal Membership",
											free : "FREE",
											price : "$0.00",
											verificationTitle : "VERIFY	MY ACCOUNT NOW",

										}
									} ];
							
							$scope.test = function() {
								$scope.currentContent = "LP/partials/tnxPage1.html";
								$("#home").removeClass( "white" ).addClass( "black" );
							}

							urlParams = commonFunctions
									.parseURL($window.location.href);
							$scope.selectedLanguage = function(l) {
								if (l == 0) {
									l = 'EN'
								}
								var selected = [];

								if (l) {
									selected = $filter('filter')(
											$scope.allData, {
												lang : l
											}, true);
								}
								return selected.length ? selected[0]
										: 'Not found';

							};

							$scope.data = $scope.selectedLanguage($scope.LANG);

							switch ($scope.CSS) {
							case '0220':
								$scope.currentContent = "LP/0220/verificationContent.html";
								break;
							case '0320':
								$scope.currentContent = "LP/0320/verificationContent.html"
								break;
							case '0420':
								$scope.currentContent = "LP/0420/verificationContent.html"
								break;
							case '0520':
								$scope.currentContent = "LP/0520/verificationContent.html"
								break;
							default:
								$scope.currentContent = "LP/0220/verificationContent.html"
								break;
							}
							;

							$scope.renderIframe = function() {
								var mask = $("#maskLoader")[0];
								mask.style.display = "block";
								var timestamp = commonFunctions.get_nowUTC();
								var data = 'timestamp=' + timestamp
										+ '&country=' + $scope.COUNTRY
										+ '&affiliate=' + $scope.AFF
										+ '&transactionType=authorization';

								Api.CreateSignatureService.post(data).$promise
										.then(
												function(response) {
													var sign = response.signature;
													var reqId = response.request_id;
													var transactionType = response.transaction_type;
													var amount = response.request_amount;
													var currency = response.request_currency;

													WirecardPaymentPage
															.seamlessRenderForm({
																requestData : {
																	request_id : reqId,
																	request_time_stamp : timestamp,
																	merchant_account_id : "25904914-c619-4be9-b529-d4071c809a6f",
																	transaction_type : transactionType,
																	requested_amount : amount,
																	requested_amount_currency : currency,
																	payment_method : "creditcard",
																	request_signature : sign,
																	template_name : "default-cc-template",
																},
																wrappingDivId : "seamless-target",
																onSuccess : function(
																		response) {
																	mask.style.display = "none";
																},
																onError : function(
																		response) {

																},
															});
													mask.style.display = "none";
												},
												function(error) {
													alert(response.message);
													mask.style.display = "none";
												})

							};
							$scope.verifyAccount = function() {
								var mask = $("#loadingMask")[0];
								mask.style.display = "block";

								WirecardPaymentPage
										.seamlessSubmitForm({
											onSuccess : function(response) {
												$scope.tracking(16);
												data = 'email='
														+ MAIL
														+ '&affiliate='
														+ AFF
														+ '&country='
														+ COUNTRY
														+ '&clickID='
														+ CLICKID
														+ '&authorization_code='
														+ response.authorization_code
														+ '&card_type='
														+ response.card_type
														+ '&completion_time_stamp='
														+ response.completion_time_stamp
														+ '&expiration_month='
														+ response.expiration_month
														+ '&expiration_year='
														+ response.expiration_year
														+ '&first_name='
														+ response.first_name
														+ '&last_name='
														+ response.last_name
														+ '&masked_account_number='
														+ response.masked_account_number
														+ '&merchant_account_id='
														+ response.merchant_account_id
														+ '&parent_transaction_id='
														+ response.parent_transaction_id
														+ '&payment_method='
														+ response.payment_method
														+ '&request_id='
														+ response.request_id
														+ '&requested_amount='
														+ response.requested_amount
														+ '&requested_amount_currency='
														+ response.requested_amount_currency
														+ '&response_signature='
														+ response.response_signature
														+ '&self='
														+ response.self
														+ '&status_code_1='
														+ response.status_code_1
														+ '&status_description_1='
														+ response.status_description_1
														+ '&status_severity_1='
														+ response.status_severity_1
														+ '&token_id='
														+ response.token_id
														+ '&transaction_id='
														+ response.transaction_id
														+ '&transaction_state='
														+ response.transaction_state
														+ '&transaction_type='
														+ response.transaction_type
														+ '&agregatorId='
														+ 4000;

												Api.VerifyAccount.post(data).$promise
														.then(
																function(
																		response) {
																	if (response.status == 15) {
																		$("#body")[0].style.backgroundColor = "black";
																		$("#mask")[0].style.display = "block";
																		$("#tnxPage")[0].style.display = "block";
																		
																		$scope.tracking(4);
																		setTimeout(
																				function() {
																					data = 'email='
																							+ MAIL;
																					$scope
																							.chkForLogin(data);
																				},
																				2000);
																		if (CLICKID != null
																				&& CLICKID != undefined
																				&& CLICKID != "") {
																			data = 'affiliate='
																					+ AFF
																					+ '&clickID='
																					+ CLICKID;
																			Api.PostBack
																					.post(data);
																		}
																	} else {
																		$scope
																				.tracking(9);
																		mask.style.display = "none";
																		alert(response.message);
																		renderIframe();
																	}
																	mask.style.display = "none";
																},
																function(error) {
																	mask.style.display = "none";
																	alert(response.message);
																	renderIframe();
																})
											},
											onError : function(response) {
												mask.style.display = "none";
												if (response.status_description_1 != null) {
													data = 'email='
															+ MAIL
															+ '&affiliate='
															+ AFF
															+ '&country='
															+ COUNTRY
															+ '&clickID='
															+ CLICKID
															+ '&authorization_code='
															+ response.authorization_code
															+ '&card_type='
															+ response.card_type
															+ '&completion_time_stamp='
															+ response.completion_time_stamp
															+ '&expiration_month='
															+ response.expiration_month
															+ '&expiration_year='
															+ response.expiration_year
															+ '&first_name='
															+ response.first_name
															+ '&last_name='
															+ response.last_name
															+ '&masked_account_number='
															+ response.masked_account_number
															+ '&merchant_account_id='
															+ response.merchant_account_id
															+ '&parent_transaction_id='
															+ response.parent_transaction_id
															+ '&payment_method='
															+ response.payment_method
															+ '&request_id='
															+ response.request_id
															+ '&requested_amount='
															+ response.requested_amount
															+ '&requested_amount_currency='
															+ response.requested_amount_currency
															+ '&response_signature='
															+ response.response_signature
															+ '&self='
															+ response.self
															+ '&status_code_1='
															+ response.status_code_1
															+ '&status_description_1='
															+ response.status_description_1
															+ '&status_severity_1='
															+ response.status_severity_1
															+ '&token_id='
															+ response.token_id
															+ '&transaction_id='
															+ response.transaction_id
															+ '&transaction_state='
															+ response.transaction_state
															+ '&transaction_type='
															+ response.transaction_type
															+ '&agregatorId='
															+ 4000;
													Api.SetTransaction
															.post(data);

													alert(response.status_description_1);

												} else if (response.form_validation_result != null) {
													alert(response.form_validation_result);
												}
												mask.style.display = "none";
												$scope.tracking(15);
												renderIframe();
											},
										});

							};

							$scope.min = 08;

							$scope.counter = 59;
							$scope.onTimeout = function() {
								$scope.counter--;
								if ($scope.counter == 0) {
									$scope.min--;
									$scope.counter = 59;
									if ($scope.min == 0) {
										$scope.min = 08;
									}

								}
								if($scope.counter < 10) {
									$scope.counter = '0' + $scope.counter;
								}
								mytimeout = $timeout($scope.onTimeout, 1000);
							}
							var mytimeout = $timeout($scope.onTimeout, 1000);
							$scope.tracking = function(place) {
								var data = 'affiliate=' + $scope.AFF
										+ '&place=' + place + '&cssTheme='
										+ $scope.CSS + '&languageId='
										+ $scope.LANG + '&email=' + email
										+ '&clickId=' + $scope.CLICKID;
								Api.TrackingService.post(data);
							}

						} ])