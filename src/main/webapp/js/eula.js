
window.onload = function() {
	var disableExternal = (location.hostname == "localhost");
	document.getElementById('amazonCSS').disabled  = disableExternal;
	document.getElementById('LHCSS').disabled  = !disableExternal;
}
	
	
