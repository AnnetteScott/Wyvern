function tableGen(e){
    currentTimeSheet = e.target.getAttribute('value');
    let projectWeekObj = projectMasterDict[currentChosenProject]["time_sheet_weeks"][currentTimeSheet];
    let timeList = timeGen(projectWeekObj);
    document.querySelector(".navName").innerHTML = currentPage + " Weeks " + currentTimeSheet;
    let tableContainer = document.getElementById("project_table");
    tableContainer.innerHTML = ''
    let colLetter = ['Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
    rowCount = 100 + colourCount;
    let tableHTML = '';
    let dateList = dateGen(projectWeekObj)
    for(col in colLetter){
        if(colLetter[col] == 'Z'){tableHTML += '<div id="z_col">'} else { tableHTML += '<div>'}
        for(let row = 0; row <= rowCount; row++){
            let cellID = colLetter[col] + row.toString();
            if(colLetter[col] != 'Z'){
                if(row == 0){
                    tableHTML += `<div value="${cellID}">${dateList[col - 1]}</div>`;
                } else if(row == rowCount - 2 && (colLetter[col] == 'A' || colLetter[col] == 'H')){
                    tableHTML += `<div class="weeklyTotals" value="${cellID}"></div>`;
                } else if(row >= rowCount - 1 && colLetter[col] == 'A'){
                    tableHTML += `<div class="time_sheet_totals" value="${cellID}"></div>`;
                } else if(row >= 97 && row <= rowCount - 3){
                    tableHTML += `<div value="${cellID}"></div>`;
                } else if (row < 97){
                    tableHTML += `<div value="${cellID}" onmousedown="cellClicked(event)" onmouseover="cellHovered(event)" onmouseup="cellRelease(event)"></div>`;
                }
            }else{
                tableHTML += `<div class="z_time_col" value="${cellID}">${timeList[row]}</div>`;
            }
        }
        tableHTML += '</div>';
    }
    tableContainer.innerHTML = tableHTML;
    let colouredCellList = projectWeekObj['cells'];
    if(colouredCellList != {}){
        for (const [key, value] of Object.entries(colouredCellList)) {
            let col = key.substring(0, 1)
            let element = document.querySelector(`[value="${key}"]`);
            element.style.background = value;
            projectWeekObj['colour_totals'][value][col] += 1;
        }
    }

    //Total Cell Colour
    let cellIndex = 97;
    for (const [colour, value] of Object.entries(projectWeekObj['colour_totals'])) {
        let colourName = Object.keys(colourMasterDict).find(key => colourMasterDict[key][0] === colour);
        let compareName = document.querySelector(`[value="Z${cellIndex}"]`).innerHTML;
        if(colourName == compareName){
            for (const [col, colourTotal] of Object.entries(value)) {
                let cellID = col + cellIndex.toString();
                let element = document.querySelector(`[value="${cellID}"]`);
                let hours = colourTotal * 15 / 60;
                element.innerHTML = hours.toString();
            }
            cellIndex++;
        } 
        
    }

    let totalColCell = '';
    let totalColCellInt = 97;
    let weeklyColCell = '';
    for(let i = 1; i < colLetter.length; i++){
        let totalHours = 0.00;
        let col = colLetter[i];
        totalColCellInt = 97;
        for(let colour = 0; colour < colourCount; colour++){
            let cellID = col + totalColCellInt.toString();
            totalHours += parseFloat(document.querySelector(`[value="${cellID}"]`).innerHTML);
            totalColCellInt += 1;
        }
        totalColCell = col + totalColCellInt.toString();
        let colourBorderCell = col + (totalColCellInt - 1).toString();
        document.querySelector(`[value="${totalColCell}"]`).innerHTML = totalHours.toString();
        document.querySelector(`[value="${colourBorderCell}"]`).style.borderWidth = "5px thin";
    }

    totalColCellInt += 1;  
    for(let i = 0; i < totalColCellInt + 1; i++){
        let cellIDB = 'H' + i.toString();
        document.querySelector(`[value="${cellIDB}"]`).style.borderLeft = '5px solid black';
    }

    let colIndex = 1;
    let weekIndex = 1;
    for(let k = 0; k < 2; k++){
        let weeklyTotal = 0
        for(let i = 0; i < 7; i++){
            let cellIDW = colLetter[colIndex] + (rowCount - 3).toString();
            colIndex++;
}

function dateGen(weekDict){
    let weekStartDate = weekDict['start_date'];
    let dateList = [weekStartDate];
    let day = parseInt(weekStartDate.split("/")[0]);
    let month = parseInt(weekStartDate.split("/")[1]);
    let year = parseInt(weekStartDate.split("/")[2]);
    
    for(let i = 0; i < 13; i++){
        day++;
        if(day > getMonth(month, year)){
            month++;
            day = 1;
        }
        let newDate = day.toString() + "/" + month.toString() + "/" + year.toString()
        dateList.push(newDate)
    }

    return dateList;
}

function timeGen(projectWeekObj){
    let timeArr = [...timeList]
    timeArr.unshift("Time|Date");
    colourCount = 0;
    Object.keys(colourMasterDict).forEach(name => {
        if(colourMasterDict[name][1]['yes'].includes(currentChosenProject)){
            timeArr.push(name);
            colourCount++;
            let colour = colourMasterDict[name][0];
            projectWeekObj['colour_totals'][colour] = {"A": 0};
            for(let i = 2; i < colLetter.length; i++){
                let col = colLetter[i];
                projectWeekObj['colour_totals'][colour][col] = 0;
            }           
        }    
    });

    timeArr.push("Total:");
    return timeArr;

}


function getMonth(month, year){
    if( month == 1){ //Jan
        return 31
    } else if(month == 2){ // Feb
        if(leapYear(year)){
            return 29
        } else {
            return 28
        }
    } else if(month == 3){ // Mar
        return 31
    } else if(month == 4){ // Apr
        return 30
    } else if(month == 5){ // May
        return 31
    } else if(month == 6){ // Jun
        return 30
    } else if(month == 7){ // Jul
        return 31
    } else if(month == 8){ // Aug
        return 31
    } else if(month == 9){ // Sep
        return 30
    } else if(month == 10){ // Oct
        return 31
    } else if(month == 11){ // Nov
        return 30
    } else if(month == 12){ // Dec
        return 31
    } else {
        return 30
    }

}

function leapYear(year)
{
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}