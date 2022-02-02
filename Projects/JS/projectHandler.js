function deleteAllProjects(){
    if (confirm("You are about to delete all projects. Continue?")) {
        projectMasterDict = {};
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
    

    let elemRibbon = '<div class="color_button" onclick="setColour(event)" style="background-color: white;">White</div>';
    Object.keys(colourMasterDict).forEach(name => {
        if(colourMasterDict[name][1]['yes'].includes(currentChosenProject)){
            elemRibbon += DOM_Blocks.colour_ribbon(name, colourMasterDict[name][0])
        }    
    })
    document.getElementById("project_ribbon").innerHTML = elemRibbon;
    changePage('PAGE_project');
}