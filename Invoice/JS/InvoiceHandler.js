function createTable(){
    let e = document.getElementById("timeSheetSelection");
    currentTimeSheet = e.options[e.selectedIndex].text
    let tableContainer = document.getElementById("invoice_timesheet_table");
    tableGen(tableContainer);
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
