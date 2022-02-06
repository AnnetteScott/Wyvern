function addNewProject(){
    let ClientID = $("#client_project_selection option:selected").val();
    let projectName = $("#create_project_name").val();
    let projectStartDate = reDoDate('create_project_date');
    let projectDuration = parseInt($("#create_project_duration").val());


    if(typeof ClientID == 'undefined'){
        $("#client_project_selection").addClass('form_error');
    }else if(projectName == ''){
        $("#create_project_name").addClass('form_error');
        $("#client_project_selection").removeClass('form_error');
    }else if(projectStartDate == 'NaN/NaN/NaN'){
        $("#create_project_date").addClass('form_error');
        $("#create_project_name").removeClass('form_error');
    }else if(projectStartDate == 'NaN'){
        $("#create_project_duration").addClass('form_error');
        $("#create_project_date").removeClass('form_error');
    }else{

        //Generate unique projectID 
        let projectID = generateID();
        while(masterDict['projects'].hasOwnProperty(projectID)){
            projectID = generateID();
        }

        masterDict['projects'][projectID] = {'projectName': projectName};
        masterDict['projects'][projectID]['colourList'] = [];
        masterDict['projects'][projectID]['weeks'] = {};

        //Make project duration even
        if(projectDuration % 2 == 1){
            projectDuration++;
        }

        let previousDate = projectStartDate;
        for(let i = 1; i < projectDuration; i += 2){
            let weekTwo = i + 1;
            let weekTitle = i.toString() + " - " + weekTwo.toString();
            
            masterDict['projects'][projectID]['weeks'][weekTitle] = {'startDate': previousDate, 'colourCells': {}, 'totalColour': {}, 'totalCol': {}}
            previousDate = addToDate(previousDate, 14)
        }

        masterDict['clients'][ClientID]['projects'].push(projectID);

        $("#create_project_name").val('')
        $("#create_project_duration").val('')
        $('#project_pop_up').removeClass('input_box_open');
    }
}