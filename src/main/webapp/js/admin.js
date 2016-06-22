window.onload = function() {
var disableExternal = (location.hostname == "localhost");
	
	document.getElementById('amazonCSS').disabled  = disableExternal;
    document.getElementById('amazonAdminCSS').disabled = disableExternal;
    document.getElementById('LHCSS').disabled  = !disableExternal;
    document.getElementById('LHAdminCSS').disabled = !disableExternal;
}
function newAffiliate() {
	document.getElementById('newAffiliate').style.display = "block";
}
function Cancel() {
	document.getElementById('newAffiliate').style.display = "none";
	
	affName = document.getElementById("name").value = "";
	country = document.getElementById("country").value = "";
	language = document.getElementById("language").value = "";
}
function addAffiliate() {
	var affName = document.getElementById("name");
	var country = document.getElementById("country");
	var language = document.getElementById("language");
	var postBack = document.getElementById("postBack");
	var postBackType = document.getElementById("postBackType");
	var css = document.getElementById("css");
	var price = document.getElementById("price");
	data = {
		affName : affName.value,
		country : country.value,
		language : language.value,
		postBack : postBack.value,
		postBackType : postBackType.value,
	    css : css.value,
	    price : price.value
	};

	$.ajax({
		url : "rest/affiliates",
		type : "POST",
		dataType : "json", // expected format for response
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		data : data,
		success : function(response) {
				affName = document.getElementById("name").value = "";
				country = document.getElementById("country").value = "";
				language = document.getElementById("language").value = "";
				document.getElementById('newAffiliate').style.display = "none";
		},
		error : function(response, status, error) {
			alert(response.message);
		}
	});
}