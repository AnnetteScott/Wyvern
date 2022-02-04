function cellClicked(e){
    cellIsActive = true;
    let cellID = e.target.getAttribute('value');
    let element = document.querySelector(`[value="${cellID}"]`);
    cellSelect(element);
    if(selectedCellsList != []){
        selectedCellsList.forEach(cellIDR => {
            let pCell = document.querySelector(`[value="${cellIDR}"]`);
            let colouredCells = projectMasterDict[currentChosenProject]["time_sheet_weeks"][currentTimeSheet]['cells'];
            if(cellIDR in colouredCells){
                cellDeSelect(pCell, colouredCells[cellIDR]);
            } else {
                cellDeSelect(pCell, "white");
            }
            
        });
    }
    selectedCellsList = [cellID];

    let firstTime = "Z" + cellID.substring(1);
    cellSelectFirstTime = document.querySelector(`[value="${firstTime}"]`).innerHTML;
    let firstTimeList = cellSelectFirstTime.split(":");
    let secondTime = firstTimeList[0] + ":" +(parseInt(firstTimeList[1]) + 14).toString();
    let timePeriod = cellSelectFirstTime + " to "+ secondTime;
    document.getElementById('user_selection_tip').innerHTML = `Time Selected: 0.25 ${timePeriod} `
    document.getElementById('user_selection_tip').classList.remove("hidden");
}

function cellHovered(e){
    if(cellIsActive){
        let cellID = e.target.getAttribute('value');
        if(selectedCellsList.includes(cellID)){

        }else{
            let element = document.querySelector(`[value="${cellID}"]`);
            cellSelect(element);
            selectedCellsList.push(cellID);
            timeSelected = selectedCellsList.length * 15 / 60;
            let secondCell = "Z" + cellID.substring(1);
            let secondTime = document.querySelector(`[value="${secondCell}"]`).innerHTML.split(":");
            let lastTime = cellSelectFirstTime + " to " + secondTime[0] +  ":" +(parseInt(secondTime[1]) + 14).toString();
            document.getElementById('user_selection_tip').innerHTML = `Time Selected: ${timeSelected} <br /> ${lastTime}`
        }   
    }
}

function cellRelease(e){
    cellIsActive = false;
    document.getElementById('user_selection_tip').classList.add("hidden");
}

function cellSelect(element){
    element.style.borderColor = "cyan";
    element.style.background = "#D1D3D9";
}

function cellDeSelect(element, colour){
    element.style.borderColor = "black";
    element.style.background = colour;
}

function setColour(e){
    let colourButtonStyle = window.getComputedStyle(e.target);
    let colour = colourButtonStyle.getPropertyValue('background-color');
    let projectWeekObj = projectMasterDict[currentChosenProject]["time_sheet_weeks"][currentTimeSheet];
    selectedCellsList.forEach(cellID => {
        let element = document.querySelector(`[value="${cellID}"]`);
        let previousColour = null;
        if(Object.keys(projectWeekObj['cells']).includes(cellID)){
            previousColour = projectWeekObj['cells'][cellID];
        }
        if(colour == "rgb(255, 255, 255)"){
            delete projectWeekObj['cells'][cellID];
            cellDeSelect(element, "white");
            let col = cellID.substring(0, 1)
            if(previousColour != null){
                projectWeekObj['colour_totals'][previousColour][col] -= 1;
            }
        } else{
            let col = cellID.substring(0, 1)
            if(previousColour != null){
                projectWeekObj['colour_totals'][previousColour][col] -= 1;
            }
            projectWeekObj['cells'][cellID] = colour;
            projectWeekObj['colour_totals'][colour][col] += 1;
            element.style.background = colour;
            element.style.borderColor = "black";
        }
         
    })

    selectedCellsList = [];

    //Total Each colour
    let cellIndex = 97;
    for (const [colour, value] of Object.entries(projectWeekObj['colour_totals'])) {
        let colourName = Object.keys(colourMasterDict).find(key => colourMasterDict[key][0] === colour);
        let compareName = document.querySelector(`[value="Z${cellIndex}"]`).innerHTML;
        if(colourName == compareName){
            rowSumTotal[colourName] = 0;
            for (const [col, colourTotal] of Object.entries(value)) {
                let cellID = col + cellIndex.toString();
                let element = document.querySelector(`[value="${cellID}"]`);
                let hours = colourTotal * 15 / 60;
                element.innerHTML = hours.toString();
                rowSumTotal[colourName] += (hours * colourMasterDict[colourName][2])
            }
            cellIndex++;
        } 
        
    }

    //Day total hours
    for(let i = 1; i < colLetter.length; i++){
        let totalHours = 0.00;
        let col = colLetter[i];
        let cellInd = 97;
        for(let colour = 0; colour < colourCount; colour++){
            let cellID = col + cellInd.toString();
            totalHours += parseFloat(document.querySelector(`[value="${cellID}"]`).innerHTML);
            cellInd += 1;
        }
        let lastCell = col + cellInd.toString();
        document.querySelector(`[value="${lastCell}"]`).innerHTML = totalHours.toString()
    }

    //Weekly Total
    let colIndex = 1;
    let weekIndex = 1;
    for(let k = 0; k < 2; k++){
        let weeklyTotal = 0
        for(let i = 0; i < 7; i++){
            let cellIDW = colLetter[colIndex] + (rowCount - 3).toString();
            colIndex++;
            weeklyTotal += parseFloat(document.querySelector(`[value="${cellIDW}"]`).innerHTML);
        }
        let cellW = colLetter[weekIndex] + (rowCount - 2).toString();
        document.querySelector(`[value="${cellW}"]`).innerHTML = weeklyTotal.toString();
        weekIndex = 8;
    }

    //Total Timesheet hours
    document.querySelector(`[value="A${rowCount - 1}"]`).innerHTML = (parseFloat(document.querySelector(`[value="A${rowCount - 2}"]`).innerHTML) + parseFloat(document.querySelector(`[value="H${rowCount - 2}"]`).innerHTML)).toString();

    let moneyTotal = 0
    //Timesheet money total
    for (const [proj, dollarTotal] of Object.entries(rowSumTotal)) {
        moneyTotal += dollarTotal
    }
    document.querySelector(`[value="A${rowCount}"]`).innerHTML = '$'+ parseFloat(moneyTotal);
}