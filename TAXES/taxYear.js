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
    let taxDict = masterDict['taxes'][taxYear];
    let incomeTotal = 0;
    let netProfitTotal = 0;
    let expenseTotal = 0;
    let totalTax = 0;
    
    let elem = DOM_Blocks_taxes.tax_row('Date', 'Description', 'Amount');
    for (const [incomeID, incomeDict] of Object.entries(taxDict['income'])) {
		elem += DOM_Blocks_taxes.tax_row(incomeDict['date'], incomeDict['description'], incomeDict['amount']);
        incomeTotal += incomeDict['amount'];
        netProfitTotal += incomeDict['amount'];
	}
    $('#tax_income').empty();
    $('#tax_income').append(elem);
    
    elem = DOM_Blocks_taxes.tax_row('Date', 'Description', 'Amount');
    for(const [expenseID, expenseDict] of Object.entries(taxDict['expense'])){
        elem += DOM_Blocks_taxes.tax_row(expenseDict['date'], expenseDict['description'], expenseDict['amount']);
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

    currentPage = 'tax_page';
}

function calculateTax(amount){
    let accPercent = 0.014;
    let firstTax = [0.105, 14000];
    let secondTax = [0.175, 48000];
    let thirdTax = [0.3, 70000];
    let fourthTax = [0.33, 180000];
    let fifthTax = [0.39]; 

    let accAmount = amount * accPercent;

    let firstAmount = amount > firstTax[1] ? firstTax[1] * firstTax[0]: amount * firstTax[0];
    
    amount = Math.max(0, amount - firstTax[1]);

    let secondAmount = amount > secondTax[1] ? secondTax[1] * secondTax[0]: amount * secondTax[0];
    amount = Math.max(0, amount - secondTax[1]);

    let thirdAmount = amount > thirdTax[1] ? thirdTax[1] * thirdTax[0]: amount * thirdTax[0];
    amount = Math.max(0, amount - thirdTax[1]);

    let fourthAmount = amount > fourthTax[1] ? fourthTax[1] * fourthTax[0]: amount * fourthTax[0];
    amount = Math.max(0, amount - fourthTax[1]);
    
    let fifthAmount = amount * fifthTax[0];

    let totalTax = firstAmount + secondAmount + thirdAmount + fourthAmount + fifthAmount;

    return totalTax + accAmount
}

function addNewExpense(){
    let expenseDate = new Date().toDateString();
    expenseDate = expenseDate.substring(4, expenseDate.length)
    let expenseDescription = $("#expense_des").val();
    let expenseAmount = parseInt($("#expense_amount").val());

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