//Loads data for, and populates an individual budget's page.
//Is called from the budgets selection page when a budget item is selected.
function loadBudgetData(e){
    const budgetID = $(e.target).attr('budgetid');
    let budgetDict = masterDict['budgets'][budgetID];
    selectedBudgetID = budgetID;

    //Create the week selection buttons.
    elem = '';
    for (const [year, yearDict] of Object.entries(budgetDict['years'])){
        elem += DOM_Blocks_Budget.year_button(year);
    }
    //Add the week selection buttons to the page.
    $('#yearly_buttons').empty();
    $('#yearly_buttons').append(elem);

    //Change to the individual budget page.
    currentPage = 'budget_page';
}

function addNewYear(){
    let budgetDict = masterDict['budgets'][selectedBudgetID];
    let newEndYear = budgetDict['endYear'] + 1;
    budgetDict['endYear'] = newEndYear;
    budgetDict['years'][newEndYear] = getDateList(parseInt(newEndYear));
}

function loadMonthData(e){ 
    $('.budget_year_buttons').each((index, year_button) => {
        $(year_button).removeClass('active_button');
    });
    $(e.target).addClass('active_button');

    $('#monthly_buttons').empty();
    let budgetDict = masterDict['budgets'][selectedBudgetID];
    let selectedYearDict = budgetDict['years'][$(e.target).attr('year')];
    selectedBudgetYear = $(e.target).attr('year');

    //Create the week selection buttons.
    let elem = '';
    for (const [month, monthDict] of Object.entries(selectedYearDict)){
        elem += DOM_Blocks_Budget.month_button(month);
    }

    //Add the week selection buttons to the page.
    $('#monthly_buttons').append(elem);
}

function budgetGenTable(e){
    $('.budget_month_buttons').each((index, year_button) => {
        $(year_button).removeClass('active_button');
    });
    $(e.target).addClass('active_button');
    let budgetMonth = masterDict['budgets'][selectedBudgetID]['years'][selectedBudgetYear];
    let columnList = ['startDate', 'endDate']

}