function printInvoice(id = 'PRINTtheTHING'){
    let html = "";
  
    $('link').each(function() { // find all <link tags that have
      if ($(this).attr('rel').indexOf('stylesheet') !=-1) { // rel="stylesheet"
        html += '<link rel="stylesheet" href="'+$(this).attr("href")+'" />';
      }
    });
    html += '<body onload="window.focus(); window.print()">'+$("#"+id).html()+'</body>';
    let w = window.open("","print");
    if (w) { w.document.write(html); w.document.close() }
}

function generateInvoice(){
	//Invoice Date. Uses todays date if none is selected.
	$('#invoice_date_invoice').text($('#invoice_date').val() ? $('#invoice_date').val() : new Date().toDateString());
	
	//Invoice Period
	let invoice_period = masterDict['projects'][invoiceChosenProjectID]['weeks'][$('#timeSheetSelection').val()]['startDate'];
	invoice_period += ' to ';
	invoice_period += addToDate(masterDict['projects'][invoiceChosenProjectID]['weeks'][$('#timeSheetSelection').val()]['startDate'], 13);
	$('#invoice_date_period').text(invoice_period);
	//Invoice For
	$('#invoice_for_invoice').text($('#invoice_for').val());
	//Invoice ID
	$('#invoice_id_invoice').text($('#invoice_ID').val());

	let clientDict = masterDict['clients'][$("#clientSelection option:selected").attr('clientid')];
	let userDict = masterDict['users'][($("#userSelection option:selected").attr('userid'))];
	let projWeek = masterDict['projects'][invoiceChosenProjectID]['weeks'][$("#timeSheetSelection option:selected").attr('weekid')]
	let projDict = masterDict['projects'][invoiceChosenProjectID];

	//User
	$('#user_name_invoice').text(userDict['userName']);
	$('#user_addOne_invoice').text(userDict['userAddressOne']);
	$('#user_addTwo_invoice').text(userDict['userAddressTwo']);
	$('#user_city_invoice').text(userDict['userCity']);
	$('#user_country_invoice').text(userDict['userCountry']);
	$('#user_contact_invoice').text(userDict['userCountry']);

	
	//client
	$('#client_id_invoice').text(clientDict['client']);
	$('#client_name_invoice').text(clientDict['clientName']);
	$('#client_addOne_invoice').text(clientDict['clientAddressOne']);
	$('#client_addTwo_invoice').text(clientDict['clientAddressTwo']);
	$('#client_city_invoice').text(clientDict['clientCity']);
	$('#client_country_invoice').text(clientDict['clientCountry']);

	printInvoice();
	invoiceBottomTable(projDict, projWeek);
} 

function invoiceBottomTable(projDict, weekObj){
	//Generate Columns
	let colElem = '';
	for(let i = 1; i < 6; i++){
        let colID = columnLetter[i]
        colElem += DOM_Blocks_invoice.invoice_col(colID);
    }
	$('#bottom_section').empty();
    $('#bottom_section').append(colElem);

	//Add Cells
	$('.invoice_sheet_column').empty();	 
    $('.invoice_sheet_column').each(function(col, obj) {
		let elem = "";
		for(let i = 0; i < (projDict['colourList']).length; i++){
			const cellID = columnLetter[col] + i.toString();
			let colourName = masterDict['colours'][(projDict['colourList'][i])]['colourName'];
			let colourRate = masterDict['colours'][(projDict['colourList'][i])]['colourRate'];
			let colourQTY = weekObj['totalColour$'][(projDict['colourList'][i])];
			colourQTY = colourQTY / colourRate;
			let colourTotal = weekObj['totalColour$'][(projDict['colourList'][i])];
			if(col == 0){
				elem += `<div class="descpt_cell" cellid="${cellID}">${colourName}</div>`;
			}
			else if(col == 1){
				elem += `<div class="qty_cell" cellid="${cellID}">${colourQTY}</div>`;
			}
			else if(col == 2){
				elem += `<div class="unit_cell" cellid="${cellID}">${colourRate}</div>`;
			}
			else if(col == 3){
				elem += `<div class="total_cell" cellid="${cellID}">${colourTotal}</div>`;
			}
		}
		$(obj).append(elem)
	});


}