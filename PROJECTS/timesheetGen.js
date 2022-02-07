function timesheetGen(e){
    //Variables
    const projectID = $(e.target).attr('projectid');
    const weekID = $(e.target).attr('weekTitle')
    let projWeek = masterDict['projects'][projectID]['weeks'][weekID]
    let columnCount = columnLetter.length;
    let rowCount = 0;

    //Generate Columns
    let colElem = '';
    for(let i = 0; i < columnCount; i++){
        let colID = columnLetter[i]
        colElem += DOM_Blocks_projects.timesheet_col(colID)
    }
    $('#timesheet_container').empty();
    $('#timesheet_container').append(colElem);

    //Generate First Column Text
    let timeArr = [...timeList];
    let colourList = [];
    timeArr.unshift("Time|Date");
    if(masterDict['projects'][projectID]['colourList'] != []){
        masterDict['projects'][projectID]['colourList'].forEach(colourID => {
            timeArr.push(masterDict['colours'][colourID]['colourName']);
            colourList.push(colourID);
        });
    }
    timeArr.push("Total Hours:");
    timeArr.push("Weekly Hours:");
    timeArr.push("Timesheet Hours:");
    timeArr.push("Timesheet Total $:");
    rowCount = timeArr.length;

    //Generate Dates
    let dateArr = [projWeek['startDate']]
    for(let i = 1; i < 15; i++){
        dateArr.push(addToDate(projWeek['startDate'], i));
    }

    let dateIndex = 0;
	//Add Cells
	$('.time_sheet_column').empty();	
    $('.time_sheet_column').each(function(col, obj) {
		elem = "";
        let colourIndex = 0;
		for(let row = 0; row < rowCount; row++){
            const cellID = columnLetter[col] + row.toString();
            if(columnLetter[col] == "Z"){//First Col
                elem += `<div class="timesheet_time"cellid="${cellID}">${timeArr[row]}</div>`;
            }
            else if(row == 0){//First Row
                elem += `<div class="timesheet_date" cellid="${cellID}">${dateArr[dateIndex]}</div>`;
                dateIndex++;
            }
            else if(row <= timeList.length){//timeSheet Cells
                elem += `<div class="timesheet_cells" cellid="${cellID}" projectid="${projectID}" weekid="${weekID}" onmousedown="cellClicked(event)" onmouseover="cellHovered(event)" onmouseup="cellRelease(event)"></div>`;
            }
            else if(row >= timeList.length && row < rowCount - 4){//Colours
                elem += `<div class="timesheet_colour_total" cellid="${cellID}" colourid="${colourList[colourIndex]}"></div>`;
                colourIndex++;
            }
            else if(row == rowCount - 4){//Total Each Day
                elem += `<div class="timesheet_day_total"cellid="${cellID}"></div>`;
            }
            else if(row == rowCount - 3 && (columnLetter[col] == 'A' || columnLetter[col] == 'H')){//Total Each Week
                elem += `<div class="timesheet_week_total" cellid="${cellID}"></div>`;
            }
            else if(row == rowCount - 2 && columnLetter[col] == 'A'){//Total TimeSheet hours
                elem += `<div class="timesheet_total" cellid="${cellID}"></div>`;
            }
            else if(row == rowCount - 1 && columnLetter[col] == 'A'){//Total TimeSheet $
                elem += `<div class="timesheet_total" cellid="${cellID}"></div>`;
            }

		}
		$(obj).append(elem)
	});





}

let weekID = '';

function cellClicked(e){
    cellIsClicked = true;
    const cellID = $(e.target).attr('cellid');
    const projectID = $(e.target).attr('projectid');
    weekID = $(e.target).attr('weekid');
    cellSelect(e.target);
    if(selectedCellsList != []){
        selectedCellsList.forEach(cellIDR => {
            let colouredCells = masterDict['projects'][projectID]['weeks'][weekID]['colourCells']
            if(colouredCells.hasOwnProperty(cellIDR)){
                cellDeSelect(cellIDR, masterDict['colours'][colouredCells[cellIDR]]['colour']);
            } else {
                cellDeSelect(cellIDR, "white");
            }
            
        });
    }
    selectedCellsList = [cellID];
}

function cellHovered(e){
    if(cellIsClicked){
        const cellID = $(e.target).attr('cellid');
        if(!selectedCellsList.includes(cellID)){
            cellSelect(e.target);
            selectedCellsList.push(cellID);
        }   
    }
}

function cellRelease(e){ 
    cellIsClicked = false;
}

function cellSelect(element){
    element.style.borderColor = "cyan";
    element.style.background = "#D1D3D9";
}

function cellDeSelect(ID, colour){
    $(`[cellid=${ID}]`).css({"background-color": colour,  "border-color": "black"});
}

function colourCell(e){
    const colourID = $(e.target).attr('colourid');
    const projectID = $(e.target).attr('projectid');
    let weekObj = masterDict['projects'][projectID]['weeks'][weekID];
    selectedCellsList.forEach(cellID => {
        weekObj['colourCells'][cellID] = colourID;
        $(`[cellid=${cellID}]`).css({"background-color": masterDict['colours'][colourID]['colour'], "border-color": "black"});
    });
}