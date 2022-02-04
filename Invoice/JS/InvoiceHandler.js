function createTable(){
    let e = document.getElementById("timeSheetSelection");
    currentTimeSheet = e.options[e.selectedIndex].text
    let tableContainer = document.getElementById("invoice_timesheet_table");
    tableGen(tableContainer);
}

function createInvoice(){
    changePage('PAGE_print_invoice');
    //document.querySelector("nav").classList.add('hidden');
    //window.print();
    //changePage('PAGE_invoice');
    //document.querySelector("nav").classList.remove('hidden');
}

function printInvoice(elem = 'PRINTtheTHING'){
    document.querySelector("nav").classList.add('hidden');
    printDiv(elem);
/*     let printingDoc = window.open();
    printingDoc.document.write(document.getElementById(elem).innerHTML);
    printingDoc.document.head.insertAdjacentHTML("beforeend", `<link rel="stylesheet" href="Invoice/CSS/printout.css">`)
    printingDoc.print();
    printingDoc.close(); */
    document.querySelector("nav").classList.remove('hidden');
}

function printDiv(id) {

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