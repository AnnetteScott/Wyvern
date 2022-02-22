let selectedProjectID = '';

function addNewProject(){
    //Get input data from the Create New Project dialogue box.
    let ClientID = $("#client_project_selection option:selected").val();
    let projectName = $("#create_project_name").val();
    let projectStartDate = reDoDate('create_project_date');
    let projectDuration = parseInt($("#create_project_duration").val());

    //Guard statments//
    if(typeof ClientID == 'undefined'){ //If no client is selected.
        $("#client_project_selection").addClass('form_error');
        return false;
    }
    if(projectName == '' || projectName == null){ //If no project name was entered.
        $("#create_project_name").addClass('form_error');
        $("#client_project_selection").removeClass('form_error');
        return false;
    }
    if(projectStartDate == 'NaN/NaN/NaN' && selectedProjectID == ''){ //If no date was provided (only guard newly created projects).
        $("#create_project_date").addClass('form_error');
        $("#create_project_name").removeClass('form_error');
        return false;
    }
    if(projectDuration == 'NaN' && selectedProjectID == ''){ //If no duration was provided (only guard newly created projects).
        $("#create_project_duration").addClass('form_error');
        $("#create_project_date").removeClass('form_error');
        return false;
    }
    if(selectedProjectID != ''){
        if(projectDuration <  masterDict['projects'][selectedProjectID]['projectDur']){
            $("#create_project_duration").addClass('form_error');
            return false;
        }
    }
    $("#create_project_duration").removeClass('form_error');

    //Generate unique projectID.
    let projectID = generateID();
    //Ensure project duration is even.
    if(projectDuration % 2 == 1){
        projectDuration++;
    }

    if(selectedProjectID == ''){ //If this function was called on a new project.
        while(masterDict['projects'].hasOwnProperty(projectID)){
            projectID = generateID();
        }
        masterDict['projects'][projectID] = {'projectName': projectName};
        masterDict['projects'][projectID]['colourList'] = [];
        masterDict['projects'][projectID]['weeks'] = {};
        let previousDate = projectStartDate;
        for(let i = 1; i < projectDuration; i += 2){
            let weekTwo = i + 1;
            let weekTitle = i.toString() + " - " + weekTwo.toString();
            
            masterDict['projects'][projectID]['weeks'][weekTitle] = {'startDate': previousDate, 'colourCells': {}, 'totalColumnColour': {}, 'totalColumn': {}, 'totalColour$': {}};
            previousDate = addToDate(previousDate, 14);
        }
        
    }else{ //If this function was called on editing an existing project.
        let previousClientID = '';
        for (const [clientID, clientDict] of Object.entries(masterDict['clients'])) {
            const indexProj = clientDict['projects'].indexOf(selectedProjectID);
            if (indexProj > -1) {
                previousClientID = clientID;
            }
        }
        masterDict['projects'][selectedProjectID]['projectName'] = projectName;
        const index = masterDict['clients'][previousClientID]['projects'].indexOf(selectedProjectID);
        masterDict['clients'][previousClientID]['projects'].splice(index, 1);
        projectID = selectedProjectID;
        let currProjDur = masterDict['projects'][selectedProjectID]['projectDur'];
        if(projectDuration >  currProjDur){
            let lastWeek = (currProjDur - 1) + " - " + (currProjDur);
            let previousDate = addToDate(masterDict['projects'][selectedProjectID]['weeks'][lastWeek]['startDate'], 14);
            for(let i = (currProjDur + 1); i < projectDuration; i += 2){
                let weekTwo = i + 1;
                let weekTitle = i.toString() + " - " + weekTwo.toString();
                
                masterDict['projects'][projectID]['weeks'][weekTitle] = {'startDate': previousDate, 'colourCells': {}, 'totalColumnColour': {}, 'totalColumn': {}, 'totalColour$': {}};
                previousDate = addToDate(previousDate, 14);
            }
        }
    }

    //Create/Update the project in the masterDict.
    masterDict['clients'][ClientID]['projects'].push(projectID);
    $("#create_project_name").val('');
    $("#create_project_duration").val('');
    $('#project_pop_up').removeClass('input_box_open');
    selectedID = ''; //Deselect any selected project.
    return true;
}

function editProject(e){
	let projectID = $(e.target).attr('projectid');
    let projectDict = masterDict['projects'][projectID];
    masterDict['projects'][projectID]['projectDur'] = parseInt(Object.keys(masterDict['projects'][projectID]['weeks']).length * 2);
    let projectDur = masterDict['projects'][projectID]['projectDur']
    $("#create_project_name").val(projectDict['projectName']);
	$("#create_project_date").css({"filter": "blur(2px)", "pointer-events": "none"});
    $("#create_project_duration").val(projectDur);
	$('#project_pop_up').addClass('input_box_open');
	selectedProjectID = projectID;
}