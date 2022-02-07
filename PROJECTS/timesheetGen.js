function timesheetGen(e){
    //Variables
    const projectID = $(e.target).attr('projectid');
    const weekID = $(e.target).attr('weekTitle')
    const projWeek = masterDict['projects'][projectID]['weeks'][weekID]
    let columnCount = columnLetter.length;
    let rowCount = 0;
	updateCellsTotals(projWeek, projectID);

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
                elem += `<div class="timesheet_colour_total" cellid="${cellID}" colourid="${colourList[colourIndex]}">${projWeek['totalColumnColour'][(columnLetter[col])][(colourList[colourIndex])]}</div>`;
                colourIndex++;
            }
            else if(row == rowCount - 4){//Total Each Day
                elem += `<div class="timesheet_day_total"cellid="${cellID}">${projWeek['totalColumn'][(columnLetter[col])]}</div>`;
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
	
    updateCellsTotals(projWeek, projectID);

	let weekTotalOne = 0;
	let weekTotalTwo = 0;
	//Update total Hour Totals
	$('.timesheet_day_total').each(function(index, obj) {
		if($(obj).attr("cellid").charAt(0) < "H"){
			weekTotalOne += projWeek['totalColumn'][$(obj).attr("cellid").charAt(0)];
		}else{
			weekTotalTwo += projWeek['totalColumn'][$(obj).attr("cellid").charAt(0)]
		}
	});

	//Update Weekly
	$('.timesheet_week_total').each(function(index, obj) {
		if(index == 0){
			$(obj).text(weekTotalOne);
		}
		else{
			$(obj).text(weekTotalTwo);
		}
	});
	//Update Time sheet hours
	$('.timesheet_total').each(function(index, obj) {
		if(index == 0){
			$(obj).text(weekTotalOne + weekTotalTwo);
		}
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
        if(colourID == "colourWhite"){
            delete weekObj['colourCells'][cellID];
            $(`[cellid=${cellID}]`).css({"background-color": "#ffffff", "border-color": "black"});
        }else{
            weekObj['colourCells'][cellID] = colourID;
            $(`[cellid=${cellID}]`).css({"background-color": masterDict['colours'][colourID]['colour'], "border-color": "black"});
        }
    });
    updateCellsTotals(weekObj, projectID)

	//Update Colour Totals
	$('.timesheet_colour_total').each(function(index, obj) {
		$(obj).text(weekObj['totalColumnColour'][$(obj).attr("cellid").charAt(0)][$(obj).attr("colourid")]);
	});
	
	let weekTotalOne = 0;
	let weekTotalTwo = 0;
	//Update total Hour Totals
	$('.timesheet_day_total').each(function(index, obj) {
		$(obj).text(weekObj['totalColumn'][$(obj).attr("cellid").charAt(0)]);
		if($(obj).attr("cellid").charAt(0) < "H"){
			weekTotalOne += weekObj['totalColumn'][$(obj).attr("cellid").charAt(0)];
		}else{
			weekTotalTwo += weekObj['totalColumn'][$(obj).attr("cellid").charAt(0)]
		}
	});

	//Update Weekly
	$('.timesheet_week_total').each(function(index, obj) {
		if(index == 0){
			$(obj).text(weekTotalOne);
		}
		else{
			$(obj).text(weekTotalTwo);
		}
	});


	//Update Time sheet hours
	$('.timesheet_total').each(function(index, obj) {
		if(index == 0){
			$(obj).text(weekTotalOne + weekTotalTwo);
		}
	});
}


function updateCellsTotals(weekObj, projectID){
    weekObj['totalColumnColour'] = {};
    let colourList = masterDict['projects'][projectID]['colourList']
    for(let i = 1; i < columnLetter.length; i++){
        weekObj['totalColumnColour'][columnLetter[i]] = {}
        colourList.forEach(colourID => {
            weekObj['totalColumnColour'][columnLetter[i]][colourID] = 0;
			weekObj['totalColour$'][colourID] = 0;
        });
    }
    weekObj['totalColumn'] = {"A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "I": 0, "J": 0, "K": 0, "L": 0, "M": 0, "N": 0}

   for(const [cellID, colourID] of Object.entries(weekObj['colourCells'])) {
        weekObj['totalColumnColour'][cellID.charAt(0)][colourID] += 0.25;
        weekObj['totalColumn'][cellID.charAt(0)] += 0.25;
        $(`[cellid=${cellID}]`).css({"background-color": masterDict['colours'][colourID]['colour'], "border-color": "black"});
		weekObj['totalColour$'][colourID] += (masterDict['colours'][colourID]['colourRate'] * 0.25)
    }
}
