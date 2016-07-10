var app = angular.module('TabsApp', [ 'ngResource', 'xeditable' ]);
app.factory(
	'Api',['$http','$resource','$q',function($http, $resource, $q) {
		function apiError(data) {
			var msg = 'Error accessing: ' + data.config.url
					+ '\nServer said: ' + data.status + ' '
					+ data.statusText;
			$q.reject(data);
			console.log(msg, data);
			alert('Error:' + '' + msg);
		}
		return {
			AffiliateService : $resource('rest/affiliates/:affiliateId',	{affiliateId : '@affiliateId'},{
				get : {
					method : 'GET',
					interceptor : {
						responseError : function(data) {
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
						responseError : function(data) {
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
						responseError : function(data) {
							apiError(data);
						}
					},
					isArray : false
				},
				remove : {
					method : 'DELETE',
					interceptor : {
						responseError : function(data) {
							apiError(data);
						}
					},
					isArray : false
				}
			}),
			LanguageService : $resource('rest/languages/:langId',	{langId : '@langId'},{
				get : {
					method : 'GET',
					interceptor : {
						responseError : function(data) {
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
						responseError : function(data) {
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
						responseError : function(data) {
							apiError(data);
						}
					},
					isArray : false
				},
				remove : {
					method : 'DELETE',
					interceptor : {
						responseError : function(data) {
							apiError(data);
						}
					},
					isArray : false
				}
			}),
			CountryService : $resource('rest/countries/:countryId',	{countryId : '@countryId'},{
				get : {
					method : 'GET',
					interceptor : {
						responseError : function(data) {
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
						responseError : function(data) {
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
						responseError : function(data) {
							apiError(data);
						}
					},
					isArray : false
				},
				remove : {
					method : 'DELETE',
					interceptor : {
						responseError : function(data) {
							apiError(data);
						}
					},
					isArray : false
				}
			}),
			TransactionServices : $resource('rest/transactions',	{}, {
				get : {
					method : 'GET',
					interceptor : {
						responseError : function(data) {
							apiError(data);
						}
					},
					isArray : true
				},
			}),
			UserServices : $resource('rest/admin/getUsers',	{}, {
				get : {
					method : 'GET',
					interceptor : {
						responseError : function(data) {
							apiError(data);
						}
					},
					isArray : true
				},
			}),
			LoggedInUserServices : $resource('rest/admin/getLoggedInUsers', {}, {
				get : {
					method : 'GET',
					interceptor : {
						responseError : function(data) {
							apiError(data);
						}
					},
					isArray : true
				},
			}),
			InitCountryService : $resource('rest/admin/initCountries', {}, {
				post : {
					method : 'POST',
					interceptor : {
						responseError : function(data) {
							apiError(data);
						}
					},
					isArray : true
				},
			}),
			ClickServices : $resource('rest/admin/getClicks', {}, {
				get : {
					method : 'GET',
					interceptor : {
						responseError : function(data) {
							apiError(data);
						}
					},
					isArray : true
				},
			}),
			PostBackServices : $resource('rest/admin/getPostBacks', {}, {
				get : {
					method : 'GET',
					interceptor : {
						responseError : function(data) {
							apiError(data);
						}
					},
					isArray : true
				},
			}),
			SupportRequestServices : $resource('rest/support', {}, {
				get : {
					method : 'GET',
					interceptor : {
						responseError : function(data) {
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
						responseError : function(data) {
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
						responseError : function(data) {
							apiError(data);
						}
					},
					isArray : false
				},
				remove : {
					method : 'DELETE',
					interceptor : {
						responseError : function(data) {
							apiError(data);
						}
					},
					isArray : false
				}
			}),
		}

	} ]);

app.controller('PostBackController', ['$scope','$filter','$http','Api',function($scope, $filter, $http, Api) {
	$scope.postBacks = [];
	$scope.refreshPostBacks = function() {
		Api.PostBackServices.get().$promise.then(function(data) {
			$scope.postBacks = data;
		})
	}
	$scope.refreshPostBacks();
} ]);

app.controller('LoggedInController', ['$scope','$filter','$http','Api',function($scope, $filter, $http, Api) {
	$scope.loggedInUsers = [];

	$scope.refreshLIUsers = function() {Api.LoggedInUserServices.get().$promise.then(function(data) {
		$scope.loggedInUsers = data;
		})
	}
	
	$scope.refreshLIUsers();
} ]);

app.controller('UserController', ['$scope','$filter','$http','Api',function($scope, $filter, $http, Api) {
	$scope.users = [];

	$scope.refreshUsers = function() {Api.UserServices.get().$promise.then(function(data) {
		$scope.users = data;
		})
	}
	
	$scope.refreshUsers();
} ]);


app.controller('TransactionController', ['$scope','$filter','$http','Api',function($scope, $filter, $http, Api) {
	$scope.transactions = [];

	$scope.refreshTransactions = function() {Api.TransactionServices.get().$promise.then(function(data) {
		$scope.transactions = data;
		})
	}
	
	$scope.checkPayment = function(t){
		sendPayment(t);
	}
	$scope.refreshTransactions();
} ]);

app.controller('ClickController', ['$scope','$filter','$http','Api',function($scope, $filter, $http, Api) {
	$scope.clicks = [];

	$scope.trackingCodes = [
	                        {"code":99,"dsc":"open landing page"},
	                        {"code":1,"dsc":"create account -send mail"},
	                        {"code":2,"dsc":"account created -mail accepted"},
	                        {"code":3,"dsc":"verify account -send c.c"},
	                        {"code":4,"dsc":"account verified -accepted cc"},
	                        {"code":5,"dsc":"logged in"},
	                        {"code":6,"dsc":"cancel account requested"},
	                        {"code":7,"dsc":"cancel account – sent mail verification"},
	                        {"code":8,"dsc":"error on create account -mail not accepted"},
	                        {"code":9,"dsc":"account not verified"},
	                        {"code":10,"dsc":"cancel account: account verified"},
	                        {"code":11,"dsc":"cancel account: account not verified"},
	                        {"code":12,"dsc":"cancel account – sent cancellation form"},
	                        {"code":13,"dsc":"cancel account – cancellation received"},
	                        {"code":14,"dsc":"cancel account – cancellation rejected"}];
	
	$scope.showTrackingCodes = function(tracking) {
		var selected = [];
		if(tracking == 0) 
			tracking = 99
		if (tracking) {
			selected = $filter('filter')($scope.trackingCodes, {
				code : tracking
			}, true);
		}
		return selected.length ? selected[0].dsc : 'Not found';		
	};
	
	$scope.refreshClicks = function() {Api.ClickServices.get().$promise.then(function(data) {
		$scope.clicks = data;
		})
	}
	
	$scope.refreshClicks();

	
} ]);


app.controller('AffiliateController', ['$scope','$filter','$http','Api',function($scope, $filter, $http, Api) {
	$scope.affiliates = [];

	$scope.refreshAffiliates = function() {Api.AffiliateService.get().$promise.then(function(data) {
		$scope.affiliates = data;
		})
	}
	// new Affiliate
	$scope.saveAffiliate = function(aff) {
		var data = 'affName='+aff.name+'&country='+aff.country+
		'&language='+aff.language+'&postBack='+aff.postBack+'&postBackType='+aff.postBackType.text+
		'&css='+aff.css+'&price='+aff.price
		
	    return Api.AffiliateService.post(data).$promise.then(function(result) {
	    	$scope.refreshAffiliates();
	    }, function(error) {
		    alert('תקלה, רשומה לא נשמרה');
	    })   
	  };
	
	$scope.refreshAffiliates();
} ]);



app.controller('LanguagesController', ['$scope','$filter','$http','Api',function($scope, $filter, $http, Api) {
	$scope.languages = [];
	$scope.update = false;
	$scope.refreshLanguages = function() {
		Api.LanguageService.get().$promise.then(function(data) {
			$scope.languages = data;
		})
	}
	$scope.newLanguage = function() {$scope.update = true;}
	$scope.Cancel = function() {$scope.update = false;}
		// new Language
	$scope.addLanguage = function(lang) {
		var data = 'langName='+lang.name;
	    return Api.LanguageService.post(data).$promise.then(function(result) {
	    	$scope.update = false;
			$scope.lang = "";
			$scope.refreshLanguages();
	    }, function(error) {
		    alert('Error');
	    })   
	  };
	  $scope.refreshLanguages();
} ]);

app.controller('SupportController', ['$scope','$filter','$http','Api',function($scope, $filter, $http, Api) {
	$scope.supportRequests = [];
	$scope.supportCodes = [{"code":99,"dsc":"Cancel Account"},
	                       {"code":1,"dsc":"General"},
	                       {"code":2,"dsc":"Technical problems"},
	                       {"code":3,"dsc":"Join as affiliate"},
	                       {"code":4,"dsc":"Forget password"}];
	$scope.showSupportDsc = function(support) {
		var selected = [];
		if(support == 0) 
			support = 99
		if (support) {
			selected = $filter('filter')($scope.supportCodes, {
				code : support
			}, true);
		}
		return selected.length ? selected[0].dsc : 'Not found';		
	};
	
	$scope.refreshSupportRequests= function() {Api.SupportRequestServices.get().$promise.then(function(data) {
		$scope.supportRequests = data;
		})
	}
	
	$scope.updateStatus = function(support) {
//		data = "supportRequestId"+support.
//			
//			@FormParam("supportRequestId") String supportRequestId,
//			@FormParam("status") String status
	}
	$scope.refreshSupportRequests();

} ]);


app.controller('CountriesController', ['$scope','$filter','$http','Api',function($scope, $filter, $http, Api) {
	$scope.countries = [];
	$scope.update = false;
	$scope.languages = [];
	$scope.selectedCountry = [];
	
	$scope.refreshLanguages = function() {
		Api.LanguageService.get().$promise.then(function(data) {
			
			for (var i = 0; i < data.length; i++) {
				var selected = []
				if(data[i].languageId && $scope.selectedLanguages.languages.length !== 0 ){
					selected = $filter('filter')($scope.selectedLanguages.languages, {
						languageId : data[i].languageId
					}, true);
				}
				data.value = selected.length ? '1' : '0';	
				$scope.languages.push(data[i]);
			}
		})
	}

	$scope.refreshCountries = function() {
		$scope.countryMessage = "Searching countries... Please wait."
		Api.CountryService.get().$promise.then(function(data) {
			for (var i = 0; i < data.length; i++) {
				var langs = data[i].languages;
				var lang ="";
				for (var j = 0; j < langs.length; j++) {
					if(j>0){lang += ","} ;
					lang += langs[j].languageDsc;
				}
				data[i].langs = lang
			}
			$scope.countries = data;
			
			if (data.length > 0) {
				$scope.countryMessage = "";
			} else {
				$scope.countryMessage = "No Records Found";
			}
			})
	}
	$scope.initCountries = function() {
		Api.InitCountryService.post().$promise.then(function() {
			$scope.refreshCountries();
		});
	}
	$scope.newCountry = function() {
		$scope.update = true;
		$scope.refreshLanguages();	
	}
	$scope.Cancel = function() {
		$scope.update = false;
		$scope.selectedLanguages.languages = [];
		}
	
	// new Country
	$scope.selectedLanguages = {languages: [] };
	$scope.checkMe = function(lang,index) {
		if(lang.value=="1") {
			$scope.selectedLanguages.languages.push(lang);
		} else {
			$scope.selectedLanguages.languages.splice(index, 1);
		}
	} 
	$scope.addCountry = function(country) {
		var langs = $scope.selectedLanguages.languages;
		var languages ="";
		for (var i = 0; i < langs.length; i++) {
			languages += langs[i].languageId + ",";
		}
		var data = 'countryName='+country.name+'&countryCode='+country.code+
			'&allowed='+country.allowed+'&languages='+languages+'&amount='+country.amount+'&currency='+country.currency;
	    return Api.CountryService.post(data).$promise.then(function(result) {
	    	$scope.update = false;
			$scope.country = "";
			$scope.selectedLanguages.languages = [];
			$scope.refreshCountries();
	    }, function(error) {
		    alert('Error');
	    })   
	};
	$scope.upd = function(country) {
		$scope.update = true;
		$scope.selectedCountry.name = country.country.countryName;
		$scope.selectedCountry.allowed = country.country.allowed ? '1':'0';
		$scope.selectedCountry.code = country.country.countryCode;
		$scope.selectedCountry.amount = country.country.amount;
		$scope.selectedCountry.currency = country.country.currency;
		$scope.selectedCountry.countryId = country.country.countryId;
			
		$scope.selectedLanguages.languages =  country.languages;
		$scope.refreshLanguages();
			
		}
	
	$scope.del = function(index,country) {
		return Api.CountryService.delete(data).$promise.then(function(result) {
	    	$scope.update = false;
			$scope.country = "";
			$scope.refreshCountries();
	    }, function(error) {
		    alert('Error');
	    })   
		$scope.countries.splice(index, 1);
	}
	$scope.refreshCountries();
	
} ]);

app.controller('TabsCtrl', ['$scope','$filter','$http','Api',function($scope, $filter, $http, Api) {
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
	}, {
		title : 'Languages ',
		url : 'Languages.tpl.html'
	}, {
		title : 'Countries ',
		url : 'Countries.tpl.html'
	} , {
		title : 'PostBack Tracking ',
		url : 'PostBackTracking.tpl.html'
	} , {
		title : 'Transactions ',
		url : 'Transactions.tpl.html'
	}
	
	];
	$scope.currentTab = 'Affiliates.tpl.html';
	$scope.onClickTab = function(tab) {
		$scope.currentTab = tab.url;
	}
	$scope.isActiveTab = function(tabUrl) {
		return tabUrl == $scope.currentTab;
	}
	
	$scope.userStatus = [{"code":99,"dsc":"Not Active"},
	                     {"code":1,"dsc":"Approved by CC"},
	                     {"code":2,"dsc":"Declined by CC"},
	                     {"code":3,"dsc":"Billed"},
	                     {"code":4,"dsc":"Cancelled"}]
	$scope.postBackTypes = [
		        	    {value: 1, text: 'POST'},
		        	    {value: 2, text: 'GET'},
		        	  ]; 
	$scope.showUserStatus = function(status) {
		var selected = [];
		if(status == 0) 
			status = 99
		if (status) {
			selected = $filter('filter')($scope.userStatus, {
				code : status
			}, true);
		}
		return selected.length ? selected[0].dsc : 'Not found';		
	};
	
	
	$scope.showUser = function(userId) {
		var selected = [];
		if (userId) {
			selected = $filter('filter')($scope.users, {
				id : userId
			}, true);
		}
		return selected.length ? selected[0].userName + ' '+ selected[0].userEmail : 'לא נמצא';		
	};
		
} ]);

