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
        projects[keyname]["project_start_date"] = document.getElementById('project_date').value;

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
