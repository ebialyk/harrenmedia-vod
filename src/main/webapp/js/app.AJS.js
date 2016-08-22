var app = angular.module('TabsApp', [ 'ngResource', 'xeditable','datepicker' ]);
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
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					},
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
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					},
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
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					},
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
			PaymentServices : $resource('rest/agregator/sendPayment',	{}, {
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
					isArray : true
				},
			}),
			AgregarorService : $resource('rest/agregatorTable',{}, {
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
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					},
					interceptor : {
						responseError : function(data) {
							apiError(data);
						}
					},
					isArray : false
				}
			}),
			
			IPService : $resource('rest/allowedIP',{}, {
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
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					},
					interceptor : {
						responseError : function(data) {
							apiError(data);
						}
					},
					isArray : false
				}
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
			BillingServices : $resource('rest/billing/getAllUsersForBilling', {}, {
				post: {
					method : 'POST',
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
						},
					interceptor : {
						responseError : function(data) {
							apiError(data);
						}
					},
					isArray : true
				}
			}),
			DeclinedUserServices : $resource('rest/billing/getAllDeclinedUsers', {}, {
				get: {
					method : 'GET',
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
						},
					interceptor : {
						responseError : function(data) {
							apiError(data);
						}
					},
					isArray : true
				}
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
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					},
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
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					},
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

app.controller('PostBackController', ['$scope','$filter','$http','Api','$window',function($scope, $filter, $http, Api, $window) {
	$scope.postBacks = [];
	$scope.refreshPostBacks = function() {
		$scope.message = "Loading postbacks, please wait"
		Api.PostBackServices.get().$promise.then(function(data) {
			$scope.postBacks = data;
			
			if(data.length > 0) {
				$scope.message = "";
			} else {
				$scope.message = "No postbacks found";
			}
		})
	}
	$scope.refreshPostBacks();
} ]);

app.controller('BillingController', ['$scope','$filter','$http','Api','$window',function($scope, $filter, $http, Api, $window) {
	
	$scope.billings = [];
	$scope.currentDt = moment().format('DD.MM.YYYY');
    $scope.stDate = parseInt(moment().format('DD'));
    
	$scope.refreshBillings = function() {
		var data = '&date='+$scope.currentDt+'&day='+$scope.stDate;
		$scope.message = "loading billings..."
		Api.BillingServices.post(data).$promise.then(function(data) {
			for (var i = 0; i < data.length; i++) {
				lastBilling = 0;
				for (var j = 0; j < data[i].transactions.length; j++) {
					if(lastBilling < data[i].transactions[j].completionTimeStamp && 
							data[i].transactions[j].transactionType != 'authorization')
						lastBilling = data[i].transactions[j].completionTimeStamp;
						billingAmount = data[i].transactions[j].requestedAmount + " "+ data[i].transactions[j].requestedAmountCurrency
						

				}
				data[i].lastBilling = lastBilling;
				data[i].lastBillingAmount = billingAmount;
				$scope.billings.push(data[i]);
			}
			$scope.billings = data;
			
			if(data.length > 0) {
				$scope.message = "billing: registration date: "+$scope.currentDt +" pay day: "+ $scope.stDate;
			} else {
				$scope.message = "no billings found for the selected date";
			}
		})
	}
	 $("#currentDt").on("change", function() {
		 $scope.currentDt = $("#currentDt").val();
	    });
	$scope.startDates = [];
	
	for (var int = 0; int < 31; int++) {
		$scope.startDates.push(int+1);
	}
	$scope.sendPayment = function(t) {
		$scope.message = "Payment Sent, please Wait"
		var data = 'transactionId='+t.transactions[0].transactionId+'&countryId='+t.user.country.countryId+
		'&affiliateId='+t.user.affiliate.affiliateId+'&transactionType=purchase'
		
		return Api.PaymentServices.post(data).$promise.then(function(result) {
			alert('Done');
			
	    	$scope.refreshBillings();
	    }, function(error) {
		    alert('Error');
	    })   
	  };
	 
	  
	  
	$scope.refreshBillings();
}]);

app.controller('DeclinedUsersController', ['$scope','$filter','$http','Api','$window',function($scope, $filter, $http, Api, $window) {
	
	$scope.billings = [];
	$scope.dt = moment().format('DD.MM.YYYY');
    $scope.stDate = parseInt(moment().format('DD'));
    
	$scope.refreshBillings = function() {
		
		Api.DeclinedUserServices.get().$promise.then(function(data) {
			$scope.billings = data;
		})
	}
	$scope.startDates = [];
	
	$scope.sendPayment = function(t) {
		var data = 'transactionId='+t.transactions.transactionId+'&countryId='+t.user.country.countryId+
		'&affiliateId='+t.user.affiliate.affiliateId+'&transactionType=payment'
		
		return Api.PaymentServices.post(data).$promise.then(function(result) {
			alert('Done');
	    	$scope.refreshBillings();
	    }, function(error) {
		    alert('Error');
	    })   
	  };
	$scope.cancel = function(t) {
		deleteUser = $window.confirm('Are you sure you want to cancel the User Account?');
	    if(deleteUser){
	      $scope.cancelling = true;
	      $scope.cancelCause;
	      $scope.userToCancel = t;
	    }
	}
	
	$scope.sendCancel = function () {
		$scope.cancelling = false;
	    $scope.cancelCause = "";
	    $scope.userToCancel = "";
	}
	
	$scope.refreshBillings();
}]);

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
	
	 $scope.captureAuthorization = function(t) {
			$scope.message = "Capture Authorization Sent, please Wait"
			var data = 
				'transactionId='+t.transactionId+
				'&countryId='+t.country.countryId+
				'&affiliateId='+t.affiliate.affiliateId+
				'&amount='+t.requestedAmount+
				'&amountCurrency='+t.requestedAmountCurrency+
				'&transactionType=capture-authorization'
				
			return Api.PaymentServices.post(data).$promise.then(function(result) {
				alert('Done');
				
		    	$scope.refreshBillings();
		    }, function(error) {
			    alert('Error');
		    })   
		  };
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
	                        {"code":14,"dsc":"cancel account – cancellation rejected"},
	                        {"code":15,"dsc":"credit card error"},
	                        {"code":16,"dsc":"credit card approved"}];
	
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

app.controller('IPController', ['$scope','$filter','$http','Api',function($scope, $filter, $http, Api) {
	$scope.IPs = [];

	$scope.refreshIPs = function() {Api.IPService.get().$promise.then(function(data) {
		$scope.IPs = data;
		})
	}
	// new Affiliate
	$scope.addIP = function() {
		$scope.update = true;
	}
	$scope.saveIP = function(ip) {
		var data = 'ip='+ip.ip+'&name='+ip.name
		
	    return Api.IPService.post(data).$promise.then(function(result) {
	    	$scope.update = false;
	    	$scope.refreshIPs();
	    }, function(error) {
		    alert('ERROR');
	    })   
	  };
	  $scope.addIP = function(ip) {
			$scope.update = true;
			$scope.IpToUpdate = ip;
		}
	  $scope.updateIP = function(ip){
		  var data = 'id='+ip.id+'&ip='+ip.ip+'&name='+ip.name
	  }
	
	$scope.refreshIPs();
} ]);

app.controller('AgregatorsController', ['$scope','$filter','$http','Api',function($scope, $filter, $http, Api) {
	$scope.agregators = [];

	$scope.refreshAgregator = function() {Api.AgregarorService.get().$promise.then(function(data) {
		$scope.agregators = data;
		})
	}
	
	$scope.addAgregator = function() {
		$scope.update = true;
	}
	// new agregator
	$scope.saveAgregator = function(agregator) {
		var data = 'agregatorName='+agregator.name
		
	    return Api.AgregarorService.post(data).$promise.then(function(result) {
	    	$scope.refreshAgregator();
	    	$scope.update = false;
	    	 $scope.agregator = "";
	    }, function(error) {
		    alert('Error');
	    })   
	  };
	  $scope.cancel = function() {
		  $scope.update = false;
		  $scope.agregator = "";
	  }
	$scope.refreshAgregator();
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
// data = "supportRequestId"+support.
//			
// @FormParam("supportRequestId") String supportRequestId,
// @FormParam("status") String status
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
	} , {
		title : 'Billings ',
		url : 'Billing.tpl.html'
	}, {
		title : 'Declined Users ',
		url : 'DeclinedUsers.tpl.html'
	}, {
		title : 'Agregators ',
		url : 'Agregators.tpl.html'
	}, {
		title : 'Allowed IPs ',
		url : 'AllowedIPs.tpl.html'
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

