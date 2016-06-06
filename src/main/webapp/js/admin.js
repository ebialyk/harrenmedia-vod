function fillTable() {
	var table = document.getElementById('records_table');
	$.ajax({
		url : "rest/admin/getAffiliates",
		type : "POST",
		dataType : "json", // expected format for response
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",

		success : function(response) {
			var trHTML = '';
			for (var i = 0; i < response.length; i++) {
				trHTML += '<tr><td>' + response[i].id + '</td><td>'
						+ response[i].affiliateName + '</td><td>'
						+ response[i].countryId + '</td><td>'
						+ response[i].languageId + '</td></tr>';
			}
			table.innerHTML = trHTML;
		},
		error : function(response, status, error) {
			alert("Error");
		}
	});
}

function newAffiliate() {
	document.getElementById('newAffiliate').style.display = "block";
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
				table.innerHTML = "";
				//close window
				document.getElementById('newAffiliate').style.display = "none";
				
				//clean fields
				affName = document.getElementById("name").value = "";
				country = document.getElementById("country").value = "";
				language = document.getElementById("language").value = "";
				
				fillTable();
			} else {
				alert(response.message);
			}
		},
		error : function(response, status, error) {
			alert(response.message);
		}
	});
}