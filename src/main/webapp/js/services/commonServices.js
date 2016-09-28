var app = angular.module('MuvFlixApp');
app
		.factory(
				'commonFunctions',
				function() {
					var factory = {};
					factory.parseURL = function parseURLParams(url) {
						var queryStart = url.indexOf("?") + 1, queryEnd = url
								.indexOf("#")
								+ 1 || url.length + 1, query = url.slice(
								queryStart, queryEnd - 1), pairs = query
								.replace(/\+/g, " ").split("&"), parms = {}, i, n, v, nv;

						if (query === url || query === "") {
							return;
						}

						for (i = 0; i < pairs.length; i++) {
							nv = pairs[i].split("=");
							n = decodeURIComponent(nv[0]);
							v = decodeURIComponent(nv[1]);

							if (!parms.hasOwnProperty(n)) {
								parms[n] = [];
							}

							for (j = 2; j < nv.length; j++) {
								if (nv[j] == "") {
									v += "=";
								}
							}
							parms[n].push(nv.length >= 2 ? v : null);
						}
						return parms;
					}
					factory.validPassword = function(psw) {
						if (psw.length < 5)
							return false;
						else
							return true;
					}
					factory.validEmail = function(mail) {
						var re = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
						return re.test(mail);
					}
					factory.get_nowUTC = function() {
						var now = new Date();

						var now_utc = now.getUTCFullYear() + ""
								+ setNumber(now.getUTCMonth() + 1) + ""
								+ setNumber(now.getUTCDate()) + ""
								+ setNumber(now.getUTCHours()) + ""
								+ setNumber(now.getUTCMinutes()) + ""
								+ setNumber(now.getUTCSeconds());

						function setNumber(num) {
							if (num < 10) {
								return "0" + num;
							} else {
								return num;
							}
						}

						return now_utc;
					}
					return factory;
				})