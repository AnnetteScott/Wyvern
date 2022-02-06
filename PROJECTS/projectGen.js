function addNewProject(){
    let projectClientID = $("#client_project_selection option:selected").val();
    let projectName = $("#create_project_name").val();
    let projectStartDate = reDoDate('create_project_date');
    let projectDuration = parseInt($("#create_project_duration").val());

    if(typeof projectClientID == 'undefined'){
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
        if(typeof masterDict['projects'][projectClientID] == 'undefined'){
            masterDict['projects'][projectClientID] = {};
        }
        while(masterDict['projects'][projectClientID].hasOwnProperty(projectID)){
            projectID = generateID();
        }

        masterDict['projects'][projectClientID][projectID] = {}
        masterDict['projects'][projectClientID][projectID][projectName] = {}
        masterDict['projects'][projectClientID][projectID][projectName]['weeks'] = {}

        //Make project duration even
        if(projectDuration % 2 == 1){
            projectDuration++;
        }

        let previousDate = projectStartDate;
        for(let i = 1; i < projectDuration; i += 2){
            let weekTwo = i + 1;
            let weekTitle = i.toString() + " - " + weekTwo.toString();

            masterDict['projects'][projectClientID]
            
            masterDict['projects'][projectClientID][projectID][projectName]['weeks'][weekTitle] = {'startDate': previousDate, 'colourCells': {}, 'totalColour': {}, 'totalCol': {}}
            previousDate = addToDate(previousDate, 14)
        }


        $("#create_project_name").val('')
        $("#create_project_duration").val('')
        currentPage = "settings";
    }
}