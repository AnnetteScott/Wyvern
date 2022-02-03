function createProject(){
    let name = document.getElementById('create_project_name').value;
    let keyname = name.replaceAll(" ", "_");
    if(keyname in projectMasterDict){
        //Name already exists, throw error
    }else if(createProjectValidate() === false){ //check if all project inputs are valid
        document.querySelector('.creation_form').classList.add('form_error');
    }else{
        document.querySelector('.creation_form').classList.remove('form_error');
        projectMasterDict[keyname] = project_template();
        let dur = parseInt(document.getElementById('create_project_duration').value);
        if(dur % 2 === 1){
            dur++;
        }
        projectMasterDict[keyname]["project_duration"] = dur;

        let startDateList = document.getElementById('create_project_date').value.split("-")
        let startDate = startDateList[2] + "/" + startDateList[1] + "/" + startDateList[0].substr(2, 3) 
        
        let day = parseInt(startDate.split("/")[0]);
        let month = parseInt(startDate.split("/")[1]);
        let year = parseInt(startDate.split("/")[2]);
        let project_dates = {'1 - 2': {'start_date':startDate, 'cells': {}, 'colour_totals':{}}};
        for(let i = 3; i < dur; i++){
            let week1 = i;
            let week2 = i + 1;
            let title = week1.toString() + " - " + week2.toString();
            day += 14;
            if(day > getMonth(month, year)){
                day = day - getMonth(month, year);
                month++;
            }
            let newDate = day.toString() + "/" + month.toString() + "/" + year.toString()
            project_dates[title] = {'start_date':newDate, 'cells': {}, 'colour_totals':{}};
            i++;
        }

        projectMasterDict[keyname]["time_sheet_weeks"] = project_dates;

        //Clear inputs
        document.getElementById('create_project_duration').value = "";
        document.getElementById('create_project_date').value = "";
        document.getElementById('create_project_name').value = "";
        
        changePage('PAGE_projects');
    }
}

function createProjectValidate(){
    if(document.getElementById('create_project_duration').value == "" || document.getElementById('create_project_duration').value == null){
        return false;
    }else if(document.getElementById('create_project_date').value == "" || document.getElementById('create_project_date').value == null){
        return false;
    }else if(document.getElementById('create_project_name').value == "" || document.getElementById('create_project_name').value == null){
        return false;
    } else {
        return true;
    }
    
}