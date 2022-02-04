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