function validEmail(mail) {
	var re = /[A-z0-9._%+-]+@[A-z0-9.-]+.[A-z]{2,4}/;
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

		parms[n].push(nv.length === 2 ? v : null);
	}
	return parms;
}

function login(mail, ps) {
	data = {
		email : user,
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
function tracking(affiliate, country, place, cssTheme, languageId, userId) {
	data = {
		affiliate : affiliate, 
		country : country, 
		place : place, 
		cssTheme : cssTheme, 
		languageId : languageId, 
		userId : userId	 	
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



