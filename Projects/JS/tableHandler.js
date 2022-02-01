function cellClicked(e){
    let projectWeekObj = projectMasterDict[currentChosenProject]["time_sheet_weeks"][currentTimeSheet];
    let cellID = e.target.getAttribute('value');
    let element = document.querySelector(`[value="${cellID}"]`);
    element.style.background = 'blue';
    projectWeekObj['cells'][cellID] = 'blue';
    console.log(projectWeekObj);
}