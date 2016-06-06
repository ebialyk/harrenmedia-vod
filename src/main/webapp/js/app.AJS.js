var app =angular.module('TabsApp', ["xeditable", "ngMockE2E"]);
app.controller('TabsCtrl', ['$scope','$filter', '$http', function ($scope, $filter, $http) {
    $scope.tabs = [{
            title: 'Affiliates',
            url: 'Affiliates.tpl.html'
        }, {
            title: 'Users',
            url: 'Users.tpl.html'
        }, {
            title: 'LoggedIn Users',
            url: 'LoggedIn_Users.tpl.html'
        }, {
            title: 'Clicks',
            url: 'Clicks.tpl.html'
    }];

    $scope.currentTab = 'Affiliates.tpl.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
        if(tab.title == 'Affiliates') {
        	$scope.loadAffiliates();
        }
    }
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
    
    $scope.affiliates = [];
    
    $scope.loadAffiliates = function() {
   	 return $scope.affiliates.lenght ? null : $http.post('/rest/admin/getAffiliates').success(function(data) {
   		 $scope.affiliates = data;
   	 })
    }

}]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});

app.controller('Ctrl', function($scope, $filter, $http) {
 $scope.users = [
    {id: 1, name: 'awesome user1', status: 2, group: 4, groupName: 'admin'},
    {id: 2, name: 'awesome user2', status: undefined, group: 3, groupName: 'vip'},
    {id: 3, name: 'awesome user3', status: 2, group: null}
  ]; 
 
 $scope.affiliates = [];
 
 $scope.loadAffiliates = function() {
	 return $scope.affiliates.lenght ? null : $http.post('/rest/admin/getAffiliates').success(function(data) {
		 $scope.affiliates = data;
	 })
 }

  
 
  
  
  
  $scope.groups = [];
  $scope.loadGroups = function() {
    return $scope.groups.length ? null : $http.get('/groups').success(function(data) {
      $scope.groups = data;
    });
  };

  $scope.showGroup = function(user) {
    if(user.group && $scope.groups.length) {
      var selected = $filter('filter')($scope.groups, {id: user.group});
      return selected.length ? selected[0].text : 'Not set';
    } else {
      return user.groupName || 'Not set';
    }
  };

  $scope.showStatus = function(user) {
    var selected = [];
    if(user.status) {
      selected = $filter('filter')($scope.statuses, {value: user.status});
    }
    return selected.length ? selected[0].text : 'Not set';
  };

  $scope.checkName = function(data, id) {
    if (id === 2 && data !== 'awesome') {
      return "Username 2 should be `awesome`";
    }
  };

  $scope.saveUser = function(data, id) {
    //$scope.user not updated yet
    angular.extend(data, {id: id});
    return $http.post('/saveUser', data);
  };

  // remove user
  $scope.removeUser = function(index) {
    $scope.users.splice(index, 1);
  };

  // add user
  $scope.addUser = function() {
    $scope.inserted = {
      id: $scope.users.length+1,
      name: '',
      status: null,
      group: null 
    };
    $scope.users.push($scope.inserted);
  };
});

// --------------- mock $http requests ----------------------
app.run(function($httpBackend) {
  $httpBackend.whenGET('/groups').respond([
    {id: 1, text: 'user'},
    {id: 2, text: 'customer'},
    {id: 3, text: 'vip'},
    {id: 4, text: 'admin'}
  ]);
    
  $httpBackend.whenPOST(/\/saveUser/).respond(function(method, url, data) {
    data = angular.fromJson(data);
    return [200, {status: 'ok'}];
  });
});