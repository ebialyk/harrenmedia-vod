window.onload = function() {
var disableExternal = (location.hostname == "localhost");
	
	if(!disableExternal) {
    	window.open("../", '_self', false)
    } else {
    	document.getElementById('body').style.display = "block";
    }
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
function checkPayment( obj) {
	alert(obj.transactionId);
}


function getNow() {
	var now = new Date();
	var now_utc = now.getUTCFullYear() + "" + setNumber(now.getUTCMonth() + 1)
			+ "" + setNumber(now.getUTCDate()) + ""
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

function sendPayment(t) {
	
	data = { 
			timestamp : getNow(),
			transactionId : t.transactionId,
			transactionType :  "purchase",
			affiliateId : t.affiliate.affiliateId,
			countryId : t.country.countryId
			}
	$.ajax({
		url : "rest/agregator/sendPayment",
		type : "POST",
		dataType : "html", // expected format for response
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		data : data,
		success : function(response) {

			response = response.replace("{", '').trim()
					.replace("}", '').trim().replace(/"/g, '')
					.trim();
			var res = response.split(",");
			var sign = res[0].split(":")[1];
			var reqId = res[1].split(":")[1];
			var transactionType = res[2].split(":")[1];
			var amount = res[3].split(":")[1];
			var currency = res[4].split(":")[1];
			
			var requestData = {
					"request_id" : reqId,
					"request_time_stamp" : now_utc,
					"merchant_account_id" : t.merchantAccountId,
					"transaction_type" : transactionType,
					"requested_amount" : amount,
					"requested_amount_currency" : currency,
					"request_signature" : sign,
					"payment_method" : "creditcard",
					"parent_transaction_id" : t.parentTransactionId
					};
			
			WirecardPaymentPage.seamlessPay({
				requestData : requestData,
				onSuccess : function(response) {
					 
				},
				onError : function(response) {
					alert(response.status_description_1);
				},
				});
		},
		error : function(response) {
			
		}
	});
	
}