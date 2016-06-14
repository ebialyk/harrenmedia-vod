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
	//var table = document.getElementById('records_table');
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
	//			table.style.display = "block";
				
			
		},
		error : function(response, status, error) {
			alert(response.message);
		}
	});
}