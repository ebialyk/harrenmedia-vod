	var adType = {'1':'Rich Media','2':'Display','3':'Mobile Web'},
	    adSize = {'1':'120x600(left slider)','2':'120x600(right slider)','3':'160x600(left slider)','4':'160x600(right slider)','5':'728x90(stayon)','6':'800x440(lightbox)'
	              ,'7':'120x600','8':'160x600','9':'300x250','10':'468x60','11':'728x90','12':'Pop-up'
	              ,'13':'300x25','14':'320x50'},
	  adSizeRM = {'1':'120x600(left slider)','2':'120x600(right slider)','3':'160x600(left slider)','4':'160x600(right slider)','5':'728x90(stayon)','6':'800x440(lightbox)'},
	   adSizeD = {'7':'120x600','8':'160x600','9':'300x250','10':'468x60','11':'728x90','12':'Pop-up'},
	   adSizeM = {'13':'300x25','14':'320x50','11':'728x90'},
	  adOfType = {'1':adSizeRM,'2':adSizeD,'3':adSizeM},
	   lastSel = -1,
       grid = $("#list6"),
       resetStatesValues = function () {
           // set 'value' property of the editoptions to initial size
           grid.jqGrid('setColProp', 'size', { editoptions: { value: adSize} });
       };

       grid.jqGrid(
			{ 	url:'rest/client/videoplacementsTable',
				datatype: "json",
				colNames:['ID', 'Name', 'Website url','Impressions', 'Clicks', 'CTR', 'eCPM', 'Income','Note','Categories', 'Status', 'Accept Agreament&nbsp;', 'Tag'], 
				colModel:[
				        {name:'id', index:'ID', key:false, hidden: true, editable: false, editrules: { edithidden: true }, hidedlg: true,  width:180, search:false},
						{name:'name',  index:'Name',  editable:true,
							key:false, width:180, editrules: {custom: true, custom_func: myCustomCheck}, editoptions: {size:50, maxlength: 256}, search:false},
						{name:'websiteUrl', index:'Website url', editable: true, editrules: {custom: true, custom_func: myCustomCheck}, hidedlg: true,  width:180, search:false},
						{name:'impressions', index:'Impressions', editable:false,  width:180, search:false},
						{name:'clicks', index:'Clicks', editable:false,  width:180, search:false},
						{name:'ctr', index:'CTR', editable:false,  width:180, search:false},
						{name:'ecpm', index:'eCPM', editable:false,  width:180, search:false},
						{name:'income', index:'Income', editable:false,  width:180, search:false},
						{name:'note', index:'Note', hidden: true, editable: true, editrules: { edithidden: true }, hidedlg: true,  width:180, search:false},
						{name:'category',index:'Categories',width:120,align:'center',editable: true,hidden: true,
							edittype:'custom', editoptions:{ custom_element:MultiCheckElem, custom_value:MultiCheckVal}},
						{name:'status', index:'Status', editable:true,edittype:'select', formatter:'select',  
						          editoptions:{value:'1:ACTIVE;2:DISABLED'}, search:false},
						{name:'acceptAgreament', index:'Accept Agreament&nbsp;', hidden: true, editable: true, editrules: { custom: true, edithidden: true, custom_func: function (val, nm, valref) {
							if (val === "")
								return [false, "please confirm you accept the agreement"];
						       else
						    	   return [true];
			                    
			                } }, hidedlg: true,  edittype:'custom',
							editoptions:{ custom_element:agreementElem, custom_value:agreementVal	}},
						{name:'tagVideo', index:'Tag',  width: 100, editable: true,edittype: "textarea",  hidedlg: true,width:180, search:false, 
							classes: "textInDiv",
						    formatter: function (v) {
						        return '<div>' + $.jgrid.htmlEncode(v) + '</div>';
						    }}
						
				],
				pager: $('#gridPager'),
				rowNum:30,
				height:'100%',
				width:'850',
				rowList:[10,20,30], 
				
				sortname: 'name',
				viewrecords: true,
				sortorder: "desc",
				jsonReader: {bSubmit: 'Save',
					repeatitems: false
				},
				toolbar:[true,"top"],
				ondblClickRow: editRow,
				caption:"Vidoe Files" });
	
	/*$("#list6").jqGrid('filterToolbar');*/
	
	//button'sclass=
	$("#t_list6").append("<input type='button' id='add_button' value='New Video' style='height:20px;font-size:12px'/>"); 
	$("#add_button").click(
			function(){
			editRow('new');
			}); 
	$("#t_list6").append("<input type='button' id='del_button' value='Delete' style='height:20px;font-size:12px'/>"); 
	$("#del_button").click(
			function(){
				var row_id_s = jQuery('#list6').jqGrid('getGridParam','selrow');
				//var appSum = jQuery('#listcustom2').jqGrid('getCell',row_id_s,0);
				
				jQuery("#list6").jqGrid('delGridRow', row_id_s, 
					  {recreateForm:true,closeAfterEdit:true, 
		    		   closeOnEscape:true,reloadAfterSubmit:true,
		    		   url: "rest/client/videoTagTable",
		    		   datatype: "json"
		    		  } );
			}); 
	/*$("#t_list6").append("<input type='button' id='clearFilter_button' value='Clear Filter' style='height:20px;font-size:12px'/>"); 
	$("#clearFilter_button").click(
			function(){
				jQuery("#list6")[0].clearToolbar();
			}); */
	
	function editRow(rowid) {
		if (rowid!='new') {
            var cm =  jQuery("#list6").jqGrid('getColProp','acceptAgreament');
	        cm.editable = false;
	        var cm1 =  jQuery("#list6").jqGrid('getColProp','category');
	        cm1.editable = false;
	        cm1.hidden=true;
	        var cm2 =  jQuery("#list6").jqGrid('getColProp','tagVideo');
	        cm2.editable = true;
	        //var cm3 =  jQuery("#list6").jqGrid('getColProp','status');
	        //cm3.editable = true;
		}
		if (rowid ==='new') {
			var cm =  jQuery("#list6").jqGrid('getColProp','acceptAgreament');
	        cm.editable = true;
	        var cm1 =  jQuery("#list6").jqGrid('getColProp','category');
	        cm1.editable = true;
	        cm1.hidden=false;
	        var cm2 =  jQuery("#list6").jqGrid('getColProp','tagVideo');
	        cm2.editable = false;
	        //var cm3 =  jQuery("#list6").jqGrid('getColProp','status');
	        //cm3.editable = false;
		}
		
	    jQuery("#list6").jqGrid('editGridRow', rowid,
	    		  {recreateForm:true,closeAfterEdit:true, closeAfterAdd:true, 
	    		   closeOnEscape:true,reloadAfterSubmit:true,
	    		   width: "800",
	    		   addCaption: "New Video File",
	    		   bSubmit: 'Submit',
	    		   resize: true,
	    		   url: "rest/client/videoTagTable",
	    		   datatype: "json",
	    		   	afterComplete: function (response, postdata) {
	    		   		  if(rowid !='new'){
	    		   			if(status === 1){
	    		   				alert('record updated successfully')
			    			  }
	    		   		  }else{
	    		   			 var obj = JSON.parse( response.responseText );
			    			 var tag = obj.info;
			    			 var status = obj.status;
			    			 if(status === 1){
			    				  showDialog(tag, "please copy the following tag and update the width, height and content url");
			    			  }else{
			    				  alert('Something went wrong, please try again');
			    			  }
	    		   		  }
		    			 
		    		  }
	    		  }	);
	}
	
	$( "#list6" ).navGrid('#gridPager',{edit:false,add:false,del:false,refresh:true,search:false, view:false});

	
