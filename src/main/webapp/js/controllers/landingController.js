var app = angular.module('MuvFlixApp');

app
		.controller(
				'landingPageController',
				[
						'$scope',
						'$location',
						'$window',
						'$http',
						'Api',
						'commonFunctions',
						'$filter','$timeout',
						function($scope, $location, $window, $http, Api,
								commonFunctions, $filter, $timeout) {
							$scope.confirmOnExit = true;
							$(function() {
								$(window)
										.on(
												'beforeunload',
												function() {
													if ($scope.confirmOnExit)
														return "Are you sure you want to leave MY page?";
												});
							});

							$scope.createAccountDialog = "LP/partials/landingPages/createAccountDialog.html";

							urlParams = commonFunctions
									.parseURL($window.location.href);
							$scope.allData = [
									{
										lang : 'EN',
										content : {
											title : "start watching movies instantly!",
											subtitle : "HD Streaming(720)",
											btnTitle : "Download",
											btnSubTitle : "TO YOUR COMPUTER",
											logoImg : "images/MF-allpages-TOPLOGO.png",
											logoStyle1 : true,
											rank : "Rank",
											createAccount : {
												title : "Only registered friends can watch all the movies!",
												subTitle1 : "you must create a ",
												subTitle2 : " account to ",
												subTitle3 : " this movie ",
												free : " FREE ",
												stream : " STREAM ",
												btnTitle : "CREATE MY FREE ACCOUNT NOW"
											},
											titles : [ "Home", "New Episodes",
													"Most Popular", "genres",
													"my watchlist" ],
											bottomTable : {
												title : "Links available",
												watchBtn : "Watch this link!",
												voteBtn : "Vote",
												votes : "Votes",
												rows : [
														{
															title : "besttvnow.com",
															stars : 4,
															votes : 2560
														},
														{
															title : "moviesme.com",
															stars : 5,
															votes : 1560
														},
														{
															title : "goodmovieonline.com",
															stars : 4,
															votes : 2462
														},
														{
															title : "gozlan.cc",
															stars : 3,
															votes : 1535
														},
														{
															title : "movies.tv",
															stars : 4,
															votes : 2588
														}

												]
											}

										}
									},
									{
										lang : 'ES',
										content : {
											title : "empieza a mirar peliculas inmediatamente!",
											subtitle : "HD Streaming(720)",
											btnTitle : "Descargar",
											btnSubTitle : "A TU ORDENADOR",
											logoImg : "images/MF-allpages-TOPLOGO.png",
											logoStyle1 : true,
											rank : "Rank",
											createAccount : {
												title : "Solo los usuarios registrados pueden ver todas las peliculas!",
												subTitle1 : "debes crear una cuenta ",
												subTitle2 : " para ",
												subTitle3 : " esta pelicula ",
												free : " GRATIS ",
												stream : " VER ",
												btnTitle : "CREAR MI CUENTA GRATIS AHORA"
											},
											titles : [ "Inicio",
													"Nuevos episodios",
													"Mas Populares", "generos",
													"mi lista de episodios" ],
											bottomTable : {
												title : "Enlaces disponibles",
												watchBtn : "Ver ahora!",
												voteBtn : "Vota",
												votes : "Votos",
												rows : [
														{
															title : "besttvnow.com",
															stars : 4,
															votes : 2560
														},
														{
															title : "mispelis.com",
															stars : 5,
															votes : 1560
														},
														{
															title : "pelisonline.com",
															stars : 4,
															votes : 2462
														},
														{
															title : "gozlan.cc",
															stars : 3,
															votes : 1535
														},
														{
															title : "movies.tv",
															stars : 4,
															votes : 2588
														}

												]
											}
										}
									} ];

							
							if (urlParams != null) {
								$scope.CSS = urlParams.theme ? urlParams.theme[0]
										: "";
								$scope.AFF = urlParams.aff ? urlParams.aff[0]
										: 0;
								$scope.COUNTRY = urlParams.countryCode ? urlParams.countryCode[0]
										: 0;
								$scope.LANG = urlParams.language ? urlParams.language[0]
										: 0;
								$scope.CLICKID = urlParams.clickid ? urlParams.clickid[0]
										: "";
								$scope.MAIL = urlParams.user ? urlParams.user[0]
										: "";
								$scope.PUB = urlParams.pub ? urlParams.pub[0]
										: "";
								$scope.SUB_PUB_ID = urlParams.sub_pub_id ? urlParams.sub_pub_id[0]
										: "";
								$scope.PROG = urlParams.prog ? urlParams.prog[0]
										: "";
							}

							switch ($scope.CSS) {
							case '0220':
								$scope.currentLanding = "LP/0220/content.html";
								break;
							case '0320':
								$scope.currentLanding = "LP/0320/content.html"
								break;
							case '0420':
								$scope.currentLanding = "LP/0420/content.html"
								break;
							case '0520':
								$scope.currentLanding = "LP/0520/content.html"
								break;
							default:
								$scope.currentLanding = "LP/0220/content.html"
								break;
							}

							$scope.data = "";

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
								return selected.length ? selected[0].content
										: $scope.selectedLanguage(0);

							};

							$scope.data = $scope.selectedLanguage($scope.LANG);
							
							
							for (var i = 0; i < $scope.data.bottomTable.rows.length; i++) {
								$scope.data.bottomTable.rows[i].fullstars = [];
								$scope.data.bottomTable.rows[i].halfstars = [];
								$scope.data.bottomTable.rows[i].emptystars = [];

								var stars = $scope.data.bottomTable.rows[i].stars;
								fulls = Math.floor(stars);
								for (var j = 0; j < fulls; j++) {
									$scope.data.bottomTable.rows[i].fullstars.push("*");
								}
								half = stars % 1;
								if (half != 0) {
									$scope.data.bottomTable.rows[i].halfstars.push("*");
								}
								empties = 5 - ($scope.data.bottomTable.rows[i].fullstars.length + $scope.data.bottomTable.rows[i].halfstars.length);
								for (var k = 0; k < empties; k++) {
									$scope.data.bottomTable.rows[i].emptystars.push("*");
								}
							}

							$scope.initPlayer = function() {
								var screen = $('#screen')[0];
								setTimeout(function() {
									screen.style.display = "block";
								}, 1500);

								setTimeout(function() {
									$scope.openCreateAccountDialog();
								}, 5000);
							}
							$scope.initPlayer2 = function() {
								$('.radial-progress').attr('data-progress', 0);
								var screen = $('#screen');
								screen.css('zIndex', 0)
								$scope.initPlayer();
								$scope.dataProgress= 0;
								$scope.numbers = 0;
								
								setTimeout(function() {
									window.randomize = function() {
										$scope.dataProgress = 100;
										$('.radial-progress').attr(
												'data-progress', 100);
									}
									window.randomize();
								}, 800);
								
								$scope.onTimeout = function() {
									if($scope.numbers < 100)
									$scope.numbers++;

									mytimeout = $timeout($scope.onTimeout, 150);
								}
								var mytimeout = $timeout($scope.onTimeout, 200);
							}

							$scope.openCreateAccountDialog = function() {
								var dialog = $('#CreateAccount')[0];
								var mask = $('#mask')[0];
								dialog.style.display = "table";
								setTimeout(function() {
									dialog.style.opacity = "1";
								}, 100);

								mask.style.display = "block";
								$('#email')[0].focus();
							}

							$scope.CreateAccountValidation = function(form) {
								var mask = $('#maskLoader')[0];
								mask.style.display = "block";

								var email = form.email;
								var psw = form.psw;

								var okEmail = false;
								var okPsw = false;

								$scope.pwsError = "";
								$scope.mailError = "";
								// not allow empty fields
								if (email === undefined || email == "") {
									$scope.mailError = "Please enter an email";
									$scope.wrongMail = true;
								} else if (!commonFunctions.validEmail(email)) {
									$scope.mailError += " Please enter a valid email";
									$scope.wrongMail = true;
								} else { // no email errors
									okEmail = true;
									$scope.wrongMail = false;
								}

								if (psw === undefined || psw == "") {
									$scope.pwsError = "Please enter a password";
									$scope.wrongPassword = true;

								} else if (!commonFunctions.validPassword(psw)) {
									$scope.pwsError = " Please type a valid password";
									$scope.wrongPassword = true;
								} else {
									okPsw = true;
									$scope.wrongPassword = false;
								}

								if (okEmail && okPsw) {
									$scope.pwsError = "";
									$scope.mailError = "";

									$scope.tracking(1);
									data = 'email=' + email + '&pw=' + psw
											+ '&pwConfirm=' + psw
											+ '&affiliate=' + $scope.AFF
											+ '&country=' + $scope.COUNTRY
											+ '&clickID=' + $scope.CLICKID;
									Api.RegisterService.post(data).$promise
											.then(
													function(response) {
														if (response.status == 15) {
															$scope.MAIL = email.value;
															PSW = psw.value;
															localStorage
																	.setItem(
																			'MAIL',
																			$scope.MAIL);
															localStorage
																	.setItem(
																			'CLICKID',
																			$scope.CLICKID);
															localStorage
																	.setItem(
																			'PSW',
																			PSW);
															openVerificationPage();
															$scope.tracking(2);
														} else {
															alert(response.message);
															mask.style.display = "none";
															if (response.status == 61
																	|| response.status == 62) {
																email.value = "";
																email.readOnly = true;
															} else {
																$scope
																		.tracking(8);
															}
														}
													},
													function(error) {
														alert(response.message);
														mask.style.display = "none";
													});
								} else {
									mask.style.display = "none";
								}
							};

							openVerificationPage = function() {
								$scope.confirmOnExit = false;
								if (location.hostname == "localhost") {
									url = '/starter/ver.html'
											+ window.location.search + '&user='
											+ $scope.MAIL + '&countryCode='
											+ $scope.COUNTRY;
								} else if (location.hostname == "www.muvflix.com") {
									url = 'https://ver.muvflix.com/ver.html'
											+ window.location.search + '&user='
											+ $scope.MAIL + '&countryCode='
											+ $scope.COUNTRY;
								} else {
									url = '/ver.html' + window.location.search
											+ '&user=' + $scope.MAIL
											+ '&countryCode=' + $scope.COUNTRY;
								}
								window.open(url, '_self', false)
								$scope.tracking(3);
							}

							$scope.tracking = function(place) {
								var data = 'affiliate=' + $scope.AFF
										+ '&place=' + place + '&cssTheme='
										+ $scope.CSS + '&languageId='
										+ $scope.LANG + '&email=' + email
										+ '&clickId=' + $scope.CLICKID;
								Api.TrackingService.post(data);
							}
						} ])