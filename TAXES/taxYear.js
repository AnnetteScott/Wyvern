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
    let taxDict = masterDict['taxes'][taxYear];
    
    let elem = DOM_Blocks_taxes.tax_row('Date', 'Description', 'Amount');
    for (const [incomeID, incomeDict] of Object.entries(taxDict['income'])) {
		elem += DOM_Blocks_taxes.tax_row(incomeDict['date'], incomeDict['description'], incomeDict['amount']);
	}
    $('#tax_income').empty();
    $('#tax_income').append(elem);
    
    elem = DOM_Blocks_taxes.tax_row('Date', 'Description', 'Amount');
    for(const [expenseID, expenseDict] of Object.entries(taxDict['expense'])){
		elem += DOM_Blocks_taxes.tax_row(expenseDict['date'], expenseDict['description'], expenseDict['amount']);
	}
    $('#tax_expense').empty();
    $('#tax_expense').append(elem);


    currentPage = 'tax_page';
}