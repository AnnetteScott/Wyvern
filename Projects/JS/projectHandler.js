function deleteAllProjects(){
    if (confirm("You are about to delete all projects. Continue?")) {
        projects = {};
    }
}

function clickProject(e){
    currentPage = e.target.querySelector("p").innerHTML;
    document.querySelector(".navName").innerHTML = currentPage;
    let keyname = currentPage.replaceAll(" ", "_");
    currentChosenProject = keyname;
    let weekTitles = projectMasterDict[keyname]["time_sheet_weeks"];


    let elem = '';
    Object.keys(weekTitles).forEach(key => {
        elem += DOM_Blocks.time_sheet_button(key)
    })
    
    document.getElementById("project_buttons").innerHTML = elem;

    changePage('PAGE_project');
}