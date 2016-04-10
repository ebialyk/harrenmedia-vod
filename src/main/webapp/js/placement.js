	var adType = {'1':'Rich Media','2':'Display','3':'Mobile Web'},
	    adSize = {'2':'120x600','4':'160x600','5':'728x90(stayon)','6':'800x440(lightbox)'
	              ,'9':'300x250','10':'468x60','11':'728x90','12':'Pop-up'
	              ,'13':'300x25','14':'320x50'},
	  adSizeRM = {'2':'120x600','4':'160x600','5':'728x90(stayon)','6':'800x440(lightbox)'},
	   adSizeD = {'2':'120x600','4':'160x600','9':'300x250','10':'468x60','11':'728x90','12':'Pop-up'},
	   adSizeM = {'13':'300x25','14':'320x50','11':'728x90'},
	  adOfType = {'1':adSizeRM,'2':adSizeD,'3':adSizeM},
	   lastSel = -1,
       grid = $("#list2"),
       resetStatesValues = function () {
           // set 'value' property of the editoptions to initial size
           grid.jqGrid('setColProp', 'size', { editoptions: { value: adSize} });
       };

       grid.jqGrid(
			{ 	url:'rest/client/placementsTable',
				datatype: "json",
				colNames:['ID', 'Name','Impressions', 'Clicks', 'CTR', 'eCPM', 'Income','Note', 'Website url', 'Ad type','Ad size','Categories','Status', '', 'Tag'], 
				colModel:[
				        {name:'id', index:'ID', key:false, hidden: true, editable: false, editrules: { edithidden: true }, hidedlg: true,  width:180, search:false},
						{name:'name',  index:'Name',  editable:true,
							key:false, width:180, editrules: {custom: true, custom_func: myCustomCheck}, editoptions: {size:50, maxlength: 256}, search:false},
						{name:'impressions', index:'Impressions', editable:false,  width:180, search:false},
						{name:'clicks', index:'Clicks', editable:false,  width:180, search:false},
						{name:'ctr', index:'CTR', editable:false,  width:180, search:false},
						{name:'ecpm', index:'eCPM', editable:false,  width:180, search:false},
						{name:'income', index:'Income', editable:false,  width:180, search:false},
						{name:'note', index:'Note', hidden: true, editable: true, editrules: { edithidden: true }, hidedlg: true,  width:180, search:false},
						{name:'websiteUrl', index:'Website url', editable: true, editrules: {custom: true, custom_func: myCustomCheck}, hidedlg: true,  width:180, search:false},
						{name:'adType', index:'Ad type', hidden: true, editable: true, editrules: { edithidden: true }, hidedlg: true,  width:180, search:false, formatter: 'select',
edittype:'select', editoptions: {
    value: adType,
    dataInit: function (elem) {
        var v = $(elem).val();
        // to have short list of options which corresponds to the country
        // from the row we have to change temporary the column property
        grid.jqGrid('setColProp', 'Ad size', { editoptions: { value: adOfType[v]} });
    },
    dataEvents: [
        {
            type: 'change',
            fn: function (e) {
                // build 'adSize' options based on the selected 'Country' value
                var v = $(e.target).val(),
                    sc = adOfType[v],
                    newOptions = '',
                    sizeId,
                    form,
                    row;
                for (sizeId in sc) {
                    if (sc.hasOwnProperty(sizeId)) {
                        newOptions += '<option role="option" value="' + sizeId + '">' +
                            adSize[sizeId] + '</option>';
                    }
                }

                resetStatesValues();

                // populate the subset of contries
                if ($(e.target).is('.FormElement')) {
                    // form 		    			   addcaption:%20"Add%20Record",editing
                    form = $(e.target).closest('form.FormGrid');
                    $("select#size.FormElement", form[0]).html(newOptions);
                } else {
                    // inline editing
                    row = $(e.target).closest('tr.jqgrow');
                    $("select#" + $.jgrid.jqID(row.attr('id')) + "_size", row[0]).html(newOptions);
                }
            }
        }
    ]
}
},

						{name:'size', index:'Ad size', hidden: true, editable: true, editrules: { edithidden: true }, hidedlg: true,  width:180, search:false, formatter: 'select',
	edittype:'select', editoptions:{value:adSize}},
						{name:'placement_category',index:'Categories',width:120,align:'center',editable: true,hidden: true,
							edittype:'custom', editoptions:{ custom_element:MultiCheckElem, custom_value:MultiCheckVal}},
						{name:'status', index:'Status', editable:true,edittype:'select', formatter:'select',  
						          editoptions:{value:'1:ACTIVE;2:DISABLED'} },
						{name:'acceptAgreament', index:'', hidden: true, editable: true, editrules: { custom: true, edithidden: true, custom_func: function (val, nm, valref) {
							if (val === "")
								return [false, "please confirm you accept the agreement"];
						       else
						    	   return [true];
			                    
			                } }, hidedlg: true,  edittype:'custom',
							editoptions:{ custom_element:agreementElem, custom_value:agreementVal	}},
						{name:'tag', index:'Tag',  editable: true, editrules: { edithidden: true },edittype: "textarea", editoptions: { rows: "4" },  width:180, search:false},
						
				],
				
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
				ondblClickRow: editRow,
				caption:"Placements" });
	
	/*$("#list2").jqGrid('filterToolbar');*/
	
	//button'sclass=
	$("#t_list2").append("<input type='button' id='add_button' value='New Placement' style='height:20px;font-size:12px'/>"); 
	$("#add_button").click(
			function(){
			editRow('new');
			}); 
	$("#t_list2").append("<input type='button' id='del_button' value='Delete' style='height:20px;font-size:12px'/>"); 
	$("#del_button").click(
			function(){
				var row_id_s = jQuery('#list2').jqGrid('getGridParam','selrow');
				//var appSum = jQuery('#listcustom2').jqGrid('getCell',row_id_s,0);
				
				jQuery("#list2").jqGrid('delGridRow', row_id_s, 
					  {recreateForm:true,closeAfterEdit:true, 
		    		   closeOnEscape:true,reloadAfterSubmit:false,
		    		   url: "rest/client/placementsTable",
		    		   datatype: "json"
		    		  } );
			}); 
	/*$("#t_list2").append("<input type='button' id='clearFilter_button' value='Clear Filter' style='height:20px;font-size:12px'/>"); 
	$("#clearFilter_button").click(
			function(){
				jQuery("#list2")[0].clearToolbar();
			}); */
	
	function editRow(rowid) {
		if (rowid!='new') {
            var cm =  jQuery("#list2").jqGrid('getColProp','acceptAgreament');
	        cm.editable = false;
	        var cm1 =  jQuery("#list2").jqGrid('getColProp','placement_category');
	        cm1.editable = false;
	        cm1.hidden=true;
	        var cm2 =  jQuery("#list2").jqGrid('getColProp','tag');
	        cm2.editable = true;
	        //var cm3 =  jQuery("#list2").jqGrid('getColProp','status');
	        //cm3.editable = true;
		}
		if (rowid ==='new') {
			var cm =  jQuery("#list2").jqGrid('getColProp','acceptAgreament');
	        cm.editable = true;
	        var cm1 =  jQuery("#list2").jqGrid('getColProp','placement_category');
	        cm1.editable = true;
	        cm1.hidden=false;
	        var cm2 =  jQuery("#list2").jqGrid('getColProp','tag');
	        cm2.editable = false;
	        //var cm3 =  jQuery("#list2").jqGrid('getColProp','status');
	        //cm3.editable = false;
		}
		
	    jQuery("#list2").jqGrid('editGridRow', rowid,
	    		  {recreateForm:true,closeAfterEdit:true, closeAfterAdd:true, 
	    		   closeOnEscape:true,reloadAfterSubmit:true,
	    		   width: "800",
	    		   addCaption: "New Placement",
	    		   bSubmit: 'Submit',
	    		   resize: true,
	    		   url: "rest/client/placementsTable",
	    		   datatype: "json",
	    		   afterComplete: function (response, postdata) {
	    		   		  if(rowid !='new'){9
	    		   			if(status === 1){
	    		   				alert('record updated successfully');
			    			  }
	    		   		  }else{
	    		   			 var obj = JSON.parse( response.responseText );
			    			 var tag = obj.info;
			    			 var status = obj.status;
			    			 if(status === 1){
			    				 showDialog(tag, "please copy the following tag");
			    			  }else{
			    				  alert('Something went wrong, please try again');
			    			  }
	    		   		  }
		    			 
		    		  }
	    		  }	);
	}
	
	$( "#list2" ).navGrid('#gridPager',{edit:false,add:false,del:false,refresh:true,search:false, view:false});