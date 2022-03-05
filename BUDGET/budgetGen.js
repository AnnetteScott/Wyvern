function addNewBudget(){
    //Get input data from the Create New Budget dialogue box.
    const budgetName = $("#create_budget_name").val();

    //Guard statments//
    if(budgetName == '' || budgetName == null){ //If no project name was entered.
        $("#create_budget_name").addClass('form_error');
        return false;
    }

    $("#create_budget_name").removeClass('form_error');

    //Generate unique budgetID.
    let budgetID = generateID();

    if(selectedBudgetID == ''){ //If this function was called on a new project.
        while(masterDict['projects'].hasOwnProperty(budgetID)){
            budgetID = generateID();
        }
        let today = new Date();
        let thisYear = today.getFullYear();
        let nextYear = (today.getFullYear() + 1);
        masterDict['budgets'][budgetID] = {'budgetName': budgetName, 'startYear': thisYear, 'endYear': nextYear, 'years': {}}
        masterDict['budgets'][budgetID]['years'][thisYear.toString()] = getDateList(parseInt(thisYear));
        masterDict['budgets'][budgetID]['years'][nextYear.toString()] = getDateList(parseInt(nextYear));

        
    }else{ //If this function was called on editing an existing project.
        console.log("Hi")
        console.log(selectedBudgetID)
    }
    $('#budget_pop_up').removeClass('input_box_open');
    return true;
}

function editProject(e){
	let projectID = $(e.target).attr('projectid');
    let projectDict = masterDict['projects'][projectID];
    $("#create_project_name").val(projectDict['projectName']);
    $("#create_project_date").val();
	$("#create_project_date").css({"filter": "blur(2px)", "pointer-events": "none"});
    $("#create_project_duration").val(parseInt(Object.keys(masterDict['projects'][projectID]['weeks']).length * 2));
	$('#project_pop_up').addClass('input_box_open');
	selectedProjectID = projectID;
}

function getFirstMonday(year) {
    let dateObj = new Date();
    dateObj.setDate(1);
    dateObj.setMonth(0);
    dateObj.setFullYear(year);
    // Get the first Monday in the month
    while (dateObj.getDay() !== 1) {
        dateObj.setDate(dateObj.getDate() + 1);
    }
    let day = dateObj.getDate();
    return day;
}

function getDateList(year){
    let firstDate = "0" + getFirstMonday(year) + "/" + "01";
    let dateList = {}
    dateList[firstDate] = {}
    for(let i = 2; i <= 52; i++){
        dateList[addToDateNoYear(Object.keys(dateList)[i - 2], 7, year)] = {}
    }
    return dateList
}
