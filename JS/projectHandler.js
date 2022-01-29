var chosenProject = "Select a project";
function clickProject(e){
    chosenProject = e.target.querySelector("p").innerHTML;
    document.querySelector(".navName").innerHTML = chosenProject;
    let keyname = chosenProject.replaceAll(" ", "_");
    var duration = projects[keyname]["project_duration"]

    let elem = '';
    let week1 = 1;
    let week2 = 1;
    for(let i = 1; week2 < duration; i++){
        week2 = week1 + 1;
        elem += DOM_Blocks.time_sheet_button(week1, week2)
        week1 = week2 + 1;
    }
    document.getElementById("project_buttons").innerHTML = elem;


    changePage('PAGE_project');
}