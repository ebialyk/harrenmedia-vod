var app = angular.module('MuvFlixApp');
app
		.factory(
				'Api',
				[
						'$http',
						'$resource',
						'$q',
						function($http, $resource, $q) {
							function apiError(data) {
								var msg = 'Error accessing: ' + data.config.url
										+ '\nServer said: ' + data.status + ' '
										+ data.statusText;
								$q.reject(data);
								console.log(msg, data);
								alert('Error:' + '' + msg);
							}
							return {
								TrackingService : $resource(
										'rest/client/tracking',
										{},
										{
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
											}
										}

								),
								RegisterService : $resource(
										'rest/client/register',
										{},
										{
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
											}
										}),
								CreateSignatureService : $resource(
										'rest/agregator/createSignature',
										{},
										{
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
											}
										}),
								VerifyAccount : $resource(
										'rest/client/verifyAccount',
										{},
										{
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
											}
										}),
								PostBack : $resource(
										'rest/client/postback',
										{},
										{
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
											}
										}),
								SetTransaction : $resource(
										'rest/client/setTransaction',
										{},
										{
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
											}
										}),
								IPService : $resource(
										'rest/client/checkByIp',
										{},
										{
											get : {
												method : 'GET',
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
											}
										}),

							}

						} ]);