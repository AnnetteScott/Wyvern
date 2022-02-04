function updateProjectSelection(){
    let elem = '<label for="projectSelection">Choose a Project:</label>';
    elem += '<select name="projectSelection" id="projectSelection">';
    Object.keys(projectMasterDict).forEach(projName => {
        elem += `<option value="${projName}">${projName}</option>`;
        currentChosenProject = projName;
    });
    elem += '</select>';
    document.getElementById("project_selection_box").innerHTML = elem;
    updateTimeSheetSelection();
    
}

function updateTimeSheetSelection(){
    let elem = '<label for="timeSheetSelection">Choose A Week</label>';
    elem += '<select name="timeSheetSelection" id="timeSheetSelection">';
    Object.keys(projectMasterDict[currentChosenProject]['time_sheet_weeks']).forEach(timeWeek => {
        elem += `<option value="${timeWeek}">${timeWeek}</option>`;
    });
    elem += '</select>';
    document.getElementById("week_selection_box").innerHTML = elem;
    let e = document.getElementById("timeSheetSelection");
    e.options[e.selectedIndex].text = "1 - 2";
    UpdateCustomer();
    UpdateUser();
}