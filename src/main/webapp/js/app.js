App = Ember.Application.create({
	ready : function() {
		console.log('App ready');
		this.register('session:current', App.Session, {
			singleton : true
		});
		this.inject('controller', 'session', 'session:current');
	},
	LOG_TRANSITIONS : true,
	LOG_BINDINGS : true,
	LOG_VIEW_LOOKUPS : true,
	LOG_STACKTRACE_ON_DEPRECATION : true,
	LOG_VERSION : true,
	debugMode : true
});

App.Router.map(function() {
	this.resource('contactus');
	this.resource('contact');
	this.resource('about');
	this.resource('login');
	this.resource('register');
	this.resource('registersuccess');
	this.resource('activateaccount');
	this.resource('forgetpw');
	this.resource('forgetpwemailsent');
	this.resource('resetpw');
	this.resource('resetpwsuccess');
	this.resource('support');
	this.resource('dashboard', function() {
		this.resource('videouploadplacement');
		this.resource('videoplacement');
		this.resource('placement');
		this.resource('reports');
		this.resource('chart');
		this.resource('revenue');
	});
})

// Objects
App.Session = Ember.Object.extend({
	sessionHash : '',
	isloggedin : false

});

App.Country = Ember.Object.extend({
	id : null,
	name : null
});

App.selectedCountryController = Ember.Object.create({
	country : null
});

// Routesthis.set('isExpanded', true);
App.ApplicationRoute = Ember.Route.extend({
	beforeModel : function() {
		this.controllerFor('application').session.set('isloggedin', false);

		/*
		 * if(this.controllerFor('login').get('token') == 'null'){
		 * this.controllerFor('application').session.set('isloggedin', false);
		 * }else{ this.controllerFor('application').session.set('isloggedin',
		 * true); }
		 */

	}
});

App.LoginRoute = Ember.Route.extend({
/*
 * renderTemplate : function() { this.render('login'); }
 */
});

App.DashboardRoute = Ember.Route.extend({
	beforeModel : function() {
		var token = this.controllerFor('login').get('token');
		var self = this;
		$.ajax({
			type : "GET",
			url : 'rest/client/auth?token=' + token,
			dataType : 'json',
			async : false,
			data : {},
			success : function(response) {
				if (response.status === 1) {
					self.controllerFor('application').session.set('isloggedin',
							true);
					self.transitionTo('chart');
					
				} else {
					alert('Something went wrong');
				}
			},
			error : function(response, status, error) {
				self.controllerFor('application').session.set('isloggedin',
						false);
				self.controllerFor('login').set('token', null);
				alert('You must log in!');
				self.transitionTo('login');
			}
		});
		
	}/*,
	events : {
		error : function(reason, transition) {
			if (reason.status === 401) {
				this.controllerFor('application').session.set('isloggedin',
						false);
				this.controllerFor('login').set('token', null);
				alert('You must log in!');
				this.transitionTo('login');
			} else if(reason.status === 200){
				this.transitionTo('chart');
			} else {
				alert('Something went wrong');
			}
		},
		ok : function(reason, transition) {
			alert("fdjksljfaskl");
		}
	}*/
});

// Controllers
App.ApplicationController = Ember.Controller.extend({
	logOut : function() {
		var self = this;
		this.set('oper', 'del');
		data = this.getProperties('oper');
		Ember.$.post('rest/client/deleteSession', data).then(
				function(response) {
					self.set('errorMessage', response.body);
					if (response.statusCode === 'OK') {
						self.session.set('isloggedin', false);
						self.controllerFor('login').set('token', null);
						self.controllerFor('login').reset();
						self.controllerFor('login').loginapp();
						self.transitionToRoute('login');
					} else {
						alert('Something went wrong');
					}
				});
	},

	actions : {
		contactus : function() {
			this.transitionToRoute('contactus');
		},

		support : function() {
			this.transitionToRoute('support');
		}
	},
	
});

App.DashboardController = Ember.Controller.extend({
	movetohome : function() {
		var self = this;
		self.controllerFor('application').session.set('isloggedin', false);
		self.controllerFor('login').set('token', null);
		self.transitionToRoute('index');
	},

});

App.RegisterController = Ember.Controller
		.extend({
			errorMessage : null,

			register : function() {
				var self = this;
				var selectedCountry = App.selectedCountryController
						.get('country');
				this.set('country', selectedCountry.name);
				this.set('countryCode', selectedCountry.id);

				var data = this.getProperties('fName', 'lName', 'email',
						'password', 'phone', 'confirmPw', 'country',
						'countryCode');
				if (data.fName === undefined || data.fName == "") {
					self.set('errorMessage', "please type your first name");
				} else if (data.lName === undefined || data.fName == "") {
					self.set('errorMessage', "please type your surname name");
				} else if (data.email === undefined || data.email == "") {
					self.set('errorMessage', "please type your email");
				} else if (data.password === undefined || data.password == "") {
					self.set('errorMessage', "please type your password");
				} else if (!(data.password === data.confirmPw)) {
					self
							.set('errorMessage',
									"password and confirm password are not the same, please type again");
				} else if ('Country' === data.countryCode) {
					self.set('errorMessage', "please choose country");
				} else if (data.phone === undefined || data.phone == "") {
					self.set('errorMessage', "please type your phone number");
				} else {
					// Clear out any error messages.
					this.set('errorMessage', null);

					$.ajax({
						type : "POST",
						url : "rest/client/register",
						dataType : 'json',
						async : false,
						data : data,
						success : function(response) {
							if (response.status === 15) {/* register success */
								self.controllerFor('registersuccess').message(
										response.message);
								self.transitionTo('registersuccess');
							} else if (response.status === 16) {/*
																 * email already
																 * exists
																 */
								self.set('errorMessage', response.message);
							}
						},
						error : function(response, status, error) {
							self.set('errorMessage',
									"Something went wrong, please try later");
						}
					});
				}
			}

		});

App.RegistersuccessController = Ember.Controller.extend({
	activationEmailSent : null,
	message : function(msg) {
		this.set('activationEmailSent', msg);
	}
});

App.ForgetpwemailsentController = Ember.Controller.extend({
	emailSentSuccess : null,
	forgetPWError : null,
	success : function(msg) {
		this.set('emailSentSuccess', msg);
	},
	error : function(msg) {
		this.set('forgetPWError', msg);
	}
});

App.ActivateaccountController = Ember.ArrayController.extend({
	queryParams : [ 'id', 'token' ],
	id : null,
	token : null,
	status : null,
	success : null,
	error : null,
	isActive : function() {
		var self = this;
		var data = this.getProperties('id', 'token');
		if ((data.id === undefined || data.id == "")
				|| (data.token === undefined || data.token == "")) {
			return false;
		} else {
			$.ajax({
				type : "POST",
				url : "rest/client/activateAccount",
				dataType : 'json',
				async : false,
				data : data,
				success : function(response) {
					if (response.status === 17) {
						self.set('success', response.message);
						self.set('status', true);
					} else if (response.status === 18) {
						self.set('error', response.message);
						self.set('status', false);
					}
				},
				error : function(response, status, error) {
					self.error("Something went wrong, please try again later");
				}
			});
			return this.get('status');
		}

	}.property('userid', 'token')
});

App.ResetpwController = Ember.ArrayController.extend({
	queryParams : [ 'id', 'token' ],
	id : null,
	token : null,
	status : null,
	statusToken : null,
	success : null,
	errorTokenValidation : null,
	errorUpdatePassword : null,
	isTokenValid : function() {
		var self = this;
		var data = this.getProperties('id', 'token');
		if ((data.id === undefined || data.id == "")
				|| (data.token === undefined || data.token == "")) {
			return false;
		} else {
			$.ajax({
				type : "POST",
				url : "rest/client/validateTokenResetPw",
				dataType : 'json',
				async : false,
				data : data,
				success : function(response) {
					if (response.status === 22) {
						self.set('success', response.message);
						self.set('statusToken', true);
					} else if (response.status === 21) {
						self.set('errorTokenValidation', response.message);
						self.set('statusToken', false);
					}
				},
				error : function(response, status, error) {
					self.set('errorTokenValidation',
							"Something went wrong, please try again later");
				}
			});
		}

	}.property('userid', 'token'),

	updatePW : function() {
		errorTokenValidation = null;
		var self = this;
		var data = this.getProperties('pw', 'cpw', 'id', 'token');
		if ((data.pw === undefined || data.pw == "")) {
			return;
		} else if (data.pw != data.cpw) {
			self.set('errorUpdatePassword',
					"Password confirmation failed, please try again");
		} else {
			if (data.pw.length < 6) {
				self.set('errorUpdatePassword',
						"Password length should be bigger then 5 characters");
				return;
			}
			self.set('errorUpdatePassword', null);
			$.ajax({
				type : "POST",
				url : "rest/client/updatePw",
				dataType : 'json',
				async : false,
				data : data,
				success : function(response) {
					if (response.status === 20) {
						self.set('success', response.message);
						self.set('status', true);
						self.controllerFor('resetpwsuccess').message(
								response.message);
						self.transitionTo('resetpwsuccess');
					} else if (response.status === 19) {
						self.set('errorUpdatePassword', response.message);
						self.set('status', false);
					}
				},
				error : function(response, status, error) {
					self.set('errorUpdatePassword',
							"Something went wrong, please try again later");
				}
			});
			return this.get('status');
		}

	}
});

App.ResetpwsuccessController = Ember.Controller.extend({
	updatePwSuccessfully : null,
	message : function(msg) {
		this.set('updatePwSuccessfully', msg);
	}
});

App.ForgetpwController = Ember.Controller.extend({
	resetPW : function() {
		var self = this;
		var data = this.getProperties('email');

		if (data.email === undefined || data.email == "") {
			self.set('forgetPWError', "invalid email");
		} else {
			// Clear out any error messages.
			this.set('forgetPWError', null);

			$.ajax({
				type : "POST",
				url : "rest/client/forgetPW",
				dataType : 'json',
				async : false,
				data : data,
				success : function(response) {
					if (response.status === 12) {
						self.controllerFor('forgetpwemailsent').success(
								response.message);
						self.transitionTo('forgetpwemailsent');
					} else if (response.status === 11) {// email not found
						self.set('forgetPWError', response.message);
					}

				},
				error : function(response, status, error) {
					self.set('forgetPWError', "invalid email");
				}
			});
		}
	}

});

App.LoginController = Ember.Controller.extend({

	savedTransition : null,

	token : localStorage.token,
	tokenChanged : function() {
		localStorage.token = this.get('token');
	}.observes('token'),

	forgetpw : function() {
		var self = this;
		self.transitionToRoute('forgetpw');
	},

	loginapp : function() {
		this.setProperties({
			savedTransition : null,
		});
	},

	reset : function() {
		this.setProperties({
			username : "",
			password : "",
			errorMessage : ""
		});
		this.set('token', null);
	},

	login : function() {
		var self = this;
		var data = '{}';
		var param = this.getProperties('username', 'password');

		if (param.password === undefined || param.username === undefined
				|| param.password == "" || param.username == "") {
			self.set('errorMessage', "invalid username/password");
		} else {
			// Clear out any error messages.
			this.set('errorMessage', null);

			$.ajax({
				type : "POST",
				url : "rest/client/login",
				dataType : 'json',
				async : false,
				headers : {
					"Authorization" : "Basic "
							+ btoa(param.username + ":" + param.password)
				},
				data : '{}',
				success : function(response) {
					if (response.status === 1) {
						// Save the token and transition to where originally
						// intended.
						// self.set('token', response.token);
						self.session.set('isloggedin', true);
						self.set('token', response.message);
						self.transitionToRoute('dashboard');
					} else {
						self.set('errorMessage', response.message);
					}
				},
				error : function(response, status, error) {
					alert(request.responseText);
					self.set('errorMessage', response.body);
				}
			});
		}
	}
});

/*// views
App.RemoveHeader = Ember.View.extend({
	didInsertElement : function() {
		this._super();
		Ember.run.scheduleOnce('afterRender', this, this.didRenderElement);
		Ember.run.next(function() {

			this.$("#headerSecTohideshow").hide();

		});
	}
});

App.ShowHeader = Ember.View.extend({
	didInsertElement : function() {
		this._super();
		Ember.run.scheduleOnce('afterRender', this, this.didRenderElement);
		Ember.run.next(function() {

			this.$("#headerSecTohideshow").show();

		});
	}
});
*/
App.MyChart = Ember.View
		.extend({
			didInsertElement : function() {
				this._super();
				Ember.run.scheduleOnce('afterRender', this,
						this.didRenderElement);
			},
			didRenderElement : function() {
				this
						.$()
						.html(
								'<div class="centerchart"><div id="chart_div" style="width: 970px; height: 500px;"></div></div>');
				myChartTableCallback();
			}
		});

App.DisplayPlacementTable = Ember.View
		.extend({
			didInsertElement : function() {
				this._super();
				Ember.run.scheduleOnce('afterRender', this,
						this.didRenderElement);
			},
			didRenderElement : function() {
				this
						.$()
						.html(
								'<div id="gridWrapper"><table id="list2"></table><div id="gridPager" ></div></div>');
				myPlacementTableCallback();
			}
		});

App.VideoPlacementTable = Ember.View
.extend({
	didInsertElement : function() {
		this._super();
		Ember.run.scheduleOnce('afterRender', this,
				this.didRenderElement);
	},
	didRenderElement : function() {
		this
				.$()
				.html(
						'<div id="gridWrapper"><table id="list5"></table><div id="gridPager" ></div></div>');
		myVideoPlacementTableCallback();
	}
});

App.VideoPlacementNoFileTable = Ember.View
.extend({
	didInsertElement : function() {
		this._super();
		Ember.run.scheduleOnce('afterRender', this,
				this.didRenderElement);
	},
	didRenderElement : function() {
		this
				.$()
				.html(
						'<div id="gridWrapper"><table id="list6"></table><div id="gridPager" ></div></div>');
		myVideoPlacementNoFileTableCallback();
	}
});

/*App.UploadView = Ember.View.extend({
	templateName: 'imageupload',
	dragEnter : function(event) {
		event.preventDefault();
		this.$('p:first').remove();
	},
	dragOver : function(event) {
		event.preventDefault();
	},
	drop : function(event) {
		 event.preventDefault();
		    var files = event.dataTransfer.files;
		    var formData = new FormData();
		    for (var i = 0; i < files.length; i++) {
		      formData.append('file', files[i]);
		    }
		    xhr = new XMLHttpRequest();
		    xhr.open('POST', 'rest/client/uploadFile');
		    xhr.upload.onprogress = function (event) {
		      if (event.lengthComputable) {
		        var complete = (event.loaded / event.total * 100 | 0);
		        this.$('progress').value = complete;
		      }
		    }
		    xhr.onload = function() {
		      App.File.store.push('file', {
		        id: 1,
		        name: 'Name'
		      });
		    }
		    xhr.send(formData);
	}
})*/

App.MyReportTable = Ember.View
		.extend({
			didInsertElement : function() {

				this._super();
				Ember.run.scheduleOnce('afterRender', this,
						this.didRenderElement);
			},
			didRenderElement : function() {
				this
						.$()
						.html(
								'<div id="gridWrapper"><input type="text" id="from_d" class="from_date" placeholder="Select start date" contenteditable="false"><input type="text" id="to_d" class="to_date" placeholder="Select end date" contenteditable="false"><div id="rangeButton"><button type="button" onclick="datePickerSubmitButton()">Submit</button></div><table id="list2"></table><div id="gridPager" ></div>');

				myReportTableCallback();
			}
		});

App.CountryController = Ember.ArrayController.create({
	content : [ App.Country.create({
		id : "Country",
		name : '--Select country--'
	}), App.Country.create({
		id : "AF",
		name : 'Afghanistan'
	}), App.Country.create({
		id : "AX",
		name : 'Åland Islands'
	}), App.Country.create({
		id : "AL",
		name : 'Albania'
	}), App.Country.create({
		id : "DZ",
		name : 'Algeria'
	}), App.Country.create({
		id : "AS",
		name : 'American Samoa'
	}), App.Country.create({
		id : "AD",
		name : 'Andorra'
	}), App.Country.create({
		id : "AO",
		name : 'Angola'
	}), App.Country.create({
		id : "AI",
		name : 'Anguilla'
	}), App.Country.create({
		id : "AQ",
		name : 'Antarctica'
	}), App.Country.create({
		id : "AG",
		name : 'Antigua and Barbuda'
	}), App.Country.create({
		id : "AR",
		name : 'Argentina'
	}), App.Country.create({
		id : "AM",
		name : 'Armenia'
	}), App.Country.create({
		id : "AW",
		name : 'Aruba'
	}), App.Country.create({
		id : "AU",
		name : 'Australia'
	}), App.Country.create({
		id : "AT",
		name : 'Austria'
	}), App.Country.create({
		id : "AZ",
		name : 'Azerbaijan'
	}), App.Country.create({
		id : "BS",
		name : 'Bahamas'
	}), App.Country.create({
		id : "BH",
		name : 'Bahrain'
	}), App.Country.create({
		id : "BD",
		name : 'Bangladesh'
	}), App.Country.create({
		id : "BB",
		name : 'Barbados'
	}), App.Country.create({
		id : "BY",
		name : 'Belarus'
	}), App.Country.create({
		id : "BE",
		name : 'Belgium'
	}), App.Country.create({
		id : "BZ",
		name : 'Belize'
	}), App.Country.create({
		id : "BJ",
		name : 'Benin'
	}), App.Country.create({
		id : "BM",
		name : 'Bermuda'
	}), App.Country.create({
		id : "BT",
		name : 'Bhutan'
	}), App.Country.create({
		id : "BO",
		name : 'Bolivia, Plurinational State of'
	}), App.Country.create({
		id : "BQ",
		name : 'Bonaire, Sint Eustatius and Saba'
	}), App.Country.create({
		id : "BA",
		name : 'Bosnia and Herzegovina'
	}), App.Country.create({
		id : "BW",
		name : 'Botswana'
	}), App.Country.create({
		id : "BV",
		name : 'Bouvet Island'
	}), App.Country.create({
		id : "BR",
		name : 'Brazil'
	}), App.Country.create({
		id : "IO",
		name : 'British Indian Ocean Territory'
	}), App.Country.create({
		id : "BN",
		name : 'Brunei Darussalam'
	}), App.Country.create({
		id : "BG",
		name : 'Bulgaria'
	}), App.Country.create({
		id : "BI",
		name : 'Burkina'
	}), App.Country.create({
		id : "KH",
		name : 'Cambodia'
	}), App.Country.create({
		id : "CM",
		name : 'Cameroon'
	}), App.Country.create({
		id : "CA",
		name : 'Canada'
	}), App.Country.create({
		id : "CV",
		name : 'Cape Verde'
	}), App.Country.create({
		id : "KY",
		name : 'Cayman Islands'
	}), App.Country.create({
		id : "CF",
		name : 'Central African Republic'
	}), App.Country.create({
		id : "TD",
		name : 'Chad'
	}), App.Country.create({
		id : "CL",
		name : 'Chile'
	}), App.Country.create({
		id : "CN",
		name : 'China'
	}), App.Country.create({
		id : "CX",
		name : 'Christmas Island'
	}), App.Country.create({
		id : "CC",
		name : 'Cocos (Keeling) Islands'
	}), App.Country.create({
		id : "CO",
		name : 'Colombia'
	}), App.Country.create({
		id : "KM",
		name : 'Comoros'
	}), App.Country.create({
		id : "CG",
		name : 'Congo'
	}), App.Country.create({
		id : "CD",
		name : 'Congo, the Democratic Republic of the'
	}), App.Country.create({
		id : "CK",
		name : 'Cook Islands'
	}), App.Country.create({
		id : "CR",
		name : 'Costa Rica'
	}), App.Country.create({
		id : "CI",
		name : 'Côte d&rsquo;Ivoire'
	}), App.Country.create({
		id : "HR",
		name : 'Croatia'
	}), App.Country.create({
		id : "CU",
		name : 'Cuba'
	}), App.Country.create({
		id : "CW",
		name : 'Curaçao'
	}), App.Country.create({
		id : "CY",
		name : 'Cyprus'
	}), App.Country.create({
		id : "CZ",
		name : 'Czech'
	}), App.Country.create({
		id : "DK",
		name : 'Denmark'
	}), App.Country.create({
		id : "DJ",
		name : 'Djibouti'
	}), App.Country.create({
		id : "DM",
		name : 'Dominica'
	}), App.Country.create({
		id : "DO",
		name : 'Dominican Republic'
	}), App.Country.create({
		id : "EC",
		name : 'Ecuador'
	}), App.Country.create({
		id : "EG",
		name : 'Egypt'
	}), App.Country.create({
		id : "SV",
		name : 'El Salvador'
	}), App.Country.create({
		id : "GQ",
		name : 'Equatorial Guinea'
	}), App.Country.create({
		id : "ER",
		name : 'Eritrea'
	}), App.Country.create({
		id : "EE",
		name : 'Estonia'
	}), App.Country.create({
		id : "ET",
		name : 'Ethiopia'
	}), App.Country.create({
		id : "FK",
		name : 'Falkland Islands (Malvinas)'
	}), App.Country.create({
		id : "FO",
		name : 'Faroe Islands'
	}), App.Country.create({
		id : "FJ",
		name : 'Fiji'
	}), App.Country.create({
		id : "FI",
		name : 'Finland'
	}), App.Country.create({
		id : "FR",
		name : 'France'
	}), App.Country.create({
		id : "GF",
		name : 'French Guiana'
	}), App.Country.create({
		id : "PF",
		name : 'French Polynesia'
	}), App.Country.create({
		id : "TF",
		name : 'French Southern Territories'
	}), App.Country.create({
		id : "GA",
		name : 'Gabon'
	}), App.Country.create({
		id : "GM",
		name : 'Gambia'
	}), App.Country.create({
		id : "GE",
		name : 'Georgia'
	}), App.Country.create({
		id : "DE",
		name : 'Germany'
	}), App.Country.create({
		id : "GH",
		name : 'Ghana'
	}), App.Country.create({
		id : "GI",
		name : 'Gibraltar'
	}), App.Country.create({
		id : "GR",
		name : 'Greece'
	}), App.Country.create({
		id : "GL",
		name : 'Greenland'
	}), App.Country.create({
		id : "GD",
		name : 'Grenada'
	}), App.Country.create({
		id : "GP",
		name : 'Guadeloupe'
	}), App.Country.create({
		id : "GU",
		name : 'Guam'
	}), App.Country.create({
		id : "GT",
		name : 'Guatemala'
	}), App.Country.create({
		id : "GG",
		name : 'Guernsey'
	}), App.Country.create({
		id : "GN",
		name : 'Guinea'
	}), App.Country.create({
		id : "GW",
		name : 'Guinea-Bissau'
	}), App.Country.create({
		id : "HT",
		name : 'Haiti'
	}), App.Country.create({
		id : "HM",
		name : 'Heard Island and McDonald Islands'
	}), App.Country.create({
		id : "VA",
		name : 'oly See (Vatican City State)'
	}), App.Country.create({
		id : "HN",
		name : 'Honduras'
	}), App.Country.create({
		id : "HK",
		name : 'Hong Kong'
	}), App.Country.create({
		id : "HU",
		name : 'Hungary'
	}), App.Country.create({
		id : "IS",
		name : 'Iceland'
	}), App.Country.create({
		id : "IS",
		name : 'India'
	}), App.Country.create({
		id : "ID",
		name : 'Indonesia'
	}), App.Country.create({
		id : "IR",
		name : 'Iran, Islamic Republic of'
	}), App.Country.create({
		id : "IQ",
		name : 'Iraq'
	}), App.Country.create({
		id : "IE",
		name : 'Ireland'
	}), App.Country.create({
		id : "IM",
		name : 'Isle of Man'
	}), App.Country.create({
		id : "IL",
		name : 'Israel'
	}), App.Country.create({
		id : "IL",
		name : 'Italy'
	}), App.Country.create({
		id : "JM",
		name : 'Jamaica'
	}), App.Country.create({
		id : "JP",
		name : 'Japan'
	}), App.Country.create({
		id : "JE",
		name : 'Jersey'
	}), App.Country.create({
		id : "JO",
		name : 'Jordan'
	}), App.Country.create({
		id : "KZ",
		name : 'Kazakhstan'
	}), App.Country.create({
		id : "KE",
		name : 'Kenya'
	}), App.Country.create({
		id : "KI",
		name : 'Kiribati'
	}), App.Country.create({
		id : "KP",
		name : 'Korea, Democratic People&rsquo;s Republic of'
	}), App.Country.create({
		id : "KR",
		name : 'Korea, Republic of'
	}), App.Country.create({
		id : "KW",
		name : 'Kuwait'
	}), App.Country.create({
		id : "KG",
		name : 'Kyrgyzstan'
	}), App.Country.create({
		id : "LA",
		name : 'Lao People&rsquo;s Democratic Republic'
	}), App.Country.create({
		id : "LV",
		name : 'Latvia'
	}), App.Country.create({
		id : "LB",
		name : 'Lebanon'
	}), App.Country.create({
		id : "LS",
		name : 'Lesotho'
	}), App.Country.create({
		id : "LR",
		name : 'Liberia'
	}), App.Country.create({
		id : "LY",
		name : 'Libya'
	}), App.Country.create({
		id : "LI",
		name : 'Liechtenstein'
	}), App.Country.create({
		id : "LU",
		name : 'Luxembourg'
	}), App.Country.create({
		id : "MO",
		name : 'Macao'
	}), App.Country.create({
		id : "MK",
		name : 'Macedonia, the former Yugoslav Republic of'
	}), App.Country.create({
		id : "MG",
		name : 'Madagascar'
	}), App.Country.create({
		id : "MW",
		name : 'Malawi'
	}), App.Country.create({
		id : "MY",
		name : 'Malaysia'
	}), App.Country.create({
		id : "MV",
		name : 'Maldives'
	}), App.Country.create({
		id : "ML",
		name : 'Mali'
	}), App.Country.create({
		id : "MT",
		name : 'Malta'
	}), App.Country.create({
		id : "MH",
		name : 'Marshall Islands'
	}), App.Country.create({
		id : "MQ",
		name : 'Martinique'
	}), App.Country.create({
		id : "MR",
		name : 'Mauritania'
	}), App.Country.create({
		id : "MU",
		name : 'Mauritius'
	}), App.Country.create({
		id : "YT",
		name : 'Mayotte'
	}), App.Country.create({
		id : "MX",
		name : 'Mexico'
	}), App.Country.create({
		id : "FM",
		name : 'Micronesia, Federated States of'
	}), App.Country.create({
		id : "MD",
		name : 'Moldova, Republic of'
	}), App.Country.create({
		id : "MC",
		name : 'Monaco'
	}), App.Country.create({
		id : "MN",
		name : 'Mongolia'
	}), App.Country.create({
		id : "ME",
		name : 'Montenegro'
	}), App.Country.create({
		id : "MS",
		name : 'Montserrat'
	}), App.Country.create({
		id : "MA",
		name : 'Morocco'
	}), App.Country.create({
		id : "MZ",
		name : 'Mozambique'
	}), App.Country.create({
		id : "MM",
		name : 'Myanmar'
	}), App.Country.create({
		id : "NA",
		name : 'Namibia'
	}), App.Country.create({
		id : "NR",
		name : 'Nauru'
	}), App.Country.create({
		id : "NP",
		name : 'Nepal'
	}), App.Country.create({
		id : "NO",
		name : 'Norway'
	}), App.Country.create({
		id : "OM",
		name : 'Norway'
	}), App.Country.create({
		id : "PK",
		name : 'Pakistan'
	}), App.Country.create({
		id : "PW",
		name : 'Palau'
	}), App.Country.create({
		id : "PS",
		name : 'Palestinian Territory, Occupied'
	}), App.Country.create({
		id : "PA",
		name : 'Panama'
	}), App.Country.create({
		id : "PG",
		name : 'Papua New Guinea'
	}), App.Country.create({
		id : "PY",
		name : 'Paraguay'
	}), App.Country.create({
		id : "PE",
		name : 'Peru'
	}), App.Country.create({
		id : "PH",
		name : 'Philippines'
	}), App.Country.create({
		id : "PN",
		name : 'Pitcairn'
	}), App.Country.create({
		id : "PL",
		name : 'Poland'
	}), App.Country.create({
		id : "PT",
		name : 'Portugal'
	}), App.Country.create({
		id : "PR",
		name : 'Puerto Rico'
	}), App.Country.create({
		id : "QA",
		name : 'Qatar'
	}), App.Country.create({
		id : "RE",
		name : 'Réunion'
	}), App.Country.create({
		id : "RO",
		name : 'Romania'
	}), App.Country.create({
		id : "RU",
		name : 'Russian Federation'
	}), App.Country.create({
		id : "RW",
		name : 'Rwanda'
	}), App.Country.create({
		id : "BL",
		name : 'Saint Barthélemy'
	}), App.Country.create({
		id : "SH",
		name : 'Saint Helena, Ascension and Tristan da Cunha'
	}), App.Country.create({
		id : "KN",
		name : 'Saint Kitts and Nevis'
	}), App.Country.create({
		id : "LC",
		name : 'Saint Lucia'
	}), App.Country.create({
		id : "MF",
		name : 'Saint Martin (French part)'
	}), App.Country.create({
		id : "PM",
		name : 'Saint Pierre and Miquelon'
	}), App.Country.create({
		id : "VC",
		name : 'Saint Vincent and the Grenadines'
	}), App.Country.create({
		id : "WS",
		name : 'Samoa'
	}), App.Country.create({
		id : "SM",
		name : 'San Marino'
	}), App.Country.create({
		id : "ST",
		name : 'Sao Tome and Principe'
	}), App.Country.create({
		id : "SA",
		name : 'Saudi Arabia'
	}), App.Country.create({
		id : "SN",
		name : 'Senegal'
	}), App.Country.create({
		id : "RS",
		name : 'Serbia'
	}), App.Country.create({
		id : "SC",
		name : 'Seychelles'
	}), App.Country.create({
		id : "SL",
		name : 'Sierra Leone'
	}), App.Country.create({
		id : "SG",
		name : 'Singapore'
	}), App.Country.create({
		id : "SX",
		name : 'Sint Maarten (Dutch part)'
	}), App.Country.create({
		id : "SK",
		name : 'Slovakia'
	}), App.Country.create({
		id : "SI",
		name : 'Slovenia'
	}), App.Country.create({
		id : "SB",
		name : 'Solomon Islands'
	}), App.Country.create({
		id : "SO",
		name : 'Somalia'
	}), App.Country.create({
		id : "ZA",
		name : 'South Afric'
	}), App.Country.create({
		id : "GA",
		name : 'South Georgia and the South Sandwich Islands'
	}), App.Country.create({
		id : "SS",
		name : 'South Sudan'
	}), App.Country.create({
		id : "ES",
		name : 'Spain'
	}), App.Country.create({
		id : "LK",
		name : 'Sri Lanka'
	}), App.Country.create({
		id : "SD",
		name : 'Sudan'
	}), App.Country.create({
		id : "SR",
		name : 'Suriname'
	}), App.Country.create({
		id : "SJ",
		name : 'Svalbard and Jan Mayen'
	}), App.Country.create({
		id : "SZ",
		name : 'Swaziland'
	}), App.Country.create({
		id : "SE",
		name : 'Sweden'
	}), App.Country.create({
		id : "CH",
		name : 'Switzerland'
	}), App.Country.create({
		id : "SY",
		name : 'Syrian Arab Republic'
	}), App.Country.create({
		id : "TW",
		name : 'Taiwan, Province of China'
	}), App.Country.create({
		id : "TJ",
		name : 'Tajikistan'
	}), App.Country.create({
		id : "TZ",
		name : 'Tanzania, United Republic of'
	}), App.Country.create({
		id : "TH",
		name : 'Thailand'
	}), App.Country.create({
		id : "TL",
		name : 'Timor-Leste'
	}), App.Country.create({
		id : "TG",
		name : 'Togo'
	}), App.Country.create({
		id : "TK",
		name : 'Tokelau'
	}), App.Country.create({
		id : "TO",
		name : 'Tonga'
	}), App.Country.create({
		id : "TT",
		name : 'Trinidad and Tobago'
	}), App.Country.create({
		id : "TN",
		name : 'Tunisia'
	}), App.Country.create({
		id : "TR",
		name : 'Turkey'
	}), App.Country.create({
		id : "TM",
		name : 'Turkmenistan'
	}), App.Country.create({
		id : "TC",
		name : 'Turks and Caicos Islands'
	}), App.Country.create({
		id : "TV",
		name : 'Tuvalu'
	}), App.Country.create({
		id : "UG",
		name : 'Uganda'
	}), App.Country.create({
		id : "UA",
		name : 'Ukraine'
	}), App.Country.create({
		id : "AE",
		name : 'United Arab Emirates'
	}), App.Country.create({
		id : "GB",
		name : 'United Kingdom'
	}), App.Country.create({
		id : "US",
		name : 'United States'
	}), App.Country.create({
		id : "UM",
		name : 'United States Minor Outlying Islands'
	}), App.Country.create({
		id : "UY",
		name : 'Uruguay'
	}), App.Country.create({
		id : "UZ",
		name : 'Uzbekistan'
	}), App.Country.create({
		id : "VU",
		name : 'Vanuatu'
	}), App.Country.create({
		id : "VE",
		name : 'Venezuela, Bolivarian Republic of'
	}), App.Country.create({
		id : "VN",
		name : 'Viet Nam'
	}), App.Country.create({
		id : "VG",
		name : 'Virgin Islands, British'
	}), App.Country.create({
		id : "VI",
		name : 'Virgin Islands, U.S.'
	}), App.Country.create({
		id : "WF",
		name : 'Wallis and Futuna'
	}), App.Country.create({
		id : "EH",
		name : 'Western Sahara'
	}), App.Country.create({
		id : "YE",
		name : 'Yemen'
	}), App.Country.create({
		id : "ZM",
		name : 'Zambia'
	}), App.Country.create({
		id : "ZW",
		name : 'Zimbabwe'
	}),

	]
});
