function removejscssfile(filename, filetype) {
	var targetelement = (filetype == "js") ? "script"
			: (filetype == "css") ? "link" : "none" // determine element type to
													// create nodelist from
	var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href"
			: "none" // determine corresponding attribute to test for
	var allsuspects = document.getElementsByTagName(targetelement)
	for (var i = allsuspects.length; i >= 0; i--) { // search backwards within
													// nodelist for matching
													// elements to remove
		if (allsuspects[i]
				&& allsuspects[i].getAttribute(targetattr) != null
				&& allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1)
			allsuspects[i].parentNode.removeChild(allsuspects[i]) // remove
																	// element
																	// by
																	// calling
																	// parentNode.removeChild()
	}
}

function validPassword(psw) {
	if (psw.value.length < 5)
		return false;

	return true;
}
function validEmail(mail) {
	var re = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
	return re.test(mail);
}
function getLoggedInUser() {
	$.ajax({
		url : "rest/client/getLoggedInUser",
		type : "POST",
		dataType : "json", // expected format for response

		success : function(response) {
			return response;
		},
		error : function(response, status, error) {
			alert(response.message);
		}
	});
}
function parseURLParams(url) {
	var queryStart = url.indexOf("?") + 1, queryEnd = url.indexOf("#") + 1
			|| url.length + 1, query = url.slice(queryStart, queryEnd - 1), pairs = query
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

function login(mail, ps) {
	data = {
		email : mail,
		ps : ps
	}
	$.ajax({
		url : "rest/client/logIn",
		type : "POST",
		dataType : "json", // expected format for response
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		data : data,
		success : function(response) {
			if (response.status == 51) {
				return true;
			} else {
				return false;
			}
		},
		error : function(response, status, error) {
			alert('Unexpected Error please try again');
		}
	});
}
function tracking(affiliate, place, cssTheme, languageId, userId,
		clickId) {
	data = {
		affiliate : affiliate,
		place : place,
		cssTheme : cssTheme,
		languageId : languageId,
		email : userId,
		clickId : clickId
	};
	$.ajax({
		url : "rest/client/tracking",
		type : "POST",
		dataType : "json", // expected format for response
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		data : data,
		success : function(response) {
		},
		error : function(response, status, error) {
		}
	});
}

function checkByIP() {
	$.ajax({
		url : "rest/client/checkByIp",
		type : "GET",
		dataType : "json", // expected format for response
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		success : function(response) {
			if (response != undefined) {
				if (response.countryId != null) {
					return response;
				}
			} 
			return false;
		},
		error : function(response, status, error) {
			alert(response.message);
		}
	})
}
