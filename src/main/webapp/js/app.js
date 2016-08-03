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
	debugMode : false
});

App.Router.map(function() {
	this.resource('CreateAccount');
	this.route('CreateAccount', { path: '/verification.html' });

});

// Objects
App.Session = Ember.Object.extend({
	sessionHash : '',
	isloggedin : false

});
App.Support = Ember.Object.extend({
	id : null,
	title : null,
	description : null,
	category : null
})
App.Month = Ember.Object.extend({
	id : null,
	name : null
});
App.selectedMonthController = Ember.Object.create({
	month : null
});
App.MonthsController = Ember.ArrayController.create({
	content : [ App.Month.create({
		id : "1",
		name : '01',
	}), App.Month.create({
		id : "2",
		name : '02',
	}), App.Month.create({
		id : "3",
		name : '03',
	}), App.Month.create({
		id : "4",
		name : '04',
	}), App.Month.create({
		id : "5",
		name : '05',
	}), App.Month.create({
		id : "6",
		name : '06',
	}), App.Month.create({
		id : "7",
		name : '07',
	}), App.Month.create({
		id : "8",
		name : '08',
	}), App.Month.create({
		id : "9",
		name : '09',
	}), App.Month.create({
		id : "10",
		name : '10',
	}),App.Month.create({
		id : "11",
		name : '11',
	}),App.Month.create({
		id : "12",
		name : '12',
	}),]
});

App.Year = Ember.Object.extend({
	id : null,
	name : null
});
App.selectedYearController = Ember.Object.create({
	year : null
});
App.YearsController = Ember.ArrayController.create({
	content : [ App.Month.create({
		id : "2016",
		name : '2016',
	}), App.Month.create({
		id : "2017",
		name : '2017',
	}), App.Month.create({
		id : "2018",
		name : '2018',
	}), App.Month.create({
		id : "2019",
		name : '2019',
	}), App.Month.create({
		id : "2020",
		name : '2020',
	}),  App.Month.create({
		id : "2021",
		name : '2021',
	}), App.Month.create({
		id : "2022",
		name : '2022',
	}), App.Month.create({
		id : "2023",
		name : '2023',
	}), App.Month.create({
		id : "2024",
		name : '2024',
	}),]
});
App.Country = Ember.Object.extend({
	id : null,
	name : null
});
App.selectedCountryController = Ember.Object.create({
	country : null
});

App.Language = Ember.Object.extend({
	id : null,
	name : null
});
App.selectedLanguageController = Ember.Object.create({
	language : null
});

App.Subject = Ember.Object.extend({
	id : null,
	name : null
});
App.Subject2 = Ember.Object.extend({
	id : null,
	name : null
});
App.selectedSubjectController = Ember.Object.create({
	subject : {
		id : 1,
		name : 'General'
	}
});

App.selectedSubjec2tController = Ember.Object.create({
	subject : {
		id : 0,
		name : 'Cancel Account'
	}
});

App.Movies = Ember.Object.extend({
	id : null,
	FILM_ID : null,
	FILM_TITLE : null,
	SYNOPSIS : null,
	ACTORS : null,
	DIRECTOR : null,
	WRITER : null,
	YEAR : null,
	GENRE : null,
	movie_url : null,
	title_pic_url : null,
	pics : null,
	TRAILER_LINK : null
});
App.selectedMovieController = Ember.Object.create({
	movies : null
});

// Routesthis.set('isExpanded', true);
App.ApplicationRoute = Ember.Route.extend({
	beforeModel : function() {
		this.controllerFor('application').session.set('isloggedin', false);

	}
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

	}
});

// Controllers
App.ApplicationController = Ember.Controller
		.extend({
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
				openDSC : function(faq) {
					document.getElementById("tooltip").style.display = "block";
					document.getElementById("mask").style.display = "block";
					document.getElementById("tooltipTitle").innerHTML = faq.title;
					document.getElementById("tooltipDSC").innerHTML = faq.description;
				},

				selectMovie : function(movie) {
					if (App.selectedMovieController != movie) {
						App.selectedMovieController = movie;
						document.getElementById("slider").style.display = "none";
						document.getElementById("littleSlider").style.display = "block";
						document.getElementById("hrGray").style.display = "none";
						document.getElementById("genres").style.display = "none";
						document.getElementById("moviePreview").style.display = "flex";
						document.getElementById('moviePreview').focus();

						var mp = document.getElementById('moviePreview');
						var moviePreviewOld = document
								.getElementById('moviePreviewWrapper');

						// Create the Image container
						var movieImageDiv = document.createElement('div');
						movieImageDiv.className = "movieImage";

						// Create the Image
						var movieImage = document.createElement('img');
						movieImage.id = 'moviePreviewImg';
						
						url = movie.title_pic_url;
						
						movieImage.setAttribute('src', url);

						// Set the image inside the container
						movieImageDiv.appendChild(movieImage);

						// Create the movie data div
						var movieData = document.createElement('div');
						movieData.className = 'movieData';

						// Create the title Div
						var moviePreviewTitle = document.createElement('div');
						moviePreviewTitle.className = 'title';
						moviePreviewTitle.id = 'moviePreviewTitle';

						// Create the span inside
						var moviePreviewTitleSpan = document
								.createElement('span');
						
						moviePreviewTitleSpan.textContent = movie.FILM_TITLE;

						// set the span inside the title
						moviePreviewTitle.appendChild(moviePreviewTitleSpan);

						// Create the cast subtitle Div
						var castSubtitle = document.createElement('div');
						castSubtitle.className = 'subtitle';

						// Create the span inside
						var castSubtitleSpan = document.createElement('span');
						castSubtitleSpan.textContent = 'CAST';

						// set the span inside the title
						castSubtitle.appendChild(castSubtitleSpan);

						// Create the 'cast' content div
						var castDiv = document.createElement('div');
						castDiv.className = 'content';

						// create p inside
						var castp = document.createElement('p');
						castp.id = 'moviePreviewContent';
						if(movie.ACTORS) {	
						castp.innerHTML = (movie.ACTORS).replace(/,/g, "</br>");
						}
						// set the p inside the div
						castDiv.appendChild(castp);

						// Create the summary subtitle Div
						var summarySubTitle = document.createElement('div');
						summarySubTitle.className = 'subtitle';

						// Create the span inside
						var summarySubTitleSpan = document
								.createElement('span');
						summarySubTitleSpan.textContent = 'PLOT SUMMARY';

						// set the span inside the title
						summarySubTitle.appendChild(summarySubTitleSpan);

						// Create the 'summary' content div
						var summaryDiv = document.createElement('div');
						summaryDiv.className = 'content';

						// create p inside
						var summaryp = document.createElement('p');
						summaryp.id = 'moviePreviewDSC';
						
						summaryp.innerHTML = movie.SYNOPSIS;

						// set the p inside the div
						summaryDiv.appendChild(summaryp);

						// create the button
						var button = document.createElement('button');
						button.className = 'playNow';
						button.innerHTML = '<i class="material-icons">play_circle_outline</i> Watch Now';
						button.onclick = function() {
							var url;
						
							url = movie.movie_url;
							openMovie(url);
							return false;

						}

						// add elements to movie data
						movieData.appendChild(moviePreviewTitle);
						movieData.appendChild(castSubtitle);
						movieData.appendChild(castDiv);
						movieData.appendChild(summarySubTitle);
						movieData.appendChild(summaryDiv);
						movieData.appendChild(button);

						// Create a trailer div
						var movieTrailerDiv = document.createElement('div');
						movieTrailerDiv.className = 'movieTrailer';

						/* start movie trailer div content */
						// create stars div
						var starsDiv = document.createElement('div');
						starsDiv.className = 'stars';

						// create stars
						starsDiv.innerHTML = '<i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star_half</i><i class="material-icons">star_border</i>';

						// create trailer title
						var trailerTitle = document.createElement('div');
						trailerTitle.className = 'title';
						trailerTitle.innerHTML = 'Watch trailer';

						// create iframe triller
						var ifrm = document.createElement("IFRAME");
						ifrm
								.setAttribute("src", movie.TRAILER_LINK);
						ifrm.setAttribute("frameBorder", "0");
						ifrm.setAttribute("allowfullscreen", '')
						ifrm.style.width = 215 + "px";
						ifrm.style.height = 143 + "px";

						// create gallery div

						var galleryTitle = document.createElement("div");
						galleryTitle.className = 'title';
						galleryTitle.innerHTML = "Gallery";

						var galleryDiv = document.createElement("div");
						galleryDiv.className = 'galleryImages';

						var divImg;
						var img;
						

						for (var i = 0; i < 4; i++) {
							divImg = document.createElement("div");
							img = document.createElement("img");
							divImg.appendChild(img);
							var url = "" ;
							if(movie.Smallpicture != "") {
								url = movie.Smallpicture + (i+1) + ".png";
							} else {
								url = "http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/No_image_available.png"
							}
							img.setAttribute("src",url);
							img.setAttribute("width",83);
							img.setAttribute("height",42);
							

							galleryDiv.appendChild(divImg);
						}

						/* end movie trailer div content */
						movieTrailerDiv.appendChild(starsDiv);
						movieTrailerDiv.appendChild(trailerTitle);
						movieTrailerDiv.appendChild(ifrm);
						movieTrailerDiv.appendChild(galleryTitle);
						movieTrailerDiv.appendChild(galleryDiv);

						// Create a new movie preview wrapper
						var moviePreviewNew = document.createElement('div');
						moviePreviewNew.id = 'moviePreviewWrapper';
						moviePreviewNew.className = 'moviePreviewWrapper';

						// Set the elements inside the wrapper
						moviePreviewNew.appendChild(movieImageDiv);
						moviePreviewNew.appendChild(movieData);
						moviePreviewNew.appendChild(movieTrailerDiv);

						// replace existing wrapper with the new one
						mp.removeChild(moviePreviewOld);
						mp.appendChild(moviePreviewNew);
					}

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

App.LanguageController = Ember.ArrayController.create({
	content : [ App.Language.create({
		id : "EN",
		name : 'English',
		src : 'images/MF-allpages-ENflag.png'
	}), App.Language.create({
		id : "ES",
		name : 'Spanish',
		src : 'images/MF-allpages-ESflag.png'

	}),

	]
});
App.SubjectsController = Ember.ArrayController.create({
	content : [ App.Subject.create({
		id : "1",
		name : 'General',
	}), App.Subject.create({
		id : "2",
		name : 'Technical problems',
	}), App.Subject.create({
		id : "3",
		name : 'Join as affilliate',
	}), App.Subject.create({
		id : "4",
		name : 'Forget password',
	}), ]
});
App.Subjects2Controller = Ember.ArrayController.create({
	content : [ App.Subject.create({
		id : "0",
		name : 'Cancel Account',
	}), App.Subject.create({
		id : "1",
		name : 'General',
	}), App.Subject.create({
		id : "2",
		name : 'Technical problems',
	}), App.Subject.create({
		id : "3",
		name : 'Join as affilliate',
	}), App.Subject.create({
		id : "4",
		name : 'Forget password',
	}), ]
});

App.AccountFaqs = Ember.ArrayController
		.create({
			content : [
					App.Support.create({
						"id" : 1,
						"title" : "How do I change my password?",
						"description" : "You can either reset or change your password by access to the support page and open a ticket in our system.",
						"category" : 1
					}),
					App.Support.create({
						"id" : 2,
						"title" : "How do I cancel my account?",
						"description" : "You can access the support page and change your password or cancel your account there.",
						"category" : 1
					}),
					App.Support
							.create({
								"id" : 3,
								"title" : "How do I change the subscription I have signed up for?",
								"description" : "There is no such possibility at the moment. You can either continue your subscription or cancel it.",
								"category" : 1
							}),
					App.Support
							.create({
								"id" : 4,
								"title" : "Can I change the email address of my account?",
								"description" : "No",
								"category" : 1
							}),
					App.Support
							.create({
								"id" : 5,
								"title" : "Why was I immediately charged an amount when signing up with a credit/debit card?",
								"description" : "It's for verification purposes. When you signup for the free trial we may charge a small amount (up to $2.00) from your card to verify it is operational and valid. The amount will be immediately refunded when you cancel the account.",
								"category" : 1
							}),
					App.Support
							.create({
								"id" : 6,
								"title" : "Can I sing up for more than one account?",
								"description" : "No, only one account per credit card/email is allowed.",
								"category" : 1
							}), ]

		});
App.TechnicalFaqs = Ember.ArrayController.create({
	content : [ App.Support.create({
		"id" : 7,
		"title" : "The movie is not working, why?",
		"description" : "If you are using an older browser, check the flash plugin to watch movies. If your problem maintains, please contact us and describe it in detail.",
		"category" : 2
	}), App.Support.create({
		"id" : 8,
		"title" : "How do I turn on/off the subtitles?",
		"description" : "At the moment, some movies have subtitles and some do not, but you can not turn them on or off.",
		"category" : 2
	}), App.Support.create({
		"id" : 9,
		"title" : "I can't find the movie I am looking for.",
		"description" : "Not all movies are available in all countries, but we are constantly working on expanding the movie database as much as possible.",
		"category" : 2
	}), ]

});
App.MoviesController = Ember.ArrayController
.create({
	content : [
App.Movies.create({"id":1,"FILM_TITLE":"1st Bite","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/1st-bite.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/1st_Bite_x264_512kb.m4v","GENRE":"Comedy","DIRECTOR":"Hunt Hoe","ACTORS":"David La Haye, Leah Pinsent, Napakpapha Nakprasitte","RATING":null,"SYNOPSIS":"Set on a tropical island in Thailand, the strange plight of a beleaguered chef who, while romancing a mysterious woman, discovers the diabolical Zen of cooking. Following a near death escape, he returns to Montreal and falls hard for the woman of his life who unfortunately craves only his cooking but not his loving. Worse still, strange things surfacing around him indicate that his journey to the Far East has deep, divine implications. The stage is set for him to take the 1st bite of true love and end the cycle of suffering for all involved.","WRITER":"Hunt Hoe","TRAILER_LINK":"https://www.youtube.com/embed/mzXJokOOJeQ","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/thefirstbite/"}),
App.Movies.create({"id":2,"FILM_TITLE":"3 Way Split","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/3-way-split.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/3_Way_Split_1975_x264_512kb.mp4","GENRE":"Comedy","DIRECTOR":"Gordon Hessler","ACTORS":"Robert Vaughn, Simon Andreu, Katia Christine","RATING":null,"SYNOPSIS":"Tony Pintana, an art collector, and his wife are contacted by Martin, who is short on cash and proposes to rob a museum of a Indian golden mask that's worth 10 million dollar. When their attempt miserably fails, the museum decides to have the mask transported to a safer location. The three try their luck again and are successful this time. Chased by a policeman who isn't convinced they're innocent, the three will have a difficult time selling the mask on the black market...","WRITER":"Ricardo Ferrer, Jose Gutierrez Maesso","TRAILER_LINK":"https://www.youtube.com/embed/q9fZcJ3CH-A","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/3wy/"}),
App.Movies.create({"id":3,"FILM_TITLE":"A Change of Seasons","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/a-change-of-seasons.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/A_Change_Of_Seasons_x264_512kb_(1980).mp4","GENRE":"Action","DIRECTOR":"Richard Lang, Noel Black (uncredited)","ACTORS":"Anthony Hopkins, Bo Derek, Shirley MacLaine","RATING":null,"SYNOPSIS":"Marriage takes a sour turn when a middle-aged husband falls for a young and sexy woman. Things get even more complicated when his wife starts a hot affair with a young lover of her own.","WRITER":"Erich Segal (story), Martin Ransohoff (story)","TRAILER_LINK":"https://www.youtube.com/embed/wOkhs6daO0g","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/changeseasons/"}),
App.Movies.create({"id":4,"FILM_TITLE":"A Christmas Too Many","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/a-christmas-too-many.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/A_Christmas_Too_Many_x264_512kb.m4v","GENRE":"Horror","DIRECTOR":"Stephen Wallis","ACTORS":"Mickey Rooney, Ruta Lee and Andrew Keegan","RATING":null,"SYNOPSIS":"'A Christmas Too Many' is a comedic romp, that examines the relationships of the 'perfect' Christmas Family. When Oscar-winning actress, Lana Myers, decides to invite her estranged Family back home to California for the holidays... everything goes incredibly and inexplicably wrong.","WRITER":"Stephen Wallis","TRAILER_LINK":"https://www.youtube.com/embed/wKr8BAWB8VQ","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/christmastoomany/"}),
App.Movies.create({"id":5,"FILM_TITLE":"A Light In The Forest","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/a-light-in-the-forest.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/A_Light_In_The_Forest_x264_512b.m4v","GENRE":"Thriller","DIRECTOR":"John Carl Buechler","ACTORS":"Lindsay Wagner, Frank Bonner, Edward Lawrence Albert, Carol Lynley, Bernie Kopell, Danielle Nicolet, Christian Oliver","RATING":null,"SYNOPSIS":"Lindsay Wagner, Frank Bonner, Edward Lawrence Albert, Carol Lynley, Bernie Kopell, Danielle Nicolet, Christian Oliver","WRITER":"John Carl Buechler (writer), Frank Latino and Gary LoConti (writer)","TRAILER_LINK":"https://www.youtube.com/embed/dLhgJNnt3JE","Smallpicture":""}),
App.Movies.create({"id":6,"FILM_TITLE":"A Shot In The Dark (Portuguese)","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/a-shot-in-the-dark.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/A_Shot_In_The_Dark_x264_512kb.m4v","GENRE":"Animation","DIRECTOR":"Leonel Vieira","ACTORS":"Joaquim de Almeida, Vanessa Mesquita and Filipe Duarte","RATING":null,"SYNOPSIS":"In a Rio de Janeiro airport, a TAP stewardess kidnaps a two-month-old baby girl. Two years later, the distraught mother is living in Lisbon. In order to survive, she works in a 'strip-tease' bar but spends most of her time in the airport hoping to find the stewardess who took her daughter. Then one night she is fired from her job and without money. She joins a gang of ex-security guards from the bar and stays in their hideout. She becomes involved with a series of bank robberies. Soon she is tracked by the police inspector who also seems to have something to hide. ","WRITER":"Jorge Almeida (story and script), Alberto Fernandes (story) and Jo?o Nunes (screenplay)","TRAILER_LINK":"https://www.youtube.com/embed/qtEIW53SZHc","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/shotinthedark/"}),
App.Movies.create({"id":7,"FILM_TITLE":"Adventure of the Wilderness Family","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/adventures-of-the-wilderness-family.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Adventures_of_the_Wilderness_Family_1975_x264_512kb.mp4","GENRE":"Comedy","DIRECTOR":"Stewart Raffill","ACTORS":"Susan Damante, Robert Logan, Hollye Holmes","RATING":null,"SYNOPSIS":"A family flees the city for the wilderness. They learn to live with nature and more importantly, that when one has family, one has everything.","WRITER":"Arthur R. Dubs (story), Stewart Raffill (screenplay)","TRAILER_LINK":"https://www.youtube.com/embed/dzSE213EhE0","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/adventureswilderness/"}),
App.Movies.create({"id":8,"FILM_TITLE":"All Or Nothing: A Moscow Detour","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/all-or-nothing.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/All_Or_Nothing_x264_512kb.m4v","GENRE":"Comedy","DIRECTOR":"Gabrielle Bloch","ACTORS":"Alexander Bloch, Gabrielle Bloch, Sergey Zhirov","RATING":null,"SYNOPSIS":"Gabby, a novice documentarian, has come from New York to visit her father, Alexander, a man who left his family to become a very important figure in a very important Russian Oil Company. Acting on his promise to return, Gabby decides to document her father in Moscow during his final months of stay. However, once she realizes that Alexander's temporary decision in Russia may have become a permanent decision, Gabby's rosy documentary is forced into a dramatically comical Moscow detour.","WRITER":"Gabrielle Bloch (story)","TRAILER_LINK":"https://www.youtube.com/embed/YvEW1w6sZXo","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/allornothing/"}),
App.Movies.create({"id":9,"FILM_TITLE":"Birds of Prey","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/birds-of-prey.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Birds_Of_Prey_x264_512kb.m4v","GENRE":"Drama","DIRECTOR":"Rene Cardona Jr.","ACTORS":"Christopehr Atkins, Michelle Johnson, Sonia Infante, Salvador Pineda, Also Sambrell","RATING":null,"SYNOPSIS":"While covering a story about a farmer attacked by his chickens, Vanessa, an attractive young television journalist, beings to perceive her assignment in a different light as it becomes apparent that this was not just an isolated incident.","WRITER":"Rene Cardona Jr.","TRAILER_LINK":"https://www.youtube.com/embed/w1_5S70V6Dg","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/birdsofprey/"}),
App.Movies.create({"id":10,"FILM_TITLE":"Bite the Bullet","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/bite-the-bullet.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Bite_The_Bullet_1975_x264_512kb.mp4","GENRE":"Documentary","DIRECTOR":"Richard Brooks","ACTORS":"Gene Hackman, Candice Bergen, James Coburn","RATING":null,"SYNOPSIS":"A group of ex-rough riders, an ex-prostitute and a gunfighter enter a horse race in the desert.","WRITER":"Richard Brooks","TRAILER_LINK":"https://www.youtube.com/embed/1MbwGhTHYnQ","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/bitethebullet/"}),
App.Movies.create({"id":11,"FILM_TITLE":"Bleeding Iowa","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/bleeding-iowa.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Bleeding_Iowa_x264_512kb.m4v","GENRE":"Comedy","DIRECTOR":"Stephen Goetsch","ACTORS":"Justin Lauer, Heather Waters, David 'Dutch' Schultz","RATING":null,"SYNOPSIS":"A convicted felon is set free by the FBI to unknowingly take part in a political assassination.","WRITER":"Stephen Goetsch","TRAILER_LINK":"https://www.youtube.com/embed/RUIHMCFnOAE","Smallpicture":""}),
App.Movies.create({"id":12,"FILM_TITLE":"Caged heat","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/caged-heat.jpg","movie_url":"","GENRE":"Drama","DIRECTOR":"Jonathan Demme","ACTORS":"Juanita Brown, Erica Gavin, Roberta Collins","RATING":null,"SYNOPSIS":"A girl is caught in a drug bust and sent to the hoosegow. The iron-handed superintendent takes exception to a skit performed by the girls and takes punitive steps, aided by the sadistic doctor who is doing illegal electroshock experiments and harming drugged prisoners. After a while the prisoners put away their petty differences and plan the Big Prison Escape.","WRITER":"Jonathan Demme","TRAILER_LINK":"https://www.youtube.com/embed/YYN4mDgPPH0","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/cagedheat/"}),
App.Movies.create({"id":13,"FILM_TITLE":"Cold Cash","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/cold-cash.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Cold_Cash_SD_x264_512Kbps.mp4","GENRE":"Action","DIRECTOR":"David M. Aronson","ACTORS":"Dave Anderson, Asher Boisvert, Oscar George","RATING":null,"SYNOPSIS":"Cold Cash is the story of an eighteen-year old boy, Jimmy, who is driven to make his father proud in the family business: ice cream trucks. At first he doesn't succeed, but with the help of his regular stops, he turns to the black market. Though the involvement of a local drug dealer, a rival ice cream truck driver from his father's past, and a mysterious homeless man in the woods, Jimmy find himself thrown into what seems to be a nightmare of his own making.","WRITER":"David M. Aronson, J. Matthew Snook","TRAILER_LINK":"https://www.youtube.com/embed/edOt400jFYc","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/coldcash/"}),
App.Movies.create({"id":14,"FILM_TITLE":"Cop killers","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/cop-killers.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Cop_Killers_1973_sd_x264_512kb.mp4","GENRE":"Action","DIRECTOR":"Walter R. Cichy (as Walter Cichy)","ACTORS":"Jason Williams, Bill Osco, Diane Keller","RATING":null,"SYNOPSIS":"Two hippies on their way to a cocaine deal get stopped by the police at a roadblock, resulting in a shootout where they kill the cops. They then go on a crime spree of robbery and murder.","WRITER":"Walter R. Cichy (screenplay) (as Walter Cichy), Howard Ziehm (story)","TRAILER_LINK":"https://www.youtube.com/embed/Y8JTHNGW4ls","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/copkillers/"}),
App.Movies.create({"id":15,"FILM_TITLE":"Crazy Mama","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/crazy-mama.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Crazy_Mama_1975_sd_x264_512kb.mp4","GENRE":"Action","DIRECTOR":"Jonathan Demme","ACTORS":"Cloris Leachman, Stuart Whitman, Ann Sothern","RATING":null,"SYNOPSIS":"An evicted mother and daughter lead a cross-country 1950's crime spree. They take to the road, stealing cars and creating general mayhem across the United States, robbing a motorcycle racetrack box office and a bank.","WRITER":"Robert Thom (screenplay), Frances Doel (story)","TRAILER_LINK":"https://www.youtube.com/embed/PHEm4alAoZM","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/crazymama/"}),
App.Movies.create({"id":16,"FILM_TITLE":"Cycle Of Fear","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/cycle-of-fear.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Cycle_Of_Fear_x264_512kb.m4v","GENRE":"Comedy","DIRECTOR":"Manuel H. DaSilva","ACTORS":"Valerie Morrissey, Rachael Ancheril, Sean Kaufmann","RATING":null,"SYNOPSIS":"What do you fear? One year ago, 14 teenagers went missing. Tabetha, is the only known survivor of the group. Found by the side of the road with no memory of who she is, and the secret she holds, and must find out what?s in store for her, through clues in her own sketches.","WRITER":"Shane Clark","TRAILER_LINK":"https://www.youtube.com/embed/vkHZWzWNJpE","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/cycleoffear/"}),
App.Movies.create({"id":17,"FILM_TITLE":"Day Of Miracles","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/day-of-miracles.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Day_of_Miracles_SD_x264_512Kbps.mp4","GENRE":"Drama","DIRECTOR":"Anthony Logan and Dillon Cole","ACTORS":"T.J Meyers, Kimberly Estrada and Brenda Epperson","RATING":null,"SYNOPSIS":"'Day Of Miracles' is the Documentary about the 'True-Life-Survivors' of the event at the New York Twin-Towers on September 11, 2001. The 'Stars' are the actual survivors of 9/11: Sujo Jon was in Tower One when the first plane crashed just above his head. He was able to lead a group of people down the staircase while the exterior of the building peeled like a banana. He then found out that his pregnant wife was in Tower Two. Janelle prayed for God to help her and the next day she was the only one alive and was discovered standing up asleep, amidst the rubble! Tom & Deena Burnett had a vision that he was going to die young and for the White House. He was one of the brave men that downed the plane in Pennsylvania.","WRITER":"Dillion Cole, Leslie McRay, and TJ Myers","TRAILER_LINK":"https://www.youtube.com/embed/mTWTfxsm5CM","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/dayofmiricales/"}),
App.Movies.create({"id":18,"FILM_TITLE":"Deadly Reckoning ","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/deadly-reckoning.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Deadly_Reckoning_x264_512kb.m4v","GENRE":"Action","DIRECTOR":"Art Camacho","ACTORS":"Frank Zabarino, Mathhias Hues, Robert Vaughn","RATING":null,"SYNOPSIS":"A man with a mysterious military career leaves his past behind him and moves to a small town. Opening up a bookstore with his witty teenage daughter, the two live in relative peace, that is until the man's past catches up with him. A ruthless group of mercenaries known only as the 'Cell' set their sights on the mysterious bookstore owner who proves that he is more than meets the eye.","WRITER":"Richard Preston Jr.","TRAILER_LINK":"https://www.youtube.com/embed/r9HJ4hfc6Do","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/deadleyreaconing/"}),
App.Movies.create({"id":19,"FILM_TITLE":"Dick","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/dick.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Dick_x264_512kb.mp4","GENRE":"Comedy","DIRECTOR":"Andrew Fleming","ACTORS":"Kirsten Dunst, Michelle Williams, Dan Hedaya","RATING":null,"SYNOPSIS":"Story of two girls who wander away from a White House tour and meet President Nixon.","WRITER":"Andrew Fleming, Sheryl Longin","TRAILER_LINK":"https://www.youtube.com/embed/nxIxiJjGtx8","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/dick/"}),
App.Movies.create({"id":20,"FILM_TITLE":"Dog Me Potluck","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/dog-me-potluck.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Dog_Me_Potluck_SD_x264_512Kbps.mp4","GENRE":"Documentary","DIRECTOR":"M. David Lee III","ACTORS":"Glenda Pannell, Bevan Bell and Ramsey Bergeron","RATING":null,"SYNOPSIS":"What happens when you take a hard working couple, six of their best friends, Three acquaintances, and A handful of quirky, unique individuals that make Jim Carrey seem normal? Then bring them all together, ask them to cook their favorite dish, and invite them to a party? You&#39;ve got the perfect ingredients for a night to remember! Expect to smile, laugh, think and maybe even cry as day to day life is exposed, turned upside down and inside out in &quot;Dog Me Potluck.&quot; Can you imagine what desert is like?","WRITER":"M. David Lee III","TRAILER_LINK":"https://www.youtube.com/embed/Hq2RPKw_3eo","Smallpicture":""}),
App.Movies.create({"id":21,"FILM_TITLE":"DV8","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/dv8.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/DV8_SD_x264_512Kbps.mp4","GENRE":"Comedy","DIRECTOR":"Chris Kas","ACTORS":"Sandrine Le Gallic, Nelson Ricardo, Joe Marino","RATING":null,"SYNOPSIS":"An American hit-man, a French hit-woman and a diamond thief are catapulted through a three-day gauntlet of action in Miami. The payoff is $10 MILLION in DIAMONDS! ! !","WRITER":"Xavier Barquet","TRAILER_LINK":"https://www.youtube.com/embed/LTbDpVcqWes","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/dv8/"}),
App.Movies.create({"id":22,"FILM_TITLE":"Exit 38","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/exit-38.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Exit_38_SD_x264_512Kbps.mp4","GENRE":"Action","DIRECTOR":"Dean George and Joel Franco","ACTORS":"Tommy Barnes, Jeff Beech, Tabitha Calvin, Martin Kove and James Hong","RATING":null,"SYNOPSIS":"Lee Gray and Boyd Parker never intended on being partners. In fact these men wanted nothing to do with one another, but when an evil vampire is feasting on the blood of innocent girls, they have no choice but to go on a mission to chase down the dangerous vampire and end his streak of terror. It will take the help of Federal Investigation Bureau and the direction of a Chinese Master to find the evil vampire Mercer. They find him off of Exit 38 at his current feeding ground, a gentleman?s club in an unsuspecting town. Upon their arrival they learn that Mercer has taken captive the wife of Lee Gray and daughter of Boyd Parker. Can these adversaries join together to save the life of the one they love? Boyd and Gray find the ultimate evil off of Exit 38 and the assignment they hoped they would never have.","WRITER":"Tommy Barnes, Eduardo Carrillo (additional material)","TRAILER_LINK":"https://www.youtube.com/embed/t_3RBH-M2IU","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/exit38/"}),
App.Movies.create({"id":23,"FILM_TITLE":"Fatal Desire","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/fatal-desire.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Fatal_Desire_x264_512kb.m4v","GENRE":"Action","DIRECTOR":"Roberto Schlosser","ACTORS":"Wendy Guess, Pierre Perea, Jordan Williams","RATING":null,"SYNOPSIS":"Ben is a movie director. A stuntman got killed accidentally in one of his movies and he is facing a charge of negligence. Ben's wife is beautiful; A perfect woman to showcase his extravagant lifestyle, they live beyond their means. Ben finds out that his wife is betraying him. He hires someone to follow her. Rick tries to persuade Sue to kill Ben and make it look like an accident, so they can collect the insurance money.","WRITER":"Keith Holland","TRAILER_LINK":"https://www.youtube.com/embed/rBV1E4TsUMQ","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/fataldesire/"}),
App.Movies.create({"id":24,"FILM_TITLE":"Fire and Ice (1983)","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/fire-and-ice.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Fire_and_Ice_1983_x264_512kb.mp4","GENRE":"Comedy","DIRECTOR":"Ralph Bakshi","ACTORS":"Randy Norton, Cynthia Leake, Steve Sandor","RATING":null,"SYNOPSIS":"In this animated tale, a tiny village is destroyed by a surging glacier, which serves as the deadly domain for the evil Ice Lord, Nekron. The only survivor is a young warrior, Larn, who vows to avenge this act of destruction. The evil continues, however, as Nekron's palace of ice heads straight towards Fire Keep, the great fortress ruled by the good King Jarol. When Jarol's beautiful daughter, Teegra, is abducted by Nekron's sub-human ape-like creatures, Larn begins a daring search for her. What results is a tense battle between good and evil, surrounded by the mystical elements of the ancient past.","WRITER":"Ralph Bakshi (characters created by), Frank Frazetta (characters created by)","TRAILER_LINK":"https://www.youtube.com/embed/EuTzprtQ6Uc","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/fireandice/"}),
App.Movies.create({"id":25,"FILM_TITLE":"Fish Without A Bicycle","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/fish-without-a-bicycle.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Fish_Without_A_Byclcle_SD_x264_512kbps.mp4","GENRE":"Thriller","DIRECTOR":"Brian A. Green","ACTORS":"Jenna Mattison, Brad Rowe, Bryan Callen","RATING":null,"SYNOPSIS":"Julianna (Jenna Mattison) is a struggling actress in a dead end relationship with Danny (Brad Rowe), a fireman who no longer lights her fire. When she decides to leave him and go ?find herself? she ends up falling in love with an egotistical director, Michael (Bryan Callen), who can barely fit her in between Pilates classes. Julianna?s over-sexed and cynical best friend, Vicky (Jennifer Blanc) convinces her to dump him too and sow her wild oats on the LA dating scene only to turn around and confess that she?s in love with Julianna. Between blind dates from hell and in-your-face intimacy issues, Julianna finds solace with Ben (Brian A. Green), her acting partner who is clearly Mr. Right?she just can?t see it yet. Tripping from one mistake to the next she meets Greta (Edie McClurg), a homeless woman who teaches her to follow her heart. In the end Julianna learns some pretty big life lessons in this witty, no-holds-barred, coming of age dramedy that is being hailed as the female version of ?Swingers.?","WRITER":"Jenna Mattison","TRAILER_LINK":"https://www.youtube.com/embed/9xC1rQxtg4A","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/fishwithout/"}),
App.Movies.create({"id":26,"FILM_TITLE":"Five Moments of Infidelity","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/five-moments-of-infidelity.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Five_Moments_of_Infidelity_SD_x264_512kbps-1.mp4","GENRE":"Horror","DIRECTOR":"Kate Gorman","ACTORS":"Ben Anderson, Joshua Cameron and Jason Chong","RATING":null,"SYNOPSIS":"A true to life drama showing moments of infidelity across five different worlds in the same city; The carefree sexy young things, who think they have nothing to lose; The upwardly mobile thirty-something couple with perfect careers and family life; The gay pair with an open relationship; The frustrated urban duo hanging onto familiarity; and The suburban family full of secrets and lies about to lose it all.","WRITER":"Kate Gorman","TRAILER_LINK":"https://www.youtube.com/embed/lTO1UEdqI9I","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/fivemomentsofinfidelity/"}),
App.Movies.create({"id":27,"FILM_TITLE":"Flashback","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/flashback.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Flashback_x264_512kb.m4v","GENRE":"Comedy","DIRECTOR":"Spomenko Karic","ACTORS":"Members of Parni valjak","RATING":null,"SYNOPSIS":"Interviev with members of Parni valjak, one of the most popular pop-rock band in Croatia. Story goes from their begining until today. Few people from branch and one ex member will talking too.","WRITER":"","TRAILER_LINK":"https://www.youtube.com/embed/LCuffiEXIJ0","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/flashback/"}),
App.Movies.create({"id":28,"FILM_TITLE":"Futile Attraction","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/futile-attraction.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Futile_Attraction_SD_x264_512Kbps.mp4","GENRE":"Comedy","DIRECTOR":"Mark Prebble","ACTORS":"Michelle Ang, Christopher Brougham, Alistair Browning, Richard Chapman, Desiree Rose Cheer","RATING":null,"SYNOPSIS":"A film crew is making a Reality TV show about a couple brought together by a dating agency. However, the couple is so incompatible that the crew must manipulate the relationship to get the footage they need.","WRITER":"Mark Prebble, Benedict Reid","TRAILER_LINK":"https://www.youtube.com/embed/EGYuBXNallU","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/futileattraction/"}),
App.Movies.create({"id":29,"FILM_TITLE":"Guyana: Crime of the Century ","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/guyana-crime-of-the-century.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Guyana_Crime_Of_The_Century_x264_512kb.m4v","GENRE":"Action","DIRECTOR":"Rene Cardona Sr.","ACTORS":"Stuart Whitman, Gene Barry, John Ireland, Joseph Cotton, Yvonne DeCarlo, Jennifer Ashley Bradford Dillman, Mel Ferrer","RATING":null,"SYNOPSIS":"Reverend James Johnson, the priest of an independent church in Guyana in South America, orders his followers to suicide. But not all follow him blindly and begin to think on their own�","WRITER":"Rene Cardona Jr. (screenplay and story) and Carlos Valdemar (screenplay and story)","TRAILER_LINK":"https://www.youtube.com/embed/EDN1M9zkBk8","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/crimeofthecentury/"}),
App.Movies.create({"id":30,"FILM_TITLE":"Hardball: All Balls Don't Bounce","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/hardball-all-balls-dont-bounce.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Hardball_All_Balls_Dont_Bounce_x264_512KB.mp4","GENRE":"Comedy","DIRECTOR":"Jerry Ochoa","ACTORS":"Cilton J. Beard III, Terry Wong and Caleb Curtis ","RATING":null,"SYNOPSIS":"Charismatic if not-so-bright Houston vigilante Hardball experiences a personal awakening when he learns the 'good guy' cops he 'assists' are actually covering for an international sex slavery ring operating out of Houston's ship channel. Hardball's failed attempt to help one hapless slave incurs the ire of both the Russian mafia and their Houston client, the cunning gangster 'Fat Tiger'. When the gangsters harm Hardball's neighbors as a warning, he and his old war buddy, 'Crazy Tony', vow to save the girls and defeat the bad guys. Complicating matters, the Russian Mafia assassin sent to finish Hardball has plans of his own. ","WRITER":"Jerry Ochoa, Anthony Watson","TRAILER_LINK":"https://www.youtube.com/embed/CEq0vGC9fvM","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/hardball/"}),
App.Movies.create({"id":31,"FILM_TITLE":"Hell's Heroes","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/hell's-heroes.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Hells_Heroes_1978_x264_512kb.mp4","GENRE":"Drama","DIRECTOR":"Enzo G. Castellari","ACTORS":"Bo Svenson, Peter Hooten, Fred Williamson","RATING":null,"SYNOPSIS":"The main characters are five soldiers facing court-martial in World War II France. The men escape, heading to the safety of the Swiss border; along the way, they pull off several random acts of above-and-beyond heroism.","WRITER":"Sandro Continenza, Sergio Grieco","TRAILER_LINK":"https://www.youtube.com/embed/W_tza8F59Xs","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/hellsheroes/"}),
App.Movies.create({"id":32,"FILM_TITLE":"Hollywood ","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/hollywood.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Hollywood_x264_512KB.mp4","GENRE":"Thriller","DIRECTOR":"Rick Rose","ACTORS":"Natalie Compagno, Marieh Delfino and Mark Henderson","RATING":null,"SYNOPSIS":"HOLLYWOOD is an inside look into the lives of three actors whose paths cross in a Los Angeles acting class taught by the 'guru' acting coach of the moment. Each is in a different stage of their career, trying for the next level. They go through daily life in Hollywood, trying to balance a personal life with the rigors of going after their dreams. Who can keep the dream alive?","WRITER":"Rick Rose (screenplay)","TRAILER_LINK":"https://www.youtube.com/embed/nzHz5TKDXn4","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/hollywood/"}),
App.Movies.create({"id":33,"FILM_TITLE":"Home","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/home.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Home_SD_x264_512Kbps.mp4","GENRE":"Action","DIRECTOR":"Matt Zoller Seitz","ACTORS":"Jason Liebrecht, Nicol Zanzarella, Erin S. Visslailli","RATING":null,"SYNOPSIS":"An all-night party in Brooklyn that has romantic banter, moments of pain, loneliness, and anger, with everyone looking for a partner.","WRITER":"Matt Zoller Seitz","TRAILER_LINK":"https://www.youtube.com/embed/0MF4BYGnqeI","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/home/"}),
App.Movies.create({"id":34,"FILM_TITLE":"Honor Among Thieves (aka Farewell, Friend)","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/honor-among-thieves.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Honor_Among_Thieves_x264_512kb.mp4","GENRE":"Action","DIRECTOR":"Jean Herman","ACTORS":"Alain Delon, Charles Bronson, Brigitte Fossey","RATING":null,"SYNOPSIS":"After serving together in the French Foreign Legion, a mercenary and a doctor leave the service and go their separate ways. Later, they are reunited by a coincidence. The doctor has made a promise to a friend which involves his breaking into a safe to return some improperly removed bearer bonds. When he hides in an office building to accomplish his task, he is followed by the mercenary, who is out to steal the contents of the safe. Locked inside the building together, they reluctantly agree to cooperate in cracking the safe. However, surprises await them both and in the end, they both must rely on 'the honor among thieves' to straighten everything out.","WRITER":"Jean Herman (screenplay), Sébastien Japrisot (dialogue)","TRAILER_LINK":"https://www.youtube.com/embed/C2ktnDS18aA","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/honoramongthieves/"}),
App.Movies.create({"id":35,"FILM_TITLE":"Hooch & Daddy O","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/hooch-_-daddy-o.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Hooch_%26_Daddy-O_x264_512kb.m4v","GENRE":"Comedy","DIRECTOR":"Donna Northcott","ACTORS":"Chris Anich, Jim Ousley, Amy Elz","RATING":null,"SYNOPSIS":"A documentary crew explores the pop culture impact of the 80's cop show 'Hooch & Daddy-O' and what happens when the cast reunites to film a made for TV movie. ","WRITER":"Oscar Madrid (story and screenplay), Oscar Madrid (story and screenplay), Donna Northcott (story)","TRAILER_LINK":"https://www.youtube.com/embed/H9SIi5upJtU","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/hoochandday/"}),
App.Movies.create({"id":37,"FILM_TITLE":"IceBreaker","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/icebreaker.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Icebreaker_SD_x264_512kb.mp4","GENRE":"Comedy","DIRECTOR":"Chad Martin","ACTORS":"Eric Lee, Sasha Andreev, Emily Fradenburgh, Justen Overlander","RATING":null,"SYNOPSIS":"Gary just wants a date. But his confidence has taken a hit after three straight years of rejection. Now he sets his sights on Lindsay. Will she finally break his streak and give him a chance, or will she be one more name to add to his list of rejections? With help from his friends Eric and Roach, he intends to find out.\nSam just wants an adult relationship. But Keith, her boyfriend of two years, is a little slow on the uptake. Should Sam move on and subject herself to an onslaught of idiot men in search of a better fit, or is it just safer to 'settle' and stay with Keith? ","WRITER":"Chad Martin","TRAILER_LINK":"https://www.youtube.com/embed/6lR3yc2vogw","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/icebreaker/"}),
App.Movies.create({"id":38,"FILM_TITLE":"In Plain Sight","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/in-plain-sight.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/In_Plain_Sight_x264_512kb.m4v","GENRE":"Comedy","DIRECTOR":"Brian Cavallaro","ACTORS":"Todd Lawhorne, Nicole Henry, Don Fowler","RATING":null,"SYNOPSIS":"All bad things must come to an end...Time is short and money's big for campus 'hit man' Daulton Monroe. He's losing his old partner, training a new one, and falling in love with a bartender/lounge-singer/journalist. During the biggest job of his career, the hunter becomes the hunted as someone attempts to manipulate his shadowy operation. Everyone's a suspect! No one has a clue! And the only place to hide is In Plain Sight.","WRITER":"Don Garvey (story and written by), Mike Connelly (story and written by) and Brian Cavallaro (written by)","TRAILER_LINK":"https://www.youtube.com/embed/HmBcUkZ5MYs","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/inplainsight/"}),
App.Movies.create({"id":39,"FILM_TITLE":"In The Cage","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/in-the-cage.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/In_The_Cage_X264_512KB.m4v","GENRE":"Comedy","DIRECTOR":"Menetie T. Ejeye","ACTORS":"Andrew J McGuinness, Elsi Eng, Tamara Goodwin","RATING":null,"SYNOPSIS":"Marvin Fields is caught up with challenges and obstacles. On the verge of losing his family, he has to step up and face his adversaries. Marvin tries different avenues to help eliminate these difficulties, but his efforts are futile. Now, he decides to take desperate measures in saving his family and finances. When hell breaks loose and nothing seems to work, a true character is revealed through Marvin. Later on, Marvin discovers martial arts through his best friend Frank Biggs. This martial art will help Marvin find himself again and give him a sense of purpose. As he continues to search deeper his new found art, his troubles aren't stagnant. Marvin still has to wake up and face the demons of his life. Marvin has got to get his life out of this never diminishing cage and find freedom. In the meantime, Claire Fields (Marvin's wife) is fed up and tired of supporting the family. Marvin's cage seems invisible to Claire, and this continues to trigger his frustration. In the end, true love and friendship will be revealed and seem to help break down the barriers around this mysterious cage.","WRITER":"Menetie T. Ejeye ","TRAILER_LINK":"https://www.youtube.com/embed/Fi4cxQcbfvY","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/inthecage/"}),
App.Movies.create({"id":40,"FILM_TITLE":"In The Land Of Milk & Money","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/in-the-land-of-milk-and-money.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/In_The_Land_Of_Milk_And_Money_x264_512kb.m4v","GENRE":"Comedy","DIRECTOR":"Susan Emshwiller","ACTORS":"Chris Coulson, Kim Gillingham, Tom Bower","RATING":null,"SYNOPSIS":"When a breed of cows with untested genetic alterations is released to the American dairy business, the result is disastrous. Their milk turns Mothers everywhere into uncontrollable killing machines. What will this do to the American Way of life, not to mention the Economy? Scientist Peter Cochran may have found a cure � but corporate interests may force him to keep it quiet. Peter and his old flame, Reporter Laurie Shallot, may be the only hope for restoring normalcy to Idyllic Suburbia, but time is running out!","WRITER":"Susan Emshwiller","TRAILER_LINK":"https://www.youtube.com/embed/Jj2qp66IMfk","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/landofmilkandhoney/"}),
App.Movies.create({"id":41,"FILM_TITLE":"Insignificant Other","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/insignificant-other.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Insignificant_Other_x264_512kb.m4v","GENRE":"Family","DIRECTOR":"Sean Corrigan","ACTORS":"Laura Clifton, Brandon Howe and Jessica Schwartz","RATING":null,"SYNOPSIS":"Insignificant Other', a Hitchcockian version of Sex and the City, follows the intersecting lives of two couples having extramarital affairs, who live lives of paranoia, wondering if their significant other has found out. It is a dark comedy that challenges the traditional ideas of marriage and questions the societal values of money and sex. Sarah, an unfulfilled, calculating wife, takes pleasure in having her voyeuristic lover watch her on video cameras that she has hidden inside the vents of her house. Her lover, a psychiatrist twice her age, becomes twisted in Sarah's sordid plot to kill her husband for his large inheritance. The plan slowly unravels when Sarah and her lover suspect that her husband has found out. ","WRITER":"Sean Corrigan","TRAILER_LINK":"https://www.youtube.com/embed/98wkAIoTbh0","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/insig-other/"}),
App.Movies.create({"id":42,"FILM_TITLE":"Jack Logan","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/jack-logan.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Jack_Logan_x264_512kb.mp4","GENRE":"Drama","DIRECTOR":"Al Carter","ACTORS":"Melissa Hansen, Spencer Strickland","RATING":null,"SYNOPSIS":"Weekend camping trip to the beach turns tragic once an ancient evil is awakened.","WRITER":"","TRAILER_LINK":"https://www.youtube.com/embed/jCR-MSXPliE","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/jacklogan/"}),
App.Movies.create({"id":43,"FILM_TITLE":"Little Big Man","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/little-big-man.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Little_Big_Man_1970_sd_x264_512kb.mp4","GENRE":"Action","DIRECTOR":"Arthur Penn","ACTORS":"Dustin Hoffman, Faye Dunaway, Chief Dan George","RATING":null,"SYNOPSIS":"Jack Crabb, looking back from extreme old age, tells of his life being raised by Indians and fighting with General Custer.","WRITER":"Thomas Berger (novel), Calder Willingham (screenplay)","TRAILER_LINK":"https://www.youtube.com/embed/0NiMmpf31QY","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/littlebigman/"}),
App.Movies.create({"id":44,"FILM_TITLE":"Losers of the Year","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/losers-of-the-year.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Losers_Of_The_Year_x264_512kb.m4v","GENRE":"Drama","DIRECTOR":"Ken Bogardt","ACTORS":"David M. Zuber, Amanda Bernen & Kristina Erikson","RATING":null,"SYNOPSIS":"Losers of the Year</i> is a teen Comedy about a boy named Herman, an innocent sheltered boy who has been home-schooled by his loving, over-protective mother all his life. Forced to attend public high school in his senior year, Herman faces the realities of friendship for the first time. He falls in love with the popular girl in school and wishes to impress her; however, his appearance, in terms of style, is less than appealing.","WRITER":"Ken Bogardt, Robert L. Brodmerkel","TRAILER_LINK":"https://www.youtube.com/embed/lL6WYHc1ZV4","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/losersoftheyear/"}),
App.Movies.create({"id":45,"FILM_TITLE":"Lost At War","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/lost-at-war.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Lost_at_War_SD_Constant.mp4","GENRE":"Thriller","DIRECTOR":"David A. Prior","ACTORS":"Jim Marlow, Ted Prior, Adam Stuart, James Brinkley, Johnny Ramoni","RATING":null,"SYNOPSIS":"This is a Twilight Zone type story that involves five soldiers out on a mission. And they soon find themselves stuck in a foxhole in an apparently deserted camp. Then strange things begin to happen. For one they are surrounded by strange creatures shrouded in black who do not fire on them or attempt to hurt them in any way but still they stay out there watching, almost as if waiting for something. And this, along with other things that happen, cause these men to question weather they are alive or dead. And that is where their struggle begins. Exploring the age old question of fate and if it is something that is written in stone or is it something we as people can affect. One by one, four of these five men give in to fate as it were and walk off into the woods never to be seen again, but Captain Jason Briggs will not give up for any reason and in the end it is up to him alone to fine out if he can truly change his own fate.","WRITER":"David A. Prior","TRAILER_LINK":"https://www.youtube.com/embed/NFyvoi3FbgA","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/lostatwar/"}),
App.Movies.create({"id":46,"FILM_TITLE":"Making Something Up","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/making-something-up.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Making_Something_Up_x264_512kb.m4v","GENRE":"Family","DIRECTOR":"Paul Kinney","ACTORS":"Paul Kinney, Elisabeth Nunziato, Rachel Songer, Paul Robins, Phil Cowan and Eric Jay Decetis","RATING":null,"SYNOPSIS":"A �feel good� romantic Comedy about children�s book writer Jack Payne (Paul Kinney), the most anal retentive man in the world, and his struggles with professional success, personal significance, and his over-demanding book editor/fianc� Amanda Keyes (Elisabeth Nunziato). Comlpications arise when Jack unexpectedly falls for Jennifer(Rachel Songer), an unemployed single mom running from a relationship gone bad, and in a hilarious scene he and his friends (Paul Robins, Phil Cowan and Eric Jay Decetis)attempt to help her by �making up� her funeral.\nDirector and Writer: Stars: ","WRITER":"Paul Kinney","TRAILER_LINK":"https://www.youtube.com/embed/LbFidTgOuoQ","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/makingsomthingup/"}),
App.Movies.create({"id":47,"FILM_TITLE":"Missing Link","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/missing-link.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Missing_Link_x264_512kb.m4v","GENRE":"Comedy","DIRECTOR":"Ger Poppelaars","ACTORS":"Tamar Van Den Dop, Johan Leyson, Nick Van Buiten","RATING":null,"SYNOPSIS":"A young boy develops a passion for archeology and tries to unravel the truth about his ancestry.","WRITER":"Timo Veltkamp (story and written by), Ger Poppelaars (written by), Pierre De Clercq (script doctor)","TRAILER_LINK":"https://www.youtube.com/embed/bIOggBfmDWg","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/missing+link/"}),
App.Movies.create({"id":48,"FILM_TITLE":"Mouse Trap","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/mouse-trap.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Mouse_Trap_x264_512KB.mp4","GENRE":"Drama","DIRECTOR":"Richard Poche ","ACTORS":"Regina Fletcher, Jennifer Jayne, Cliff Poche","RATING":null,"SYNOPSIS":"Eric is about to be married to a 'daddy's girl' named Linda. He feels the noose tightening around his neck in addition to chain with the ball attaching itself to his ankles. All of this suffocating marriage talk makes him vulnerable to the feminine wiles of Erika. After Erika seduces him, Eric finds himself at the receiving end of a blackmailing scheme with only one way out. ","WRITER":"Richard Lloyd Evans ","TRAILER_LINK":"https://www.youtube.com/embed/92T4nLSOZzY","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/mousetrap/"}),
App.Movies.create({"id":49,"FILM_TITLE":"Murder in the Orient","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/murder-in-the-orient.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Murder_In_The_Orient_x264_512kb.mp4","GENRE":"Horror","DIRECTOR":"Manuel Songco (as Maning Songco)","ACTORS":"Ronald L. Marchini, Leo Fong, Eva Reyes","RATING":null,"SYNOPSIS":"American secret agent Paul Marcelli must get his hands on two very valuable samurai swords with the help of a Martial Arts Master. They face much violent opposition throughout their mission.","WRITER":"Manuel Songco","TRAILER_LINK":"https://www.youtube.com/embed/ASvurcsPHck","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/murderintheorient/"}),
App.Movies.create({"id":50,"FILM_TITLE":"Mutation ","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/mutation.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Mutation_x264_512kb.mp4","GENRE":"Drama","DIRECTOR":"Brad Sykes","ACTORS":"John-Damon Charles, Eddie Croft, Katie Featherston","RATING":null,"SYNOPSIS":"'K' was the most infamous serial killer of his day, torturing and murdering dozens of innocent victims. Until Detective Steve Gornick, tracked the maniac down and destroyed him. Years later, a brilliant young scientist injects K's corpse with an experimental serum, bringing the killer back to life and giving him superhuman strength and speed. As K cuts a bloody path through Los Angeles, he begins to mutate into an unstoppable force of evil. Even the detective who once put him down may not be able to destroy the monstrous MUTATION.","WRITER":"Brad Sykes","TRAILER_LINK":"https://www.youtube.com/embed/JUKmZWP4CDM","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/mutation/"}),
App.Movies.create({"id":51,"FILM_TITLE":"Nobody Knows Anything","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/nobody-knows-anything.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Nobody_Knows_Anything_x264_512kb.m4v","GENRE":"Action","DIRECTOR":"William Tannen","ACTORS":"Linda Black, Alan Blumenfeld, Carmine Caridi, Mike Myers, Janeane Garofalo, Ben Stiller","RATING":null,"SYNOPSIS":"Making a movie in Hollywood looked easy, especially when you're a sexy aspiring film maker. Sarah Wilder arrives in Hollywood ready to start her career by making her first picture. Sarah's only contact is her Uncle Lou who was a screenwriter in the old days of the studio system. With his guidance and connections, she embarks on a wild journey into the world of Hollywood, where she encounters crazy studio executives, insane producers, and a gangster who agrees to finance her film ... for a price.","WRITER":"David Pasquesi","TRAILER_LINK":"https://www.youtube.com/embed/EYdAsfXd3EE","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/nobodyknowsanything/"}),
App.Movies.create({"id":52,"FILM_TITLE":"Normal, California ","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/normal-california.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Normal_California_x264_512KB.mp4","GENRE":"Action","DIRECTOR":"Lia Scott Price","ACTORS":"Joey Ditomo, Miles Eastham, Scott Edgecumbe","RATING":null,"SYNOPSIS":"In a town called Normal, California, the population is dropping....fast. That's because someone's, well, 'making a killing'. How much would you pay to get rid of someone? And who would you hire to do it? Meet Gwen, housewife-turned serial killer/hit person-for-hire. Her husband Carl is on drugs, he's lost his job, and, desperate for cash, Gwen's unsuccessful attempts at finding a job force her to start a very unusual home business. She teams up with Crusher, a fanatical car-wrecking yard owner, and they find a niche in getting rid of people who make life miserable. And they are not at a loss for customers who are all willing to pay high prices for discreet disposal of people they want out of their lives. Looks like life in Normal, California, isn't so normal after all. Horror/SciFi novelist Lia Scott Price directs and self-produced this quirky dark comedy. ","WRITER":"Lia Scott Price","TRAILER_LINK":"https://www.youtube.com/embed/jc_firRe7MI","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/naormal+california/"}),
App.Movies.create({"id":53,"FILM_TITLE":"Our Italian Husband","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/our-italian-husband.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Our_Italian_Husband_x264_512kb.mp4","GENRE":"Comedy","DIRECTOR":"Ilaria Borrelli ","ACTORS":"Maria Grazia Cucinotta, Brooke Shields, Chevy Chase","RATING":null,"SYNOPSIS":"An Italian female shoemaker follows her husband to America with their son & daughter. She couldn't find him at first then she discovers that he is married to an American wife who is expecting. After some wrangling they manage to live under the same roof for some time. ","WRITER":"Ilaria Borrelli (screenplay)","TRAILER_LINK":"https://www.youtube.com/embed/deh60tEAT1M","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/ouritalian/"}),
App.Movies.create({"id":54,"FILM_TITLE":"Preaching to the Perverted","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/preaching-to-the-perverted.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Preaching_To_The_Perverted_x264_512KB.mp4","GENRE":"Action","DIRECTOR":"Stuart Urban","ACTORS":"Guinevere Turner, Christien Anholt and Tom Bell","RATING":null,"SYNOPSIS":"Minister on a moral crusade employs young computer whizzkid Peter to infiltrate the London S&M scene. Peter has to gather evidence of physical 'assaults' in order for the Minister to prosecute and shut the scene down. But Peter gets unwittingly drawn into it and falls for the Mistress Tanya Cheex. ","WRITER":"Stuart Urban","TRAILER_LINK":"https://www.youtube.com/embed/-LM4usUd0Qs","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/preachingtothepreverted/"}),
App.Movies.create({"id":55,"FILM_TITLE":"Running Springs","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/running-springs.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Running_Springs_x264_512kb.m4v","GENRE":"Action","DIRECTOR":"Wil Castillo","ACTORS":"Elisa Nixon, Erica Shaffer, Dennis Y. Takeda","RATING":null,"SYNOPSIS":"Ethan, Zach, and Grant converge at a mountain home for one last hurrah before Zach finally weds his fianc�e, Laura. The three have remained friends since their college days and now find themselves surviving at different stages in their relationships with 'the significant others'. Tensions soon rise as a unique connection between the six is quickly revealed -- not to mention the deep-rooted problems within each of them that have not yet been dealt with. How each person deals with the situation has a huge impact on who will stay together and who will go their separate ways. For some, love brings a glimmer of hope. For others, sometimes love just isn't enough. And for the rest, they're still left searching for that certain someone. All it takes is one weekend. ","WRITER":"Wil Castillo, Kipp Tribble","TRAILER_LINK":"https://www.youtube.com/embed/n400UHyh5Aw","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/runningsprings/"}),
App.Movies.create({"id":57,"FILM_TITLE":"Sam & Janet","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/sam-_-janet.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Sam_%26_Janet_x264_512kb.m4v","GENRE":"Comedy","DIRECTOR":"Rick Walker","ACTORS":"Gary Busey, Jennifer Ferguson and Ryan Brown","RATING":null,"SYNOPSIS":"BASED ON A TRUE STORY\nSam has been in high demand since the end of his miserable, six year marriage. He's smart, good looking and athletic, but his search for the relationship has come up empty. Until he meets and falls in love with Janet. Together, they embark on a perfect one year relationship. Sam fights it, but if he's ever going to give marriage another shot, Janet's the one. . .until he discovers their entire existence has been one big lie.","WRITER":"Rick Walker","TRAILER_LINK":"https://www.youtube.com/embed/wUoysYLaSD8","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/samandjanet/"}),
App.Movies.create({"id":58,"FILM_TITLE":"Savage Dawn","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/savage-dawn.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Savage_Dawn_1985_SD_x264_512kb.mp4","GENRE":"Drama","DIRECTOR":"Simon Nuchtern","ACTORS":"George Kennedy, Richard Lynch, Karen Black","RATING":null,"SYNOPSIS":"A motorcycle gang invades a small desert town, terrorizing everyone. Nobody's able to stop them until an ex-Vietnam combat hero arrives to visit a friend. Although he'd hoped there would be no more violence in his life, he finds it impossible to ignore the confrontational behavior of the bikers and gives them more than they can handle when he starts striking back.","WRITER":"Max Bloom, Bill Milling (as William P. Milling)","TRAILER_LINK":"https://www.youtube.com/embed/l7nXaR__Dok","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/savaedawn/"}),
App.Movies.create({"id":59,"FILM_TITLE":"Secrets ","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/secrets.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Secrets_x264_512kb.m4v","GENRE":"Action","DIRECTOR":"Kemal Yildirim","ACTORS":"Helen Clifford, Jack Marsden and Rami Hilmi","RATING":null,"SYNOPSIS":"Six friends who share life like family bound by their love for each other and by their desire to party. Vania the party girl who pushes her life to the limit while trying to hide her plethora of emotional baggage and hide her true feelings for one of her friends. Lane a high profile businessman who�s constant desire to impress Vania is pushing him to his breaking point. Tamer Vania�s best friend loves to be loved a lady�s man whose insensitivity towards others doesn�t go unnoticed. Eloise the voice of the group everyone�s shoulder but is yearning to be heard Sabri Eloise�s first love is blind to her wants because he is wrapped up with life and with his friends. Ivy is Sabri�s best friend and baby of the group her fling with Tamer has left its mark on them both Ivy can�t deal with Tamer�s feelings for her as she still yearns the love of her dead boyfriend. The secrets and hidden passions amongst the group grows until one day the secrets surface and can hide no more.","WRITER":"Kemal Yildirim","TRAILER_LINK":"https://www.youtube.com/embed/5MvQHB_vEq0","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/secrets/"}),
App.Movies.create({"id":60,"FILM_TITLE":"Short & Curly ","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/short-_-curly.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Short_%26_Curly_x264_512kb.mp4","GENRE":"Action","DIRECTOR":"Mark Fruda","ACTORS":"Abigail Bianca, Steven Bisilas, Jason Chan","RATING":null,"SYNOPSIS":"Four friends, who are driving down the coast for a holiday, have their plans interrupted when a man, gagged and bound, jumps in their car. They are presented with a difficult choice: help the stranger escape his captors or leave the man to his inevitable fate. Their choice sets off a chain of events as the stranger is found dead and the four friends are implicated for murder. With police, mobsters, politicians, and a fruitier all after them, the guys can trust no-one. . .not even each other.","WRITER":"","TRAILER_LINK":"https://www.youtube.com/embed/246b-5bj4N4","Smallpicture":""}),
App.Movies.create({"id":61,"FILM_TITLE":"Sinners","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/sinners.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Sinners_x264_512kb.mp4","GENRE":"Thriller","DIRECTOR":"Xavier Barquet","ACTORS":"Joe Marino, Sandrine Legallic, Eva Neide","RATING":null,"SYNOPSIS":"Growing up on the streets of Miami, orphans Rizzo and Drake vow to remain lifelong friends. But, years later, that pledge will be put to the test as the two, now adults, navigate the dangerous waters of the criminal underworld. Drug kingpins, $10 million in stolen diamonds, seductive beach babes and a deadly -- and drop-dead gorgeous -- Parisian assassin all come into play in director Xavier Barquet's sizzling action thriller. ","WRITER":"Xavier Barquet","TRAILER_LINK":"https://www.youtube.com/embed/ofloKpd1oxc","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/sinners/"}),
App.Movies.create({"id":62,"FILM_TITLE":"Sojourn","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/sojourn.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Sojourn_x264_512kb.m4v","GENRE":"Documentary","DIRECTOR":"Ronan Linder","ACTORS":"Dave Bennet, Muriel Bonertz and Will Bryant","RATING":null,"SYNOPSIS":"Jim Ronan, a failed hockey player, heads to his small Minnesota hometown in search of the accolades and admiration he once enjoyed there. He goes there to heal his body and to rebuild his shattered image. But what he realizes when he gets there is that not everyone still believes in his dream. His father, the retired player now family doctor; his mother, sick with cancer; and his ex-girlfriend, the kindergarten teacher at the local school have all moved on forcing Jim to come face to face with himself and his troubled past before he can decide if he still loves hockey.","WRITER":"Ronan Linder","TRAILER_LINK":"https://www.youtube.com/embed/G-UhekKFLE0","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/sjourn/"}),
App.Movies.create({"id":63,"FILM_TITLE":"Song of Songs","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/song-of-songs.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Song_Of_Songs_x264_512kb.m4v","GENRE":"Action","DIRECTOR":"Tobin Smith","ACTORS":"Kiki Teague, Kevin Otto, Aaron Norvell","RATING":null,"SYNOPSIS":"Jolene, an up and coming musician, manipulates her way into traveling with her roommate, Josh, on his haphazard trip from Austin to Los Angeles to find his 'perfect woman'. Little does Josh know that his perfect woman is actually right under his radar.","WRITER":"Don Teague","TRAILER_LINK":"https://www.youtube.com/embed/_bnAMyvFe-k","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/songofsongs/"}),
App.Movies.create({"id":64,"FILM_TITLE":"Stained Glass Windows","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/stained-glass-windows.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Stained_Glass_Windows_x264_512kb.mp4","GENRE":"Drama","DIRECTOR":"William L. Brown","ACTORS":"Christopher Atkins, Emelie O'Hara, Sheila Ivy Traister","RATING":null,"SYNOPSIS":"After suffering abuse from her boyfriend and bullying at school, goth girl Cherry turns to martial arts to create a new life for herself. As she becomes stronger in body and spirit, she finds herself drawn to a new kind of life. Cherry begins to rid herself of her unhealthy relationships and comes to terms with her nascent homosexuality.","WRITER":"Sheila Ivy Traister, William L. Brown ","TRAILER_LINK":"https://www.youtube.com/embed/-b5Ecp4MafQ","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/stainedglass/"}),
App.Movies.create({"id":65,"FILM_TITLE":"Stash","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/stash.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Stash_x264_512kb.m4v","GENRE":"Comedy","DIRECTOR":"Jay Bonansinga","ACTORS":"Tim Kazurinsky, Marilyn Chambers, Brian King, and Mary Kay Cook","RATING":null,"SYNOPSIS":"STASH follows the misadventures of Jimmy Fox (Brian King), a good-hearted nebbish, who hits on the business idea of a lifetime. For a modest fee, he and his cousin Bobby (Will Clinger) come to your home (in the event of your death) and secretly remove all your porn before your spouse or children have a chance to find it. Jimmy calls the process �PMR� (post mortem retrieval).\nBut major trouble is on the horizon. Jimmy�s long suffering wife Alice (Mary Kay Cook), is at her wits end. Jimmy�s in-laws, the Bookenlachers (Marilyn Chambers and Tim Kazurinsky), are threatening legal Action. But it all finally comes to a head when a mysterious client known only as Mister X (Jim Carrane) walks through Jimmy�s door. A sinister-looking children�s entertainer, a man obsessed with clowns, Mister X touches off a deep-rooted vein of paranoia within Jimmy But when Jimmy finally works up the nerve to sneak into Mister X�s basement crawlspace, the story takes an unexpected turn. In the end, Jimmy learns that nothing is as it seems. Steeped in pitch black satire, told in the style of mock Documentary, STASH is a delicate balance of character richness and knife-edged parody. ","WRITER":"Jay Bonansinga","TRAILER_LINK":"https://www.youtube.com/embed/Rxndceioafg","Smallpicture":""}),
App.Movies.create({"id":66,"FILM_TITLE":"Stolen Good","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/stolen-good.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Stolen_Good_x264_512kb.m4v","GENRE":"Action","DIRECTOR":"Russ Jaquith and Natasha Sarris","ACTORS":"Jason Wordal, Russ Jaquith, Kirk Warner","RATING":null,"SYNOPSIS":"Shot on location amid the gorgeous backdrops of New Zealand's southern Alps, the mighty Sierras of Lake Tahoe, oceanside on Cape Cod and the California coasts, Stolen Good is a spectacularly beautiful movie filled with the non-stop action of screeching stolen cars, helicopter riding at 12,000 feet and amazing stunt work of professional snowboarders performed by the lead actors themselves. The director, Russ Jaquith, has lived the snowboarder lifestyle, photographed six films around the globe and captured the authentic lives of professional snowboarders. This film shares all of it: the danger, the adrenaline, the pursuit of pro rider glory and the consequences. ","WRITER":"Russ Jaquith and Natasha Sarris","TRAILER_LINK":"https://www.youtube.com/embed/TCL1aB-MIKw","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/stolengood/"}),
App.Movies.create({"id":67,"FILM_TITLE":"Streets of Wonderland ","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/streets-of-wonderland.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Streets_Of_Wonderland_x264_512kb.mp4","GENRE":"Drama","DIRECTOR":"Carey Lewis","ACTORS":"Ryan DiFrancesco, Logan Brown and Roberto Leon","RATING":null,"SYNOPSIS":"Niagara Falls has forever been masked behind the neon lights and the thunderous water of dreams and fantasy. 'Streets of Wonderland' strips away those facades and shows the city in a truthful light. Not everyone is winning big at the Casino, and not everyone is profiting off of the millions of tourists that flock to that city. Not everyone is on their honeymoon. Devlin Tully is a young man who only knows one way of life in this city; the life of survival. Everyone comes to this city to escape their problems, but where is he to go when his problems lie in the very city that people go to forget theirs. \nDevlin has blamed everyone for his current way of life; the city, the tourists, his Mother, his Father, and his friends. He soon realizes that the hatred that has built up inside him is only because of one person. Devlin Tully. How do you deal with the fact that you are actually the bad guy? That you're the one that has ruined your own life, and countless others? How do you deal with the fact that it is because of you that a lot of others are worse off for having known you? How do you live with yourself when you realize the person you hate the most is staring right back at you in the mirror? ","WRITER":"Ryan DiFrancesco (story), Carey Lewis (story and screenplay)","TRAILER_LINK":"https://www.youtube.com/embed/VwhchkPSYX4","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/streetsofwonderland/"}),
App.Movies.create({"id":68,"FILM_TITLE":"Ten Fingers Of Death","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/ten-fingers-of-death.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Ten_Fingers_Of_Death_x264_512kb.m4v","GENRE":"Martial Arts","DIRECTOR":"Mu Chu","ACTORS":"Jackie Chan, Siu Tien Yuen and Dean Shek","RATING":null,"SYNOPSIS":"Young Jackie was intrigued by Kung-Fu since an early age, but his father strictly forbade its practice. One day, he meets an old beggar who offers to teach Jackie how to fight. Jackie grows up to be quite good though he keeps his knowledge a secret.","WRITER":"Sun Liu","TRAILER_LINK":"https://www.youtube.com/embed/AJV9-OIBQwY","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/tenfingersofdeathg/"}),
App.Movies.create({"id":69,"FILM_TITLE":"The Bermuda Triangle","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/the-bermuda-triangle.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/The_Bermuda_Triangle_x264_512kb.m4v","GENRE":"Horror","DIRECTOR":"Rene Cardona Jr.","ACTORS":"John Huston, Andres Garcia and Hugo Stiglitz","RATING":null,"SYNOPSIS":"The passengers and crew of a boat on a summer cruise in the Caribbean stray near the famed Bermuda Triangle, and mysterious things start happening.","WRITER":"Stephen Lord (screenplay), Charles Berlitz (book), Stephen Lord (screenplay) and Carlos Valdemar (screenplay)","TRAILER_LINK":"https://www.youtube.com/embed/fIUBft7pwHE","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/thebermudatriangle/"}),
App.Movies.create({"id":70,"FILM_TITLE":"The Big Fight","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/the-big-fight.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/The_Big_Fight_x264_512kb.m4v","GENRE":"Martial Arts","DIRECTOR":"Shing Yuan Sun, Ting Mei Sung","ACTORS":"Ching Ching Chang, Peng Tien and Yuen Yi","RATING":null,"SYNOPSIS":"A Martial arts master accompanies a beautiful singer with equal kung fu abilities to an ultimate showdown.","WRITER":"Shing Yuan Sun (screenplay)","TRAILER_LINK":"https://www.youtube.com/embed/xPo9oZg0YTA","Smallpicture":""}),
App.Movies.create({"id":72,"FILM_TITLE":"The Comedy Jesus Show ","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/the-comedy-jesus-show.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/The_Comedy_Jesus_Show_Live_x264_512kb.mp4","GENRE":"Comedy","DIRECTOR":"Troy Conrad","ACTORS":"","RATING":null,"SYNOPSIS":"The Comedy Jesus Show follows Jesus -- played by tongue-in-cheek funnyman Troy Conrad -- armed with keen improv skills, a killer stand-up routine and a wicked PowerPoint presentation, devilishly sends up the dangerous hypocrisy of religion and politics. A former door-to-door Bible salesman, the Christian fundamentalist turned atheist shares several bold strategies for how we all can become better people in this hilarious blend of stand-up, sketch comedy and more.","WRITER":"","TRAILER_LINK":"https://www.youtube.com/embed/YyHfgvDSWs4","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/thejesuscomed/"}),
App.Movies.create({"id":73,"FILM_TITLE":"The Girl From Rio","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/the-girl-from-rio.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/The_Girl_From_Rio_x264_512kb.mp4","GENRE":"Action","DIRECTOR":"Jesus Franco (as Jess Franco)","ACTORS":"Shirley Eaton, Richard Wyler, George Sanders","RATING":null,"SYNOPSIS":"Sumuru, the beautiful leader of the all-female kingdom of Femina, plans to use her women to take over the world.","WRITER":"Bruno Leder, Sax Rohmer (characters), Franz Eichhorn, Harry Alan Towers","TRAILER_LINK":"https://www.youtube.com/embed/zPXjzZqTy4I","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/girlfromrio/"}),
App.Movies.create({"id":74,"FILM_TITLE":"The happy family","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/the-happy-family.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/The_Happy_Family_1952_sd_x264_512kb.mp4","GENRE":"Comedy","DIRECTOR":"Muriel Box","ACTORS":"Stanley Holloway, Kathleen Harrison, Naunton Wayne","RATING":null,"SYNOPSIS":"When the Government decide to build a Festival of Britain exhibition site, everything goes to plan, all except the fact that the main road and the pedestrian subway into the site, are blocked by a little corner shop, which is owned and run by a Mr. Lord and his family. When the Lords refuse to be bought off, and decline the compensation offered by the authorities. the police and the bailiffs try to evict them, only to come under fire from the family, who have barricaded themselves inside the shop.","WRITER":"Muriel Box, Sydney Box","TRAILER_LINK":"https://www.youtube.com/embed/Tk8ALFaVsOk","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/thehappyfamily/"}),
App.Movies.create({"id":75,"FILM_TITLE":"The Journey","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/the-journey.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/The_Journey_x264_512kb.m4v","GENRE":"Romantic Comedy","DIRECTOR":"Scott Marcano","ACTORS":"Andres Londono, Kaz Santana, Richard Dumont, Lilian Tapia, Sebastien Hinton, Manuel Urrego","RATING":null,"SYNOPSIS":"Steve, a young slacker who works at Target and suffers from acute video game addiction, is forced to grow up when his girlfriend Rhona dumps him and leaves for Mexico to study archeology. After a classic bout of denial and depression, Steve resolves to go on a journey through Mexico to find his soul mate and win her back. After crashing his car and wandering into a small town where a Mexican family kindly helps him regain his health, Steve begins to discover his Latino soul. Complications ensue, however, as he is robbed and starts receiving emails from ?Antonio? - a Latin Casanova who claims to be Rhona?s new lover. Led onward by a mysterious crow, Steve gradually develops the confidence to face his nemesis and arrives in Veracruz looking for Rhona. But is it too late? Has ?Antonio? already made his move? Or, will Steve discover his Aztec warrior spirit in time to win back his true love? Only the crow knows for sure?","WRITER":"Scott Marcano, Adriana Padilla","TRAILER_LINK":"https://www.youtube.com/embed/mFQS_8fSEu8","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/thejourney/"}),
App.Movies.create({"id":76,"FILM_TITLE":"The Line (aka La Linea) ","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/the-line.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/The_Line_x264_512kb.m4v","GENRE":"Action","DIRECTOR":"James Cotten","ACTORS":"Ray Liotta, Andy Garcia and Esai Morales","RATING":null,"SYNOPSIS":"The unstable new kingpin of a Tijuana drug cartel is targeted by an assassin for elimination.","WRITER":"R. Ellis Frazier","TRAILER_LINK":"https://www.youtube.com/embed/6k3LTHbr6U0","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/theline/"}),
App.Movies.create({"id":77,"FILM_TITLE":"The Private Eyes","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/the-private-eyes.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/The_Private_Eyes_x264_512kb.mp4","GENRE":"Comedy","DIRECTOR":"Lang Elliott","ACTORS":"Tim Conway, Don Knotts, Trisha Noble","RATING":null,"SYNOPSIS":"This spoof of the Sherlock Holmes stories finds Inspector Winship and Dr. Tart investigating a strange death in a possibly haunted mansion, while dealing with the beautiful heiress and the crazed staff which live therein.","WRITER":"Tim Conway, John Myhers","TRAILER_LINK":"https://www.youtube.com/embed/xqe99jKIzvs","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/theprivateeyes/"}),
App.Movies.create({"id":78,"FILM_TITLE":"The Socratic Method","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/the-socratic-method.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/The_Socratic_Method_SD_x264_512kbps.mp4","GENRE":"Drama","DIRECTOR":"George Hunlock, Mark Putnam","ACTORS":"Josh Renfree, Erica Shaffer, Jou Jou Papailler","RATING":null,"SYNOPSIS":"Set in a fictional law school and written by a California attorney, the independent Comedy feature 'The Socratic Method' follows the exploits of three first-year law students as they stagger their way through the pressure cooker that is legal education in America.","WRITER":"","TRAILER_LINK":"https://www.youtube.com/embed/yVPjBFg_0ME","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/thesocratic/"}),
App.Movies.create({"id":79,"FILM_TITLE":"The Sweepers","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/the-sweepers.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/The_Sweeper_x264_512kb.mp4","GENRE":"Action ","DIRECTOR":"","ACTORS":"","RATING":null,"SYNOPSIS":"","WRITER":"","TRAILER_LINK":"https://www.youtube.com/embed/_mjshy2ckRU","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/thesweepers/"}),
App.Movies.create({"id":80,"FILM_TITLE":"Through a Fisheye","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/through-a-fisheye.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Through_A_Fish_Eye_x264_512kb.mp4","GENRE":"Comedy","DIRECTOR":"Gerald Peterson","ACTORS":"Tara Baer, Ed Barry, Mark Bosler","RATING":null,"SYNOPSIS":"Fred Manfrey is wandering through life blissfully unaware that he is being guided by a higher power. Playing off the infamous 2002 Enron scandal, Enrob Inc., is the back drop for this comedic war of good versus evil.","WRITER":"Gerald Peterson","TRAILER_LINK":"https://www.youtube.com/embed/Vm-RdwIRDEA","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/fisheye/"}),
App.Movies.create({"id":81,"FILM_TITLE":"Thunder Over Reno","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/thunder-over-reno.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Thunder_Over_Reno_SD_x264_512kbps-1.mp4","GENRE":"Action ","DIRECTOR":"Mitch Carley","ACTORS":"Hawk Younkins, Natasha Yi, Bobby Aronofsky, Izabella St. James, Chris Foxworthy, Earle Ford","RATING":null,"SYNOPSIS":"Torn between big dreams and family loyalties, Butch Bandi (Hawk Younkins) joins Pete Squires (Bobby Aronofsky) after an argument over his plans with his widowed father, Owen Bandi (Christopher Foxworthy). Now in Reno, NV, Butch has his hands full with authority, payoffs, and possible love from Marti Jackman (Natasha Yi) and Paige Raider (Izabella St. James). Butch's toughest job might be staying alive during the final Gold Air Race at 500MPH, 50 feet off the deck.","WRITER":"Mitch Carley, Steven A. Jones","TRAILER_LINK":"https://www.youtube.com/embed/dodKhI49BJw","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/thunderoverreno/"}),
App.Movies.create({"id":82,"FILM_TITLE":"Thunder Warrior","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/thunder-warrior.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Thunder_Warrior_1983_x264_512kb.mp4","GENRE":"Action","DIRECTOR":"Fabrizio De Angelis (as Larry Ludman)","ACTORS":"Bo Svenson, Mark Gregory, Raimund Harmstorf","RATING":null,"SYNOPSIS":"A native America named Thunder returns home only to find that his ancestral burial ground is being destroyed by construction workers. He tries to put a stop to it, but the law is not only not on his side, but he is banished from town, beaten up, and left for dead. Now he wants his revenge...","WRITER":"Fabrizio De Angelis (screenplay) (as Larry Ludman) , Dardano Sacchetti (screenplay) (as David Parker Jr.)","TRAILER_LINK":"https://www.youtube.com/embed/dodKhI49BJw","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/thunderwarrior/"}),
App.Movies.create({"id":83,"FILM_TITLE":"Time to Pay","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/time-to-pay.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Time_To_Pay_x264_512kb.mp4","GENRE":"Action","DIRECTOR":"Doral Tavey","ACTORS":"Michelle Bonilla, Ron Dean, Wanda De Jesus","RATING":null,"SYNOPSIS":"An intimate family/crime drama with strong characters and complex story telling. A film of redemption, forgiveness and the price paid for the second chances. We follow ex-high school basketball star, Jackie Scanlon, recently released from prision, who returns home to past will let him. In the end he gets help from those he expected to help him in the past.","WRITER":"John Schafer","TRAILER_LINK":"https://www.youtube.com/embed/SSFgLDCYaIk","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/timetopay/"}),
App.Movies.create({"id":84,"FILM_TITLE":"T.N.T. Jackson","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/tnt-jackson.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/TNT_Jackson_SD_x264_512Kbps.mp4","GENRE":"Action","DIRECTOR":"Cirio H. Santiago","ACTORS":"Jeannie Bell, Chiquito, Stan Shaw, Max Alvarado","RATING":null,"SYNOPSIS":"Playboy Playmate Jeanne Bell stars as T.N.T. Jackson (??she?ll put you in trAction!?) in this popular blaxploitation film from Filipino director Cirio H. Santiago. Jackson Leaves Harlem for Hong Kong to find her missing brother, who has run afoul of the mob. Predictably, she must pose as a prostitute in order to find him, as well as engaging in topless karate. Santiago and his New World Pictures boss, Roger Corman, were so pleased with the film?s success that they essentially remade it twice more, as Firecracker in 1984 and as Angelfist in 1992.","WRITER":"Dick Miller, Ken Metcalfe","TRAILER_LINK":"https://www.youtube.com/embed/gyDyN5Ua5Z0","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/TNTjackson/"}),
App.Movies.create({"id":85,"FILM_TITLE":"Transformations ","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/transformations.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Transformations_x264_512kb.m4v","GENRE":"Drama","DIRECTOR":"Javier Molina & Edwin Decena","ACTORS":"Kenneth Browning, Joe Bartola, James Latin Clark, Carlos M Vasquez, Dominique Andrese, Zaq Coldly","RATING":null,"SYNOPSIS":"A fateful encounter between three friends and a suburban teen leads to a revenge-fueled scheme to oust a menacing local drug dealer. But as the scheme unfolds, their plans go awry, and things grow more intense and violent with every murder the friends leave in their wake. They must choose whether to embrace the world of sex, drugs, and violence that surrounds them, or to rise above it.","WRITER":"Javier Molina","TRAILER_LINK":"https://www.youtube.com/embed/Z3oS6eNWbGY","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/transformations/"}),
App.Movies.create({"id":86,"FILM_TITLE":"Triple Threat","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/triple-threat.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Triple_Threat_x264_512kb.m4v","GENRE":"Action","DIRECTOR":"Mark Vasconcellos","ACTORS":"Lorin Becker, Curt Bonnem, Kay West, Stephanie Stearns, Mark Vasconcellos, Steve Wiley, Mike Burchieri","RATING":null,"SYNOPSIS":"Ex-assassin Dina LoBianca, receives an offer she cannot refuse, thrusting her back into the world of hired guns, espionage and surveillance. With the help of her young sexy prot?g? and Dina?s new straight-laced love interest, the femme fatal uncovers a sinister plot involving murder, terrorism and international intrigue.","WRITER":"Mark Vasconcellos","TRAILER_LINK":"https://www.youtube.com/embed/lYbjEncCTYQ","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/triplethreat/"}),
App.Movies.create({"id":88,"FILM_TITLE":"Valdez Is Coming","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/valdez-is-coming.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Valdez_Is_Coming_1970_x264_512kb.mp4","GENRE":"Action","DIRECTOR":"Edwin Sherin","ACTORS":"Burt Lancaster, Susan Clark, Frank Silvera","RATING":null,"SYNOPSIS":"A Mexican-American sheriff must resort to violence against a powerful rancher in order to get just compensation for the pregnant Indian widow of a wrongly killed black man.","WRITER":"Roland Kibbee (screenplay), David Rayfiel (screenplay)","TRAILER_LINK":"https://www.youtube.com/embed/aOnjzONrLGU","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/valdez/"}),
App.Movies.create({"id":89,"FILM_TITLE":"Virus","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/virus.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Virus_x264_512kb.mp4","GENRE":"Action","DIRECTOR":"Kinji Fukasaku","ACTORS":"George Kennedy, Olivia Hussey, Glenn Ford, Robert Vaughn, Chuck Connors, Edward James Olmos","RATING":null,"SYNOPSIS":"A military-engineered virus, released during a plane crash, kills the entire human population. The only survivors are scientists in Antarctica, who desperately try to find a cure and save what is left of the planet from further destruction.","WRITER":"Koji Takada (screenplay), Kinji Fukasaku (screenplay), Gregory Knapp (screenplay) and Sakyo Komatsu (novel)","TRAILER_LINK":"https://www.youtube.com/embed/9oTHtuo2kPo","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/virus/"}),
App.Movies.create({"id":90,"FILM_TITLE":"Wait Your Turn ","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/wait-your-turn.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Wait_Your_Turn_SD_x264_512Kbps.mp4","GENRE":"Drama","DIRECTOR":"Ron Newcomb","ACTORS":"Kelly Hoelscher, Josh Murray, Amanda Agard, Eric Williams","RATING":null,"SYNOPSIS":"Unexpectedly, Thad MacArthur comes back into Eve Cassidy�s life after breaking her heart in college. This time, however, Eve is different. After much soul-searching, Eve has a whole new approach to her dating relationships. Now, they must decide whether they can put their rocky past behind them to build a future together.\nAs Eve and Thad struggle to make these important choices, they are influenced by two other couples who are also dealing with significant relationship issues. Matt and Liza must confront a mistake from their past that will affect their futures and try to determine if they are really compatible for life.As each couple faces these decisions of love and life, they finally realize that the right person is out there if they simply wait their turn.","WRITER":"Maude von Ehrenkrook","TRAILER_LINK":"https://www.youtube.com/embed/0u3fZ8ju3Ng","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/waityourturn/"}),
App.Movies.create({"id":91,"FILM_TITLE":"Warrior of the Lost World","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/warrior-of-the-lost-world.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Warrior_Of_The_Lost_World_1983_x264_512kb.mp4","GENRE":"Sci-Fi","DIRECTOR":"David Worth","ACTORS":"Robert Ginty, Persis Khambatta, Donald Pleasence","RATING":null,"SYNOPSIS":"A nomad mercenary on a high-tech motorcycle helps bring about the downfall of the evil Orwellian government, the Omega.","WRITER":"David Worth","TRAILER_LINK":"https://www.youtube.com/embed/s8WJLShCJ3M","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/warrioroflostworld/"}),
App.Movies.create({"id":92,"FILM_TITLE":"Whatever Makes You Happy","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/whatever-makes-you-happy.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Whatever_Makes_You_Happy_SD_x264_512Kbps.mp4","GENRE":"Drama ","DIRECTOR":"A.T. Sayre","ACTORS":"Rachel Delante, Tyler Peck and Alex Aspiazu","RATING":null,"SYNOPSIS":"Exploring the all too common trappings of dissatisfaction and infidelity in the relationships of urban twenty somethings, 'Whatever Makes You Happy' tells the story of Anna and Alex, two fundamentally different people. Anna is a practical and bookish grad student. She lives a comfortable, yet safe life of study, friends, and her long time boyfriend Kevin. Alex is a laid back musician, living the carefree urban hipster lifestyle, perfectly happy to coast through life unencumbered or work too hard for anything. Everything changes when by chance Anna and Alex meet through friends and connect in a way neither of them expected. This unlikely pair start a fiercely heated affair, putting both of their worlds in jeopardy. Is what they have together enough to survive the damage it causes?","WRITER":"A.T. Sayre","TRAILER_LINK":"https://www.youtube.com/embed/lIo6fEwr624","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/whatevermakesyouhappy/"}),
App.Movies.create({"id":94,"FILM_TITLE":"Who Wants to Marry My Husband?","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/who-wants-to-marry-my-husband.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Who_Wants_To_Marry_My_Husband_x264_512kb.m4v","GENRE":"Comedy","DIRECTOR":"Anne Martinot","ACTORS":"Christine Decker, David Cooper, Geri Mansfield","RATING":null,"SYNOPSIS":"After thirty years of marriage, Clarie is fed up with her husband Jack's philandering. She wants to move on and find her own identity. Before she begins divorce proceedings, Claire decides to find the perfect woman for Jack listing the aid of her mother, daughter, and a friend who runs a professional dating service, Claire discovers that her plan for Jack takes on an unexpected twist.","WRITER":"Jon Freda","TRAILER_LINK":"https://www.youtube.com/embed/OT9cRPY7nEU","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/whowantstomarrymyhusband/"}),
App.Movies.create({"id":95,"FILM_TITLE":"Windstorm","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/windstorm.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Windstorm_SD_x264_512Kbps.mp4","GENRE":"Drama","DIRECTOR":"Kevin Kane","ACTORS":"William Beauhuld, Scott Ciampi, Sandra Gianozakos, Jasmine Kim, Dennis Luciani","RATING":null,"SYNOPSIS":"Chaos. Disease. War and rumors of war throughout the world. Is this the end? For a group of strangers caught together fleeing Los Angeles, the answers are not so clear. And as the group takes shelter in the midst of a storm, one thing becomes apparent? the dangers of the world outside are nothing compared to what dwells among them in the shelter.","WRITER":"Kevin Kane","TRAILER_LINK":"https://www.youtube.com/embed/zjpEIyLF5Ww","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/windstorm/"}),
App.Movies.create({"id":96,"FILM_TITLE":"Wonder Women","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/wonder-women.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Wonder_Women_1973_x264_512kb.mp4","GENRE":"Action","DIRECTOR":"Robert Vincent O'Neill (as Robert O'Neil)","ACTORS":"Nancy Kwan, Ross Hagen, Maria De Aragon","RATING":null,"SYNOPSIS":"An insurance investigator battles Dr. Tsu and her sexy all-girl army.","WRITER":"Robert Vincent O'Neill (adaptation) (as Robert O'Neil) , Lou Whitehill","TRAILER_LINK":"https://www.youtube.com/embed/B3seKLKMoMQ","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/wonderwomen/"}),
App.Movies.create({"id":97,"FILM_TITLE":"Zombie Wars","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/zombie-wars.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Zombie_Wars_SD_x264_512kbps.mp4","GENRE":"Horror","DIRECTOR":"David A. Prior","ACTORS":"Adam Stuart, Alissa Koenig, Jim Marlow, Kristi Renee Pierce","RATING":null,"SYNOPSIS":"Nobody knows exactly how it happened. Some think it was the tail of a comet that passed to close too the earth, while others believed that it was simply time for man to atone for thousands of years of sinning. Whatever the reason, the dead had risen from the ground, and they were hungry! After years of war only small rebel bands of humans remain in the war against the undead. When Brian, the leader of a military group, is captured by the enemy he is taken to a nearby farm where he learns of a horrific secret -- the zombies are farming groups of humans and harvesting them as food. Now it is up to Brian to organize an uprising and reclaim the freedom of his fellow humans. However, once the battle is over an even more insidious secret waits in the nearby town...","WRITER":"David A. Prior","TRAILER_LINK":"https://www.youtube.com/embed/nh0Lv0BHVO4","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/zombiewars/"}),
App.Movies.create({"id":98,"FILM_TITLE":"Zorro","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/zorro.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Zorro_x264_512kb.m4v","GENRE":"Comedy","DIRECTOR":"Duccio Tessari","ACTORS":"Alain Delon, Stanley Baker and Ottavia Piccolo","RATING":null,"SYNOPSIS":"A newly arrived governor finds his province under the control of the corrupt Colonel Huerta. To avoid assassination by Huerta, he pretends to be weak and indecisive, so Huerta will believe he poses no threat. But secretly he masquerades as Zorro, and joins the monk, Francisco, and the beautiful aristocrat, Hortensia, in their fight for justice against Huerta and his soldiers.","WRITER":"Giorgio Arlorio (story and screenplay) ","TRAILER_LINK":"https://www.youtube.com/embed/F-NYt3nXfpM","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/zorro/"}),
App.Movies.create({"id":99,"FILM_TITLE":"Zulu","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/zulu.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Zulu_x264_512kb.m4v","GENRE":"Action","DIRECTOR":"Cy Endfield","ACTORS":"Stanley Baker, Jack Hawkins, Ulla Jacobsson, James Booth","RATING":null,"SYNOPSIS":"A Towering Cinematic Achievement. An Astonishing true story. And ?A Battle Film in the grand tradition of Four Feathers And Gunga Din? (Time)! Filmed against the exotic locales of Africa, and starring Stanley Baker (The Guns of Navarone), Jack Hawkins (Lawrence of Arabia) and Michael Caine (in his first major motion picture role), Zulu is a thrilling account of one of history?s fiercest battles!\nAs a terrifying war chant echoes across the majestic African plains, 4,000 Zulu tribesmen rise up from the tall grass that hides them. Furiously beating their swords against their shields, the warriors descend upon a small garrison of English soldiers. ?Usuto! Usuto! (Kill! Kill!),? they cry as they launch into a battle with the vastly outnumbered English Militia?Who must manifest incredible skill and incomparable bravery just to survive.","WRITER":"John Prebble (original screenplay), Cy Endfield (original screenplay) and John Prebble (suggested by an article written by)","TRAILER_LINK":"https://www.youtube.com/embed/bd40fWLrMNA","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/zorro/"}),
App.Movies.create({"id":100,"FILM_TITLE":"Shadow Ninja","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/shadow-ninja.jpg","movie_url":"","GENRE":"Comedy","DIRECTOR":"Tung Cho 'Joe' Cheung","ACTORS":"Roy Chiao, Wei Tung, Roy Hung Chiao","RATING":null,"SYNOPSIS":"A veteran and tough sheriff's wife has a gambling problem. He works both sides of the law. He gets teamed up with a young cop who is told to take under his wing. They end up working together well and the young copes martial arts skills are very useful. ","WRITER":"Tung Cho 'Joe' Cheung (screenplay), Wei-hung Teng (screenplay), Wei Tung, Tan Hung Wai and Yung-sheng Pan","TRAILER_LINK":"https://www.youtube.com/embed/JvNnBZzCDQg","Smallpicture":"http://s3-us-west-2.amazonaws.com/movieslibrary/MorePictures/shadowninja/"}),
App.Movies.create({"id":101,"FILM_TITLE":"Emperor of the Seas","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/emperor-of-the-seas.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Emperor_Of_The_Seas_x264_512kb.mp4","GENRE":"Drama","DIRECTOR":"Chen Kaige","ACTORS":"David Kersten","RATING":null,"SYNOPSIS":"It has been relegated to a mere footnote in naval history – a strange realization given the massive size and scope of the events. Beginning in the year 1405 AD and spanning 28 years, the government of China’s Ming Dynasty (under the aegis of Emperor Yongle) sought to dramatically heighten the country’s presence as a global power and impress neighboring nations by sending forth seven expeditions led by naval explorer Zheng He, and an armada comprised of 300 ships and an estimated 28,000 crewmen. Together, the outfit traveled to such exotic locales as Africa, Southeast Asia and the Persian Gulf, issuing Chinese goods and receiving indigenous treasures in kind. This documentary marks one of the very first to relay this strange and beguiling historical chronicle.","WRITER":"Gerald Peterson","TRAILER_LINK":"http://www.youtube.com/embed/_61G3sjeYz0","Smallpicture":""}),
App.Movies.create({"id":102,"FILM_TITLE":"Escape In Time","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/escape-in-time.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Escape_In_Time_x264_512kb.m4v","GENRE":"Action","DIRECTOR":"Gulliver Parascandolo","ACTORS":"Gary Sommers, Alexandra Gellner, Steve Hall","RATING":null,"SYNOPSIS":"Hardly noticed at his job or in his small hometown, Jon is a recluse from society. Trapped in this prison of isolation, Jon begins to experience violent dreams of the life of infamous Alcatraz prisoner John Anglin, who remarkably escaped from the island fortress forty years ago. As Jon’s dreams increase in frequency, the two men’s lives intersect in a Dramatic climax where Jon must tear free from the bounds of fear and finally change his life.","WRITER":"Gulliver Parascandolo","TRAILER_LINK":"http://www.youtube.com/embed/7sscnMntP24","Smallpicture":""}),
App.Movies.create({"id":103,"FILM_TITLE":"Eyes of Night","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/Eyes-Of-Night.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/Eyes_Of_Night_x264_512kb.m4v","GENRE":"Drama","DIRECTOR":"Pericles Hoursoglou","ACTORS":"Vangelio Andreadaki, Yannis Karatzoyannis, Ekavi Douma","RATING":null,"SYNOPSIS":"Chronis, Vaillia and Elftheria are not “IN.” They are not featured in glossy magazines. They don’t have perfect bodies, they don’t make love on the first date. These three characters will cross paths. Their loneliness is what they share in common. One will forget their tiny ego and even if they don’t go about it the right way, in the end they will be generous","WRITER":"A.T. Sayre","TRAILER_LINK":"http://www.youtube.com/embed/yScuFxCl7QY","Smallpicture":""}),
App.Movies.create({"id":104,"FILM_TITLE":"The Devil Made Me Do It","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/The-Devil-Made-Me-Do-It.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/The_Devil_Made_Me_Do_It_(2012)_x264_512kb.mp4","GENRE":"Thriller","DIRECTOR":"Al Carretta","ACTORS":"Georgina Blackledge, Al Carretta, Mike Chapman","RATING":null,"SYNOPSIS":"Manhattan, New York, 1973. All low level mafia associate Donnie DiMaggio wants to be is funny until he finds out he’s the main suspect in the murder of underboss Jimmy De Luca. Frankie Fredonna, head of the family asks Donnie to arrange his son’s eighteenth birthday party. Frankie never asks these things. Donnie knows the score, he’s getting whacked. Kill or be killed he counteracts the plot against him by moving up the ranks in the rival Vincenzo crime family. Old scandals intimidate Frankie’s Uncle, corrupt Priest Father Roberto Fredonna and position Donnie favorably with rival crews. As the party approaches, Donnie continues to blind side Frankie’s plans until the day of reckoning arrives and the brutal climax unfolds","WRITER":"Al Carretta","TRAILER_LINK":"http://www.youtube.com/embed/MJsuCWegerU","Smallpicture":""}),
App.Movies.create({"id":105,"FILM_TITLE":"The Final Shift","title_pic_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/Titlepicture/The-Final-Shift.jpg","movie_url":"http://s3-us-west-2.amazonaws.com/movieslibrary/moviefiles/The_Final_Shift_x264_512kb.mp4","GENRE":"Sci-Fi","DIRECTOR":"John Depew","ACTORS":"John Depew, Vanessa Leigh, Robert Miano","RATING":null,"SYNOPSIS":"The tranquil haven of AL’s Diner, harboring a scant collective of employees, patrons (including a hit man and his partner, a beautiful woman with a dark secret) and a devout Christian family, is thrown into chaos when a callow gang of four enters with a duffel bag of invaluable contents. After the gang’s attempt to deliver the contents to the powerful and shady Maslow is derailed when one of them murders a cop inside the diner, suspicions and revelations arise among the group. While the gang struggles to keep control over the situation as more the police arrive, they quickly realize this is the least of their problems when Maslow comes to claim the contents of the bag","WRITER":"John Depew","TRAILER_LINK":"http://www.youtube.com/embed/3xLkvorHgcw","Smallpicture":""})
],
	filterByGenre : (function(genre) {
		return this.get('content').filterBy('GENRE', GENRE);
	}).property('content.@each')
});

App.CategorySelectedController = Ember.Object.extend({
	name : "All Movies"
});

App.Category = Ember.Object.extend({
	id : null,
	name : null
});

App.CategoryController = Ember.ArrayController.create({
	content : [ App.Category.create({
		id : "0",
		name : 'All Movies'
	}), App.Category.create({
		id : "1",
		name : 'Drama'
	}), App.Category.create({
		id : "2",
		name : 'Romance'
	}), App.Category.create({
		id : "3",
		name : 'Terror'
	}), App.Category.create({
		id : "4",
		name : 'Thriller'
	}), App.Category.create({
		id : "5",
		name : 'Comedy'
	}), ]
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
