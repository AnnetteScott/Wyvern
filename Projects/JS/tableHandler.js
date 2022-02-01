function cellClicked(e){
    cellIsActive = true;
    let cellID = e.target.getAttribute('value');
    let element = document.querySelector(`[value="${cellID}"]`);
    cellSelect(element);
    selectedCellsList.push(cellID);
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

function setColour(e){
    let colourButtonStyle = window.getComputedStyle(e.target);
    let colour = colourButtonStyle.getPropertyValue('background-color');
    let projectWeekObj = projectMasterDict[currentChosenProject]["time_sheet_weeks"][currentTimeSheet];
    console.log(colour);
    selectedCellsList.forEach(cellID => {
        let element = document.querySelector(`[value="${cellID}"]`);
        if(colour == "rgb(255, 255, 255)"){
            delete projectWeekObj['cells'][cellID];
            element.style.background = "white";
            element.style.borderColor = "black";
        } else{
            projectWeekObj['cells'][cellID] = colour;
            element.style.background = colour;
            element.style.borderColor = "black";
        }
        
    })
    selectedCellsList = [];
    
}