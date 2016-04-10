	$(document).ready(function() {

			myCustomCheck = function(value, colname) {
				if (colname === "Name") {
					if (!(value !== "" && value !== undefined)) {
						return [ false, "Please type the name" ];
					}
				} else if (colname === "Website url") {
					if (!(value !== "" && value !== undefined)) {
						return [ false, "Please type your website url" ];
					}
				} else if (colname === "Duration") {
					if (!(value !== "" && value !== undefined)) {
						return [ false, "Please type the video duration" ];
					}
				}

				if($("#fileToUpload").val() === ""){
						return [ false, "Please upload a file" ];
				}
				return [ true ];
			}

		});
	
/* datepicker range */
var dates = {
    convert:function(d) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp) 
        //   a string     : Any format supported by the javascript engine, like
        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //  an object     : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        return (
            d.constructor === Date ? d :
            d.constructor === Array ? new Date(d[0],d[1],d[2]) :
            d.constructor === Number ? new Date(d) :
            d.constructor === String ? new Date(d) :
            typeof d === "object" ? new Date(d.year,d.month,d.date) :
            NaN
        );
    },
    compare:function(a,b) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(a=this.convert(a).valueOf()) &&
            isFinite(b=this.convert(b).valueOf()) ?
            (a>b)-(a<b) :
            NaN
        );
    },
    inRange:function(d,start,end) {
        // Checks if date in d is between dates in start and end.
        // Returns a boolean or NaN:
        //    true  : if d is between start and end (inclusive)
        //    false : if d is before start or after end
        //    NaN   : if one or more of the dates is illegal.
        // NOTE: The code inside isFinite does an assignment (=).
       return (
            isFinite(d=this.convert(d).valueOf()) &&
            isFinite(start=this.convert(start).valueOf()) &&
            isFinite(end=this.convert(end).valueOf()) ?
            start <= d && d <= end :
            NaN
        );
    }
}


/* for getting the header jump when we scroll down
$(window).on("scroll", function () {
    if ($(this).scrollTop() > 100) {
        $("#header").addClass("not-transparent");
    }
    else {
        $("#header").removeClass("not-transparent");
    }
});*/

google.load("visualization", "1", {packages:["corechart"]});


function myChartTableCallback() {


    //create a script element and set it's type and async attributes
    var script = document.createElement('script'); script.type = 'text/javascript'; script.async = true;

    //set the source of the script element
    script.src = 'js/chart.js';


    //add the script element to the DOM
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(script, s);

}

function myPlacementTableCallback() {


    //create a script element and set it's type and async attributes
    var script = document.createElement('script'); script.type = 'text/javascript'; script.async = true;

    //set the source of the script element
    script.src = 'js/placement.js';


    //add the script element to the DOM
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(script, s);

}

function myVideoPlacementTableCallback() {


    //create a script element and set it's type and async attributes
    var script = document.createElement('script'); script.type = 'text/javascript'; script.async = true;

    //set the source of the script element
    script.src = 'js/videoUploadPlacement.js';


    //add the script element to the DOM
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(script, s);

}

function myVideoPlacementNoFileTableCallback() {


    //create a script element and set it's type and async attributes
    var script = document.createElement('script'); script.type = 'text/javascript'; script.async = true;

    //set the source of the script element
    script.src = 'js/videoPlacementNoFile.js';


    //add the script element to the DOM
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(script, s);

}

function myReportTableCallback() {


    //create a script element and set it's type and async attributes
    var script = document.createElement('script'); script.type = 'text/javascript'; script.async = true;

    //set the source of the script element
    script.src = 'js/reports.js';


    //add the script element to the DOM
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(script, s);

}

//element. From what I have gathered, jqGrid calls this the first time the form is launched. After
//that, only the "custom_value" function is called.20
//
//The full list of checkboxes is in the jqGrid "editoptions" section "list" tag (in the options
//parameter).
//————————————————————
function MultiCheckElem( value, options )
{
//———-
//for each checkbox in the list
// build the input element
// set the initial "checked" status
//endfor
//———-elem.length
var ctl = '<div>';
//var ckboxAry = options.list.split(',');
var array1= ["Arts","Autos & Vehicles","Beauty & Personal Care","Blog/Forum", "Business & Finance","Classifieds/Career"];
var array2 = ["Computers & Electronics","Dating","Downloads/File Sharing", "Education","Entertainment","Food & drinks","Gambling"];
var array3 = ["Gaming", "Health", "Hobbies/Leisure/Special Interests/Greetings","Home & garden/Do-it-yourself","Industry","Internet & telecom","Men/Women/Family & Religion","Movies&Television","Music","News","Pets & animals"];
var array4 = ["Real estate","Reference","Language & literature","Science","environment & technology","Shopping","Social Networking","Society & government","Sports","Streaming/Photo Sharing","Travel","Weather"];
var array5 = array1.concat(array2);
var array6 = array3.concat(array4);
var ckboxAry = array5.concat(array6);
for (var i=0; i<ckboxAry.length;){

ctl = ctl+'<div class="row">'
for (var j=i; j<ckboxAry.length && j< (i+4);j++){
	  var item = ckboxAry[j];

	 // var space = '&nbsp;'
		  
	  //for(var k=(40-item.length) ;k > 0 ; k--){
		//  space = space+'&nbsp;'
	  //}
	 ctl = ctl +' <div class="checkboxDiv ">'
   ctl = ctl +'<input type="checkbox" ';

   if ( value.indexOf(item + '|') != -1 )
      ctl += 'checked="checked" ';
   ctl += 'value="' + item + '"> ' + item + '</input>'+'</div>';//+space;
	     
}
ctl = ctl+'</br>'
i= i+4;
ctl = ctl+'</div>' 
}
ctl = ctl + '</div>'
return $(ctl)[0];
}



//————————————————————
//Description:
//MultiCheckVal is the "custom_value" function for the custom multiple check box input element. It
//appears that jqGrid invokes this function the first time the form is submitted and, the rest of
//the time, when the form is launched (action = set) and when it is submitted (action = 'get').
//————————————————————
function MultiCheckVal(elem, action, val)
{
var items = '';
if (action == 'get') // the form has been submitted
{
	//———-
  // for each input element
  //   if it's checked, add it to the list of items
  // endfor
  //———-
  var inputs = $("input", $(elem)[0]);
  for (var i in inputs)
  {
     if (inputs[i].tagName == 'INPUT' && inputs[i].checked )
    	     items += inputs[i].value + ',';
  }

  // items contains a comma delimited list that is returned as the result of the element
  items = items.replace(/,$/, '');
}
else // the form is launched
{
 //———-
 // for each input element
 //   based on the input value, set the checked status
 // endfor
 //———-
 for (var i in elem)
 {
    if (elem[i].tagName == 'INPUT')
    {
       if (val.indexOf(elem[i].value + '|') == -1)
          elem[i].checked = false;
       else
          elem[i].checked = true;
    }
 } // endfor
}

return items;
}

function agreementElem( value, options ){
	var ac = '<div>';
	ac += '<div class="row">';
	ac += '<input type="checkbox" name="ac" value="">';
	//ac += 'I won'+'&#39;'+'t implement ElmundoNme ads in a page that contains prohibited content and will not generate non-human traffic or manipulate ElmundoNme tags in order to produce false activity';
	ac += '<a href="google.com" target="_blank" style="font-size: 12px; text-decoration: underline; font-weight:bold">Accept Privecy Policy </a>';
	
	ac += '</div>'
	ac = ac + '</div>'
	 
return $(ac)[0];
}
function agreementVal( elem, action, val){
	var item = '';
	if (action == 'get') // the form has been submitted
	{
		//———-
	  // for each input element
	  //   if it's checked, add it to the list of items
	  // endfor
	  //———-
	  var inputs = $("input", $(elem)[0]);
	  for (var i in inputs)
	  {
	     if (inputs[i].tagName == 'INPUT' && inputs[i].checked ){
	    	 item = "true";
	     }else{
	    	return item;
	     }
	     
	     
	  }

	}
	else // the form is launched
	{
	 //———-
	 // for each input element
	 //   based on the input value, set the checked status
	 // endfor
	 //———-
	 for (var i in elem)
	 {
	    if (elem[i].tagName == 'INPUT')
	    {
	       if (val.indexOf(action[i].value + '|') == -1)
	          elem[i].checked = false;
	       else
	          elem[i].checked = true;
	    }
	 } // endfor
	}
	return item;
}

function showDialog(tag, header)
{
	var first = '<div id="dialog-modal" title="', second= '" style="display: none;"><textarea id="txtareatag"> ';
	var first = first.concat(header); 
	var first = first.concat(second); 
	var tagiBefore = first.concat(tag); 
	var last = '</textarea></div>';
	var tagToPresent = tagiBefore.concat(last);  
	var tagDialog = $(tagToPresent);
	tagDialog.dialog({
		width: 605,
        height: 405
	});
   
}

function showHide(ishide)
{
	
	}