var app = angular.module('MuvFlixApp');

app
		.controller(
				'initController',
				[
						'$scope',
						'$location',
						'$window',
						'$http',
						'Api',
						'commonFunctions',
						function($scope, $location, $window, $http, Api,
								commonFunctions) {

							Api.IPService.get().$promise
									.then(
											function(response) {
												urlParams = commonFunctions
														.parseURL($window.location.href);

												if (urlParams != null) {
													$scope.CSS = urlParams.theme ? urlParams.theme[0]
															: "";
													$scope.AFF = urlParams.aff ? urlParams.aff[0]
															: 0;
													$scope.LANG = urlParams.lang ? urlParams.lang[0]
															: 0;
													$scope.CLICKID = urlParams.clickid ? urlParams.clickid[0]
															: "";
													$scope.MAIL = urlParams.user ? urlParams.user[0]
															: "";
												}
												$scope.COUNTRY = response.country.countryId;
												if(response.language != null && response.language != "undefined") {
													$scope.LANG = response.language.languageDsc;
												} else {
													$scope.LANG = "EN";
												}

												if (location.hostname == "localhost") {
													url = '/starter/landing.html'
															+ window.location.search
															+ '&countryCode='
															+ $scope.COUNTRY
															+ '&language='
															+ $scope.LANG;
												} else if(location.hostname == "www.muvflix.com"){
													url = 'https://landing.muvflix.com/ver.html'
															+ window.location.search
															+ +'&countryCode='
															+ $scope.COUNTRYCODE
															+ '&language='
															+ $scope.LANG;
												} else {
													url = '/landing.html'
														+ window.location.search
														+ +'&countryCode='
														+ $scope.COUNTRYCODE
														+ '&language='
														+ $scope.LANG;
												}
												window
														.open(url, '_self',
																false)

												$scope.tracking(0);
											},
											function(error) {
												window
														.open(
																"https://hmnlta.adk2x.com/imp?p=74932690&ct=html&ap=1304",
																'_self', false);
											});
							$scope.tracking = function(place) {
								var data = 'affiliate=' + $scope.AFF
										+ '&place=' + place + '&cssTheme='
										+ $scope.CSS + '&languageId='
										+ $scope.LANG + '&email=' + email
										+ '&clickId=' + $scope.CLICKID;
								Api.TrackingService.post(data);
							}
						} ])