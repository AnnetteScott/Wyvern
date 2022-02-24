let selectedBudgetID = '';

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
        masterDict['budgets'][budgetID] = {'budgetName': budgetName, 'startYear': (today.getFullYear()), 'endYear': (today.getFullYear() + 1)}
        
    }else{ //If this function was called on editing an existing project.
        
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