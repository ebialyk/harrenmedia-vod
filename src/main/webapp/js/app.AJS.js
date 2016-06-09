var app = angular.module('TabsApp', [ 'ngResource' ]);
app
		.factory(
				'Api',
				[
						'$resource',
						'$q',
						function($resource, $q) {

							function apiError(data) {
								var msg = 'Error accessing: ' + data.config.url
										+ '\nServer said: ' + data.status + ' '
										+ data.statusText;
								$q.reject(data);
								console.log(msg, data);
								alert('Error:' + '' + msg);
							}

							return {
								AffiliateService : $resource(
										'rest/affiliates/:affiliateId',
										{
											affiliateId : '@affiliateId'
										},
										{
											get : {
												method : 'GET',
												interceptor : {
													responseError : function(
															data) {
														apiError(data);
													}
												},
												isArray : true
											},
											put : {
												method : 'PUT',
												headers : {
													'Content-Type' : 'application/x-www-form-urlencoded'
												},
												interceptor : {
													responseError : function(
															data) {
														apiError(data);
													}
												},
												isArray : false
											},
											post : {
												method : 'POST',
												headers : {
													'Content-Type' : 'application/x-www-form-urlencoded'
												},
												interceptor : {
													responseError : function(
															data) {
														apiError(data);
													}
												},
												isArray : false
											},
											remove : {
												method : 'DELETE',
												interceptor : {
													responseError : function(
															data) {
														apiError(data);
													}
												},
												isArray : false
											}

										}),
								UserServices : $resource('rest/admin/getUsers',
										{}, {
											get : {
												method : 'GET',
												interceptor : {
													responseError : function(
															data) {
														apiError(data);
													}
												},
												isArray : true
											},
										}),
								LoggedInUserServices : $resource(
										'rest/admin/getLoggedInUsers', {}, {
											get : {
												method : 'GET',
												interceptor : {
													responseError : function(
															data) {
														apiError(data);
													}
												},
												isArray : true
											},
										}),
								ClickServices : $resource(
										'rest/admin/getClicks', {}, {
											get : {
												method : 'GET',
												interceptor : {
													responseError : function(
															data) {
														apiError(data);
													}
												},
												isArray : true
											},
										}),
								SupportRequestServices : $resource(
										'rest/admin/getSupportRequests', {}, {
											get : {
												method : 'GET',
												interceptor : {
													responseError : function(
															data) {
														apiError(data);
													}
												},
												isArray : true
											},
										}),
							}

						} ]);

app.controller('TabsCtrl', [
		'$scope',
		'$filter',
		'$http',
		'Api',
		function($scope, $filter, $http, Api) {

			$scope.tabs = [ {
				title : 'Affiliates',
				url : 'Affiliates.tpl.html'
			}, {
				title : 'Users',
				url : 'Users.tpl.html'
			}, {
				title : 'LoggedIn Users',
				url : 'LoggedIn_Users.tpl.html'
			}, {
				title : 'User Tracking',
				url : 'Clicks.tpl.html'
			} , {
				title : 'Support Requests',
				url : 'SupportRequest.tpl.html'
			} ];

			$scope.currentTab = 'Affiliates.tpl.html';

			$scope.onClickTab = function(tab) {
				$scope.currentTab = tab.url;
			}

			$scope.isActiveTab = function(tabUrl) {
				return tabUrl == $scope.currentTab;
			}
			$scope.affiliates = [];
			$scope.users = [];
			$scope.loggedInUsers = [];
			$scope.clicks = [];
			$scope.supportRequests = [];

			$scope.refreshAffiliates = function() {
				Api.AffiliateService.get().$promise.then(function(data) {
					$scope.affiliates = data;
				})
			}
			$scope.refreshUsers = function() {
				Api.UserServices.get().$promise.then(function(data) {
					$scope.users = data;
				})
			}
			$scope.refreshLIUsers = function() {
				Api.LoggedInUserServices.get().$promise.then(function(data) {
					$scope.loggedInUsers = data;
				})
			}
			$scope.refreshClicks = function() {
				Api.ClickServices.get().$promise.then(function(data) {
					$scope.clicks = data;
				})
			}
			$scope.refreshSupportRequests= function() {
				Api.SupportRequestServices.get().$promise.then(function(data) {
					$scope.supportRequests = data;
				})
			}

			$scope.showUser = function(userId) {
				var selected = [];
				if (userId) {
					selected = $filter('filter')($scope.users, {
						id : userId
					}, true);
				}

				return selected.length ? selected[0].userName + ' '
						+ selected[0].userEmail : 'לא נמצא';
			};
			$scope.refreshAffiliates();
			$scope.refreshUsers();
			$scope.refreshLIUsers();
			$scope.refreshClicks();
			$scope.refreshSupportRequests();
		} ]);
