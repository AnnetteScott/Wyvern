function createTable(){
    let tableContainer = document.getElementById("invoice_bottom_table");
	tableContainer.innerHTML = '';
	let invoiceCol = ['A', 'B', 'C', 'D'];
	let tableHTML = '';
	let colourList = []
	Object.keys(colourMasterDict).forEach(name => {
        if(colourMasterDict[name][1]['yes'].includes(currentChosenProject)){
            colourList.push(name);
        }    
    })

	tableHTML = '<div>'
	for(col in invoiceCol){
		for(let row = 0; row < colourList.length; row++){
			let cellID = invoiceCol[col] + row.toString();
			tableHTML += `<div value="${cellID}"></div>`;
		}
		tableHTML += '</div>'
	}
	tableContainer.innerHTML = tableHTML;

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

function generageInvoice(){
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