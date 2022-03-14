function createNewTaxYear(){
    let thisYear = new Date().getFullYear();
    let thisMonth = new Date().getMonth();
    let dictKey;
    if(thisMonth <= 2){
        dictKey = `${thisYear - 1} - ${thisYear}`;
    }else{
        dictKey = `${thisYear} - ${thisYear + 1}`;
    }
    if(!Object.keys(masterDict['taxes']).includes(dictKey)){
        masterDict['taxes'][dictKey] = {};
        masterDict['taxes'][dictKey]['income'] = {};
        masterDict['taxes'][dictKey]['expense'] = {};
        masterDict['taxes'][dictKey]['totalTax'] = 0;
    }
} 

function loadTaxData(e){
    const taxYear = $(e.target).attr('taxYear');
    currentTaxYear = taxYear;
    tax_table();
    currentPage = 'tax_page';
}

function tax_table(){
    let taxDict = masterDict['taxes'][currentTaxYear];
    let incomeTotal = 0;
    let netProfitTotal = 0;
    let expenseTotal = 0;
    let totalTax = 0;
    
    let elem = DOM_Blocks_taxes.tax_header('Date', 'Description', 'Amount');
    for (const [incomeID, incomeDict] of Object.entries(taxDict['income'])) {
		elem += DOM_Blocks_taxes.tax_row('income', incomeID, incomeDict['date'], incomeDict['description'], incomeDict['amount']);
        incomeTotal += incomeDict['amount'];
        netProfitTotal += incomeDict['amount'];
	}
    $('#tax_income').empty();
    $('#tax_income').append(elem);
    
    elem = DOM_Blocks_taxes.tax_header('Date', 'Description', 'Amount');
    for(const [expenseID, expenseDict] of Object.entries(taxDict['expense'])){
        elem += DOM_Blocks_taxes.tax_row('expense', expenseID, expenseDict['date'], expenseDict['description'], expenseDict['amount']);
        expenseTotal += expenseDict['amount'];
        netProfitTotal -= expenseDict['amount'];

    }
    $('#tax_expense').empty();
    $('#tax_expense').append(elem);

    totalTax = parseFloat(calculateTax(netProfitTotal).toFixed(2));

    $('#total_income').text(`Total Income: $${incomeTotal}`);
    $('#total_expense').text(`Total Expenses: $${expenseTotal}`);
    $('#total_net_profit').text(`Net Profit: $${netProfitTotal}`);
    $('#total_tax').text(`Total Tax & ACC: $${totalTax}`);

    taxDict['incomeTotal'] = incomeTotal;
    taxDict['expenseTotal'] = expenseTotal;
    taxDict['netProfitTotal'] = netProfitTotal;
    taxDict['totalTax'] = totalTax;
}

function addNewExpense(){
    let expenseDate = new Date().toDateString();
    expenseDate = expenseDate.substring(4, expenseDate.length)
    let expenseDescription = $("#expense_des").val();
    let expenseAmount = parseFloat($("#expense_amount").val());

    let thisYear = new Date().getFullYear();
    let thisMonth = new Date().getMonth();
    let dictKey;
    if(thisMonth <= 2){
        dictKey = `${thisYear - 1} - ${thisYear}`;
    }else{
        dictKey = `${thisYear} - ${thisYear + 1}`;
    }

	let expenseID = generateID();
	while(masterDict['taxes'][dictKey]['expense'].hasOwnProperty(expenseID)){
		expenseID = generateID();
	}
	masterDict['taxes'][dictKey]['expense'][expenseID] = {'date': expenseDate, 'description': expenseDescription, 'amount': expenseAmount}

    cancelPopUp();
}

function addnewIncome(){
    let incomeDate = new Date().toDateString();
    incomeDate = incomeDate.substring(4, incomeDate.length)
    let incomeDescription = $("#income_des").val();
    let incomeAmount = parseFloat($("#income_amount").val());

    let thisYear = new Date().getFullYear();
    let thisMonth = new Date().getMonth();
    let dictKey;
    if(thisMonth <= 2){
        dictKey = `${thisYear - 1} - ${thisYear}`;
    }else{
        dictKey = `${thisYear} - ${thisYear + 1}`;
    }

	let incomeID = generateID();
	while(masterDict['taxes'][dictKey]['income'].hasOwnProperty(incomeID)){
		incomeID = generateID();
	}
	masterDict['taxes'][dictKey]['income'][incomeID] = {'date': incomeDate, 'description': incomeDescription, 'amount': incomeAmount}

    cancelPopUp();
}

function editRow(e){
    const type = $(e.target).attr('taxtype');
    const rowID = $(e.target).attr('rowid');
    $(`#${type}_pop_up`).addClass('input_box_open');
    $(`#create_${type}_button`).addClass('hidden');
    $(`#save_${type}_button`).removeClass('hidden');
    $(`#delete_${type}_button`).removeClass('hidden');
    $(`#save_${type}_button`).attr(`rowid`, `${rowID}`);
    $(`#delete_${type}_button`).attr(`rowid`, `${rowID}`);
    let thisYear = new Date().getFullYear();
    let thisMonth = new Date().getMonth();
    let dictKey;
    if(thisMonth <= 2){
        dictKey = `${thisYear - 1} - ${thisYear}`;
    }else{
        dictKey = `${thisYear} - ${thisYear + 1}`;
    }
    $(`#${type}_des`).val(masterDict['taxes'][dictKey][type][rowID]['description']);
    $(`#${type}_amount`).val(masterDict['taxes'][dictKey][type][rowID]['amount']);
}

function saveTax(e){
    const type = $(e.target).attr('taxtype');
    const rowID = $(e.target).attr('rowid');
    let thisYear = new Date().getFullYear();
    let thisMonth = new Date().getMonth();
    let dictKey;
    if(thisMonth <= 2){
        dictKey = `${thisYear - 1} - ${thisYear}`;
    }else{
        dictKey = `${thisYear} - ${thisYear + 1}`;
    }
    masterDict['taxes'][dictKey][type][rowID]['description'] = $(`#${type}_des`).val();
    masterDict['taxes'][dictKey][type][rowID]['amount'] = parseFloat($(`#${type}_amount`).val());
    cancelPopUp();
}

function deleteTax(e){
    const type = $(e.target).attr('taxtype');
    const rowID = $(e.target).attr('rowid');
    let thisYear = new Date().getFullYear();
    let thisMonth = new Date().getMonth();
    let dictKey;
    if(thisMonth <= 2){
        dictKey = `${thisYear - 1} - ${thisYear}`;
    }else{
        dictKey = `${thisYear} - ${thisYear + 1}`;
    }
    delete masterDict['taxes'][dictKey][type][rowID];
    cancelPopUp();
}
