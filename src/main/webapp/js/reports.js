var urlRangeToSubmit = 'rest/client/reportTable?';	
var adType = {'1':'Rich Media','2':'Display','3':'Mobile Web'},
	    adSize = {'1':'120x600(left slider)','2':'120x600(right slider)','3':'160x600(left slider)','4':'160x600(right slider)','5':'728x90(stayon)','6':'800x440(lightbox)'
	              ,'7':'120x600','8':'160x600','9':'300x250','10':'468x60','11':'728x90','12':'Pop-up'
	              ,'13':'300x25','14':'320x50'},
	  adSizeRM = {'1':'120x600(left slider)','2':'120x600(right slider)','3':'160x600(left slider)','4':'160x600(right slider)','5':'728x90(stayon)','6':'800x440(lightbox)'},
	   adSizeD = {'7':'120x600','8':'160x600','9':'300x250','10':'468x60','11':'728x90','12':'Pop-up'},
	   adSizeM = {'13':'300x25','14':'320x50','11':'728x90'},
	  adOfType = {'1':adSizeRM,'2':adSizeD,'3':adSizeM},
	   lastSel = -1,
       grid = $("#list2"),
       resetStatesValues = function () {
           // set 'value' property of the editoptions to initial size
           grid.jqGrid('setColProp', 'size', { editoptions: { value: adSize} });
       };

       grid.jqGrid(
			{ 	url:'rest/client/reportTable',
				datatype: "json",
				colNames:['Data','Impressions', 'Clicks', 'CTR', 'eCPM', 'Income'], 
				colModel:[
                        {name:'date', index:'Data', editable: true, editrules: {custom: true, custom_func: myCustomCheck}, hidedlg: true,  width:180, search:false},
						{name:'impressions', index:'Impressions', editable:false,  width:180, search:false},
						{name:'clicks', index:'Clicks', editable:false,  width:180, search:false},
						{name:'ctr', index:'CTR', editable:false,  width:180, search:false},
						{name:'ecpm', index:'eCPM', editable:false,  width:180, search:false},
						{name:'income', index:'Income', editable:false,  width:180, search:false}],
				
				pager: $('#gridPager'),
				rowNum:30,
				height:'100%',
				width:'800',
				rowList:[10,20,30], 
				
				sortname: 'name',
				viewrecords: true,
				sortorder: "desc",
				jsonReader: {bSubmit: 'Save',
					repeatitems: false
				},
				toolbar:[true,"top"],
				caption:"Report" });
	
	$("#list2").jqGrid('filterToolbar');
	

	
	
	$( "#list2" ).navGrid('#gridPager',{edit:false,add:false,del:false,refresh:true,search:false, view:false});
	
	
//date picker code
	
	$.getScript("js/bootstrap-datepicker.js", function(){

		var startDate = new Date('01/01/2012');
		var FromEndDate = new Date();
		var ToEndDate = new Date();

		ToEndDate.setDate(ToEndDate.getDate()+365);

		$('.from_date').datepicker({
		    
		    weekStart: 1,
		    startDate: '01/01/2012',
		    endDate: FromEndDate, 
		    autoclose: true
		})
		    .on('changeDate', function(selected){
		        startDate = new Date(selected.date.valueOf());
		        startDate.setDate(startDate.getDate(new Date(selected.date.valueOf())));
		        $('.to_date').datepicker('setStartDate', startDate);
		    }); 
		$('.to_date')
		    .datepicker({
		        
		        weekStart: 1,
		        startDate: startDate,
		        endDate: ToEndDate,
		        autoclose: true
		    })
		    .on('changeDate', function(selected){
		        FromEndDate = new Date(selected.date.valueOf());
		        FromEndDate.setDate(FromEndDate.getDate(new Date(selected.date.valueOf())));
		        $('.from_date').datepicker('setEndDate', FromEndDate);
		    });

		  
		  
		  
		  
		});

	
	function datePickerSubmitButton(){
		if((!$(from_d).val()) || (!$(to_d).val())){
			alert("Please choose range");
		}else{
			
			var from = new Date($(from_d).val());
			var to = new Date($(to_d).val());
			var todaysDate = new Date();
			
			var res = dates.compare(from,to);
			if(res == 0){
				alert("Please choose start date that is before end date");
			}else{
				var str1 = urlRangeToSubmit.concat('from_d=');
				var str2 = str1.concat($(from_d).val());
				var str3 = str2.concat('&to_d=');
				var newUrl = str3.concat($(to_d).val());
				jQuery("#list2").jqGrid().setGridParam({url : newUrl}).trigger("reloadGrid")
			}
		}
		
	}