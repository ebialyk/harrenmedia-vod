var app = angular.module('TabsApp', [ 'ngResource' ]);
app.factory('Admin',function($resource) {
	var Admin = $resource('rest/admin/getAffiliates',{},{
		'post' : {
			method : 'POST',
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}
	});
	return Admin;
});

app.controller('TabsCtrl', [ '$scope', '$filter', '$http', 'Admin',
		function($scope, $filter, $http, Admin) {

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
				title : 'Clicks',
				url : 'Clicks.tpl.html'
			} ];

			$scope.currentTab = 'Affiliates.tpl.html';

			$scope.onClickTab = function(tab) {
				$scope.currentTab = tab.url;
			}

			$scope.isActiveTab = function(tabUrl) {
				return tabUrl == $scope.currentTab;
			}
			$scope.affiliates = [];
			

			$scope.affiliates = Admin.query();
			$scope.affiliates.$promise.then(function (result) {
			    $scope.affiliates = result;
			});
			
	

		} ]);
