function createProject(){
    let name = document.getElementById('project_name').value;
    let keyname = name.replaceAll(" ", "_");
    if(keyname in projects){
        //Name already exists, throw error
    }else if(createProjectValidate() === false){
        document.querySelector('.creation_form').classList.add('form_error');
    }else{
        document.querySelector('.creation_form').classList.remove('form_error');
        projects[keyname] = project_template();
        let dur = parseInt(document.getElementById('project_duration').value);
        if(dur % 2 === 1){
            dur++;
        }
        projects[keyname]["project_duration"] = dur;

        let startDateList = document.getElementById('project_date').value.split("-")
        let startDate = startDateList[2] + "/" + startDateList[1] + "/" + startDateList[0].substr(2, 3) 
        
        let day = parseInt(startDate.split("/")[0]);
        let month = parseInt(startDate.split("/")[1]);
        let year = parseInt(startDate.split("/")[2]);
        let project_dates = {'Weeks 1 - 2': {'start_date':startDate, 'cells': {}}};
        for(let i = 3; i < dur; i++){
            let week1 = i;
            let week2 = i + 1;
            let title = "Weeks " + week1.toString() + " - " + week2.toString();
            day += 14;
            if(day > getMonth(month, year)){
                day = day - getMonth(month, year);
                month++;
            }
            let newDate = day.toString() + "/" + month.toString() + "/" + year.toString()
            project_dates[title] = {'start_date':newDate, 'cells': {}};
            i++;
        }

        projects[keyname]["time_sheet_weeks"] = project_dates;

        //Clear inputs
        document.getElementById('project_duration').value = "";
        document.getElementById('project_date').value = "";
        document.getElementById('project_name').value = "";
        
        changePage('PAGE_projects');
    }
}

function createProjectValidate(){
    if(document.getElementById('project_duration').value == "" || document.getElementById('project_duration').value == null){
        return false;
    }else if(document.getElementById('project_date').value == "" || document.getElementById('project_date').value == null){
        return false;
    }else if(document.getElementById('project_name').value == "" || document.getElementById('project_name').value == null){
        return false;
    } else {
        return true;
    }
    
}

function deleteAllProjects(){
    if (confirm("You are about to delete all projects. Continue?")) {
        projects = {};
    }
}
