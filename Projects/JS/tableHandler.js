function cellClicked(e){
    cellIsActive = true;
    let cellID = e.target.getAttribute('value');
    let element = document.querySelector(`[value="${cellID}"]`);
    cellSelect(element);
    if(selectedCellsList != []){
        selectedCellsList.forEach(cellIDR => {
            let pCell = document.querySelector(`[value="${cellIDR}"]`);
            cellDeSelect(pCell);
        });
    }
    selectedCellsList = [cellID];
}

function cellHovered(e){
    if(cellIsActive){
        let cellID = e.target.getAttribute('value');
        let element = document.querySelector(`[value="${cellID}"]`);
        cellSelect(element);
        selectedCellsList.push(cellID);
    }
}

function cellRelease(e){
    cellIsActive = false;
}

function cellSelect(element){
    element.style.borderColor = "blue";
    element.style.background = "#D1D3D9";
}

function cellDeSelect(element){
    element.style.borderColor = "black";
    element.style.background = "white";
}

function setColour(e){
    let colourButtonStyle = window.getComputedStyle(e.target);
    let colour = colourButtonStyle.getPropertyValue('background-color');
    let projectWeekObj = projectMasterDict[currentChosenProject]["time_sheet_weeks"][currentTimeSheet];
    console.log(colour);
    selectedCellsList.forEach(cellID => {
        let element = document.querySelector(`[value="${cellID}"]`);
        if(colour == "rgb(255, 255, 255)"){
            delete projectWeekObj['cells'][cellID];
            cellDeSelect(element);
        } else{
            projectWeekObj['cells'][cellID] = colour;
            element.style.background = colour;
            element.style.borderColor = "black";
        }
        
    })
    selectedCellsList = [];
    
}