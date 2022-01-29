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
        projects[keyname]["project_duration"] = dur % 2 === 1 ? dur++ : dur; //Ensure project duration is even
        projects[keyname]["project_start_date"] = document.getElementById('project_date').value;

        //Clear inputs
        document.getElementById('project_duration').value = "";
        document.getElementById('project_date').value = "";
        document.getElementById('project_name').value = "";
        
        changePage('PAGE_projects');
    }
}


function createProject(){    
    let new_project = project_template();

    let pName = prompt("Please Enter A Project Name");
    if(pName != null){
        let duration = prompt("Please Enter The Total Number Of Weeks " + pName + " Will Run For");
        if(/^\d+$/.test(duration)){
            let startDate = prompt("Please Enter A Date In The Fromat dd/mm/yy e.g 03/01/22");
            new_project.project_name = pName
            new_project.project_duration = duration
            new_project.project_start_date = startDate
            projects.push(new_project);
            document.getElementById("projects_list").innerHTML += DOM_Blocks.small_project_card(projects.length, new_project.project_name);
        }
        
    }
    else{
        window.alert("Please Enter A Name");
    }
}

function deleteAllProjects(){
    if (confirm("You are about to delete all projects. Continue?")) {
        projects = [];
        document.getElementById("projects_list").innerHTML = "";
    }
}