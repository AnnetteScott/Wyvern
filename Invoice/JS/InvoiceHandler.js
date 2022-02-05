function createTable(){
	let invoiceCol = ['A', 'B', 'C', 'D'];
	let invoiceLabel = ['SUBTOTAL', 'TAX', 'TOTAL'];
	let tableHTML = '';
	let rates = [];
	let qty = [];
	let invoiceTotal = 0.00
	let projectWeekObj = projectMasterDict[currentChosenProject]["time_sheet_weeks"][currentTimeSheet]
	
	let colourList = []
	Object.keys(colourMasterDict).forEach(name => {
        if(colourMasterDict[name][1]['yes'].includes(currentChosenProject)){
            colourList.push(name);
        }    
    })
	let rowCount = colourList.length;

	//Description Table
	let tableContainerDESC = document.getElementById("description_invoice_table");
	tableContainerDESC.innerHTML = '';
	tableHTML = '<div>'
	for(let row = 0; row < rowCount; row++){
		let cellID = invoiceCol[0] + row.toString();
		tableHTML += `<div class="cellInvoice" value="${cellID}">${colourList[row]}</div>`;
	}
	tableHTML += '</div>'
	tableContainerDESC.innerHTML = tableHTML;

	//QTY table
	let tableContainerQTY = document.getElementById("qty_invoice_table");
	tableContainerQTY.innerHTML = '';
	tableHTML = '<div>'
	for(let row = 0; row < rowCount; row++){
		let cellID = invoiceCol[1] + row.toString();
		let totalColour = 0.00;
		for (const [colour, value] of Object.entries(projectWeekObj['colour_totals'])) {
			let colourName = Object.keys(colourMasterDict).find(key => colourMasterDict[key][0] === colour);
			let compareName = colourList[row];
			if(colourName == compareName){
				rates.push(colourMasterDict[colourName][2]);
				for (const [col, colourTotal] of Object.entries(value)) {
					totalColour += colourTotal * 15 / 60;
				}
			} 
			
		}
		qty.push(totalColour);
		tableHTML += `<div class="cellInvoice" value="${cellID}">${totalColour}</div>`;
	}
	
	let i = 0;
	for(let row = rowCount; row < rowCount + 3; row++){
		let cellID = invoiceCol[1] + row.toString();
		tableHTML += `<div class="cellInvoiceTotalLabel" value="${cellID}">${invoiceLabel[i]}</div>`;
		i++;
	}
	tableHTML += '</div>'
	tableContainerQTY.innerHTML = tableHTML;

	//unit price
	let tableContainerUNIT = document.getElementById("unit_price_invoice_table");
	tableContainerUNIT.innerHTML = '';
	tableHTML = '<div>'
	for(let row = 0; row < rowCount; row++){
		let cellID = invoiceCol[2] + row.toString();
		tableHTML += `<div class="cellInvoice" value="${cellID}">${rates[row]}</div>`;
	}
	tableHTML += '</div>'
	tableContainerUNIT.innerHTML = tableHTML;

	//total
	let tableContainerAMOUNT = document.getElementById("amount_invoice_table");
	tableContainerAMOUNT.innerHTML = '';
	tableHTML = '<div>'
	let lastRow = 0;
	for(let row = 0; row < rowCount; row++){
		let cellID = invoiceCol[3] + row.toString();
		let rowTotal = parseFloat(rates[row]) * qty[row];
		invoiceTotal += rowTotal;
		tableHTML += `<div class="cellInvoice" value="${cellID}">$${rowTotal}</div>`;
		lastRow = row;
	}
	tableHTML += `<div class="cellInvoiceTotal" value="D${lastRow + 1}">$${invoiceTotal.toFixed(2)}</div>`;
	tableHTML += `<div class="cellInvoiceTotal" value="D${lastRow + 2}">$0.00</div>`;
	tableHTML += `<div class="cellInvoiceTotal" value="D${lastRow + 3}">$${invoiceTotal.toFixed(2)}</div>`;
	tableHTML += '</div>'
	tableContainerAMOUNT.innerHTML = tableHTML;


	

}


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
	document.getElementById('invoice_date_invoice').innerHTML = reDoDate('invoice_date');
	let startDate = reDoDate('invoice_start_date');
	let endDate = reDoDate('invoice_end_date');
	document.getElementById('invoice_date_period').innerHTML = startDate + " - " + endDate;
	document.getElementById('invoice_for_invoice').innerHTML = document.getElementById('invoice_for').value;
	document.getElementById('invoice_id_invoice').innerHTML = document.getElementById('invoice_ID').value;

	let customerID = $("#customerSelection option:selected").text();
	document.getElementById('customer_id_invoice').innerHTML = customerID;
	document.getElementById('customer_name_invoice').innerHTML = userMasterDict['customer'][customerID]['customerName'];
	document.getElementById('customer_addOne_invoice').innerHTML = userMasterDict['customer'][customerID]['addOne'];
	document.getElementById('customer_addTwo_invoice').innerHTML = userMasterDict['customer'][customerID]['addTwo'];
	document.getElementById('customer_city_invoice').innerHTML = userMasterDict['customer'][customerID]['city'];
	document.getElementById('customer_country_invoice').innerHTML = userMasterDict['customer'][customerID]['country'];

	let userName = $("#userSelection option:selected").text();
	document.getElementById('user_name_invoice').innerHTML = userName;
	document.getElementById('user_addOne_invoice').innerHTML= userMasterDict['user'][userName]['addOne'];
	document.getElementById('user_addTwo_invoice').innerHTML = userMasterDict['user'][userName]['addTwo'];
	document.getElementById('user_city_invoice').innerHTML = userMasterDict['user'][userName]['city'];
	document.getElementById('user_country_invoice').innerHTML = userMasterDict['user'][userName]['country'];
	document.getElementById('user_contact_invoice').innerHTML = userMasterDict['user'][userName]['contact'];
	
	currentChosenProject = $("#projectSelection option:selected").text();
	currentTimeSheet = $("#timeSheetSelection option:selected").text();
	createTable();
	changePage('PAGE_print_invoice');

	
}


function reDoDate(elem){
	let startDateList = document.getElementById(elem).value.split("-")
	let startDate = startDateList[2] + "/" + startDateList[1] + "/" + startDateList[0].substr(2, 3)
	let day = parseInt(startDate.split("/")[0]);
	let month = parseInt(startDate.split("/")[1]);
	let year = parseInt(startDate.split("/")[2]);
	let newDate = day.toString() + "/" + month.toString() + "/" + year.toString()
	return newDate;
}