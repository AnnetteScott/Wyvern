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
/* 
    new_project.project_name = document.getElementById("pName").value;
    new_project.project_duration = document.getElementById("duration").value;
    new_project.project_start_date = document.getElementById("startDate").value;
*/
    projects.push(new_project);

    console.log(projects); 

    document.getElementById("projects_list").innerHTML += DOM_Blocks.small_project_card(projects.length, "Hats");
}

function deleteAllProjects(){
    alerty.title = "Warning";
    alerty.message = "You are about to delete all projects. Continue?";
    alerty.options = ["Ok"]
    alerty.show();
    projects = [];
    document.getElementById("projects_list").innerHTML = "";
}