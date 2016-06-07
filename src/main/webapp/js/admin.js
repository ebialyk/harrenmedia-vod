function newAffiliate() {
	document.getElementById('newAffiliate').style.display = "block";
	document.getElementById('affTable').style.display = "none";

}
function AddAffiliate() {
	var table = document.getElementById('records_table');
	var affName = document.getElementById("name");
	var country = document.getElementById("country");
	var language = document.getElementById("language");

	data = {
		affName : affName.value,
		country : country.value,
		language : language.value
	};

	$.ajax({
		url : "rest/admin/createAffiliate",
		type : "POST",
		dataType : "json", // expected format for response
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		data : data,
		success : function(response) {
			if (response.status == 40) {
				//close window
				
				//clean fields
				affName = document.getElementById("name").value = "";
				country = document.getElementById("country").value = "";
				language = document.getElementById("language").value = "";
				
				document.getElementById('newAffiliate').style.display = "none";
				document.getElementById('affTable').style.display = "block";
				
			} else {
				alert(response.message);
			}
		},
		error : function(response, status, error) {
			alert(response.message);
		}
	});
}