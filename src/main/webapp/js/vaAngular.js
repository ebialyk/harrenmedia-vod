var app = angular.module('verification',[]);
app.controller('verificationController', function($scope) {
	$scope.data = [
	               en : {
	            	   headerTitle : "Account Verification",
	            	   explanationBlock : "This is a free registration. Why am I asked for my credit" +
	            	   		"	card details? It's for verification purposes. " +
	            	   		"If you do not cancel your account within the trial period, " +
	            	   		"five days your account will be automatically extended to a " +
	            	   		"premium account at the cost of usd 49.99 per month. " +
	            	   		"When you sign up for the free trial muvflix may charge or capture " +
	            	   		"one or more variable amounts to your account in order to verify " +
	            	   		"if the card is valid, and that you are the authorised and " +
	            	   		"legitimate cardholder. These amounts will appear on your card " +
	            	   		"statement along with the corresponding refund. If you cancel your " +
	            	   		"account within the free trial period, you will only see the " +
	            	   		"verification charges and their corresponding refunds in your " +
	            	   		"statement.",
	            	   	explanation :[ { 
	            	   		title : "Why do we ask you for your billing information?",
	            	   		detail : "Because our library is only licensed to distribute our content to					" +
	            	   				"certain countries, we ask that you provide your mailing address by " +
	            	   				"providing us with a valid credit card number. <b>NO CHARGES " +
	            	   				"GUARANTEED</b>. No charges will appear on your credit card statement " +
	            	   				"unless you upgrade to a Premium Membership or make a purchase."
	            	   	}, { 
	            	   		title : "Privacy Guaranteed",
	            	   		detail : "In order to keep your personal information private, we use " +
	            	   				"encryption security technology. Our site employs <b>Secure " +
	            	   				"Sockets Layering (SSL)</b> to encrypt your personal information such " +
	            	   				"as credit card number, name, and address before it travels over " +
	            	   				"the Internet. Your data is encrypted and password-protected to " +
	            	   				"make sure no one ever sees your personal information!!!"
	            	   	},{ 
	            	   		title : "No Hidden Fees",
	            	   		detail : "We always provide our members with a detailed purchase history in " +
	            	   				"order for them to know exactly what they are paying for. Your " +
	            	   				"payment method information is required to future purchases only. <b>NO " +
	            	   				"CHARGES</b> will appear on your credit card statement unless you " +
	            	   				"upgrade to a Premium Membership or make a purchase. By creating an " +
	            	   				"account, you agree our <a class=\"underlined\" " +
	            	   				"href=\"http://www.muvflix.com/TermsAndConditions.html\" target=\"_blank\">" +
	            	   				"Terms & Conditions</a>"
	            	   	},
	            	   	],
	            	   	timer : "Our special offer will be available only in the next ",
	            	   	starsTitle : "Normal Membership",
	            	   	free : "FREE",
	            	   	price : "$0.00",
	            	   	verificationTitle : "VERIFY	MY ACCOUNT NOW",
	            	   	
	               },
	               es : {
	            	   
	               }
	               ]
})