let projects = [];

project_template = function (){
    return {
        project_name: '',
        project_duration: 0,
        project_start_date: null
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
    /* alerty.title = "Warning";
    alerty.message = "You are about to delete all projects. Continue?";
    alerty.options = ["Ok"] */
    if (confirm("You are about to delete all projects. Continue?")) {
        projects = [];
        document.getElementById("projects_list").innerHTML = "";
    }
}