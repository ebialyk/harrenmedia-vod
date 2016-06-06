function openLogin() {
	document.getElementById("loginScreen").style.display = "flex"
	document.getElementById("mask").style.display = "flex"
	var email = document.getElementById("User");
	var psw = document.getElementById("Psw");
	
	email.value = "";
	psw.value = "";
}
function logIn() {
	var email = document.getElementById("User");
	var psw = document.getElementById("Psw");

	var okMail = false;
	var okPsw = false;

	if (email.value === undefined || email.value == "") {// no empty email
		email.className = "error";
		email.title = "Please type your email";
	} else if (!validEmail(email.value)) { // validate entered email
		email.className = "error";
		email.title = "Please enter a valid email";
	} else {
		email.className = "";
		email.title = "";
		okMail = true;
	}
	if (psw.value === undefined || psw.value == "") {// no empty message
		psw.className = "error";
		psw.title = "Please type your name";
	} else {
		psw.className = "";
		psw.title = "";
		okPsw = true;
	}

	if (okMail && okPsw) {
		var data = {
			email : email.value,
			pw : psw.value
		};

		$.ajax({
			url : "rest/client/logIn",
			type : "POST",
			dataType : "json", // expected format for response
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			data : data,
			success : function(response) {
				if (response.status === 51) {
					MAIL = email.value;
					PSW = psw.value;

					closeDialog()
					email.value = "";
					psw.value = "";

					url = 'movies.html';
					localStorage.setItem('user', MAIL);
					window.open(url, '_self', false)

					email = "";
					psw = "";

				} else {
					alert(response.message);
				}
			},
			error : function(response, status, error) {
				alert("something was wrong, please try again later");
			}
		});
	}
}

function closeDialog() {
	document.getElementById("loginScreen").style.display = "none";
    document.getElementById("mask").style.display = "none";
}
function closeLogin() {
	document.getElementById("loginScreen").style.display = "none";
    document.getElementById("mask").style.display = "none";
}
function SignIn() {
    closeLogin();
    document.getElementById("mainContainer").style.display = "none";
    document.getElementById("SignInPage").style.display = "flex"
  }
function SignUp() {

	var email = document.getElementById("email");
	var psw = document.getElementById("psw");
	var psw2 = document.getElementById("psw2");

	var okEmail = false;
	var okPsw = false;
	var okPsw2 = false;
	var okPswEquals = false;

	// not allow empty fields
	if (email.value === undefined || email.value == "") {
		email.className = "error";
		email.title = "Please enter an email";
	} else if (!validEmail(email.value)) { // validate entered email
		email.className = "error";
		email.title = "Please enter a valid email";
	} else { // no email errors
		email.className = "";
		email.title = "";
		okEmail = true;
	}
	if (psw.value === undefined || psw.value == "") {
		psw.className = "error";
		psw.title = "Please enter a password";
	} else {
		psw.className = "";
		psw.title = "";
		okPsw = true;
	}
	if (psw2.value === undefined || psw2.value == "") {
		psw2.className = "error";
		psw2.title = "Please confirm your password";
	} else {
		psw2.className = "";
		psw2.title = "";
		okPsw2 = true;
	}

	if (psw.value === psw2.value) { // validate password and confirm password
		// are equals
		okPswEquals = true;
	} else {
		psw.className = "error";
		psw2.className = "error";
		psw.title = "password and confirm password are not the same, please type again";
		psw2.title = "password and confirm password are not the same, please type again";
	}

	if (okEmail && okPsw && okPsw2 && okPswEquals) {

		data = {
			email : email.value,
			pw : psw.value,
			pwConfirm : psw2.value,
			affiliate : "0",
			country : "0"
		};
		$.ajax({
			url : "rest/client/register",
			type : "POST",
			dataType : "json", // expected format for response
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			data : data,
			success : function(response) {
				if (response.status == 15) {
					openVerificationPage();
					MAIL = email.value;
					PSW = psw.value;
					
					document.getElementById("SignInPage").style.display = "none";
					document.getElementById("SignUpPage").style.display = "flex";
				} else {
					alert(response.message);
				}
			},
			error : function(response, status, error) {
				alert(response.message);
			}
		});

		
	}
}