var chosenProject = "Select a project";
function clickProject(e){
    chosenProject = e.target.querySelector("p").innerHTML;
    document.querySelector(".navName").innerHTML = chosenProject;
    let keyname = chosenProject.replaceAll(" ", "_");
    let duration = projects[keyname]["project_duration"];
    let weekTitles = projects[keyname]["time_sheet_weeks"];


    let elem = '';
    Object.keys(weekTitles).forEach(key => {
        elem += DOM_Blocks.time_sheet_button(key)
    })
    
    document.getElementById("project_buttons").innerHTML = elem;

    changePage('PAGE_project');
}