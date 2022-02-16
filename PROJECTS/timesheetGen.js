function timesheetGen(e, chosenID = '', chosenWeek = ''){
    //Variables
    let projectID;
    let weekID;
    if(chosenID == ''){
        projectID = $(e.target).attr('projectid');
        weekID = $(e.target).attr('weekTitle');
    }else{
        projectID = chosenID;
        weekID = chosenWeek;
    }
    
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
    timeArr.push("Total $:");
    timeArr.push("Weekly Hours:");
    timeArr.push("Weekly $:");
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
            else if(row >= timeList.length && row < rowCount - 6){//Colours
                elem += `<div class="timesheet_colour_total" cellid="${cellID}" colourid="${colourList[colourIndex]}">${projWeek['totalColumnColour'][(columnLetter[col])][(colourList[colourIndex])]}</div>`;
                colourIndex++;
            }
            else if(row == rowCount - 6){//Total Each Day Hours
                elem += `<div class="timesheet_day_total"cellid="${cellID}">${projWeek['totalColumn'][(columnLetter[col])]}</div>`;
            }
            else if(row == rowCount - 5){//Total Each Day Money
                elem += `<div class="timesheet_money_total" cellid="${cellID}"></div>`;
            }
            else if(row == rowCount - 4 && (columnLetter[col] == 'A' || columnLetter[col] == 'H')){//Total Each Week
                elem += `<div class="timesheet_week_total" cellid="${cellID}"></div>`;
            }
            else if(row == rowCount - 3 && (columnLetter[col] == 'A' || columnLetter[col] == 'H')){//Total Each Week
                elem += `<div class="timesheet_week_money" cellid="${cellID}"></div>`;
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

    const onMouseMove = (e) =>{
        $('#user_selection_tip').css({
            left: e.pageX + 55 + 'px',
            top: e.pageY - 20 + 'px'
        })
    }
    document.addEventListener('mousemove', onMouseMove);


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

    let firstTimeID = "Z" + cellID.substring(1);
    let firstTime = ($(`[cellid=${firstTimeID}]`).text()).split(":");
    let timePeriod = `${firstTime[0]}:${firstTime[1]} - ${firstTime[0]}:${parseInt(firstTime[1]) + 14}`
    $('#user_selection_tip').text(`Time Selected: 00.25H\n${timePeriod} `);
    $('#user_selection_tip').removeClass('hidden');

}


function minCell(arr){
	let smallestNum = arr[0].substring(1);
	for(let i = 0; i < arr.length; i++){
		if(parseInt(arr[i].substring(1)) < smallestNum){
			smallestNum = parseInt(arr[i].substring(1))
		}
	}
	return smallestNum;
}

function maxCell(arr){
	let smallestNum = arr[0].substring(1);
	for(let i = 0; i < arr.length; i++){
		if(parseInt(arr[i].substring(1)) > smallestNum){
			smallestNum = parseInt(arr[i].substring(1))
		}
	}
	return smallestNum;
}



function cellHovered(e){
    if(cellIsClicked){
        const cellID = $(e.target).attr('cellid');
        if(!selectedCellsList.includes(cellID)){
            cellSelect(e.target);
            selectedCellsList.push(cellID);
            
            let timeSelected = selectedCellsList.length * 0.25;
            let minTimeCell = "Z" + minCell(selectedCellsList);
            let maxTimeCell = "Z" + maxCell(selectedCellsList);
			let maxTime = ($(`[cellid=${maxTimeCell}]`).text()).split(":");

			let timePeriod = `${$(`[cellid=${minTimeCell}]`).text()} - ${maxTime[0]}:${parseInt(maxTime[1]) + 14}`;
            $('#user_selection_tip').text(`Time Selected: ${timeSelected}H\n${timePeriod} `);
        }   
    }
}

function cellRelease(e){ 
    cellIsClicked = false;
    $('#user_selection_tip').addClass('hidden');

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

    selectedCellsList = [];  
    updateCellsTotals(weekObj, projectID)
}


function updateCellsTotals(weekObj, projectID){
    weekObj['totalColumnColour'] = {};
    weekObj['totalColour$'] = {};
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
       if(colourList.includes(colourID)){
            weekObj['totalColumnColour'][cellID.charAt(0)][colourID] += 0.25;
            weekObj['totalColumn'][cellID.charAt(0)] += 0.25;
            weekObj['totalColour$'][colourID] += (masterDict['colours'][colourID]['colourRate'] * 0.25)
       }
       $(`[cellid=${cellID}]`).css({"background-color": masterDict['colours'][colourID]['colour'], "border-color": "black"});
    }

    //Update Colour Totals
	$('.timesheet_colour_total').each(function(index, obj) {
		$(obj).text(weekObj['totalColumnColour'][$(obj).attr("cellid").charAt(0)][$(obj).attr("colourid")] + " hrs");
	});
	
    //Total Dayily Money
    $('.timesheet_money_total').each(function(index, obj) {   
        let total = 0;
        for(const [colourID, hours] of Object.entries(weekObj['totalColumnColour'][$(obj).attr("cellid").charAt(0)])){
            total += (masterDict['colours'][colourID]['colourRate'] * hours)
        }
		$(obj).text("$" + total);
	});

	let weekTotalOneHrs = 0;
	let weekTotalTwoHrs= 0;
	//Update total Hour Totals
	$('.timesheet_day_total').each(function(index, obj) {
		$(obj).text(weekObj['totalColumn'][$(obj).attr("cellid").charAt(0)] + " hrs");
		if($(obj).attr("cellid").charAt(0) < "H"){
			weekTotalOneHrs += weekObj['totalColumn'][$(obj).attr("cellid").charAt(0)];
		}else{
			weekTotalTwoHrs += weekObj['totalColumn'][$(obj).attr("cellid").charAt(0)]
		}
	});

	//Update Weekly
	$('.timesheet_week_total').each(function(index, obj) {
		if(index == 0){
			$(obj).text(weekTotalOneHrs + " hrs");
		}
		else{
			$(obj).text(weekTotalTwoHrs + " hrs");
		}
	});

    //Update Weekly $
    let weekTotalOneMon = 0;
	let weekTotalTwoMon= 0;
    for (const [columnID, ColourDict] of Object.entries(weekObj['totalColumnColour'])){
		for (const [colourID, colourHours] of Object.entries(ColourDict)){
			if(columnID < "H"){
				weekTotalOneMon += (colourHours * masterDict['colours'][colourID]['colourRate'])
			}else{
				weekTotalTwoMon += (colourHours * masterDict['colours'][colourID]['colourRate'])
			}
        
		}
    }
	$('.timesheet_week_money').each(function(index, obj) {
		if(index == 0){
			$(obj).text("$" + weekTotalOneMon);
		}
		else{
			$(obj).text("$" + weekTotalTwoMon);
		}
	});



    let totalMoney = 0;
    for (const [colourID, money] of Object.entries(weekObj['totalColour$'])){
        totalMoney += money;
    }
	//Update Time sheet hours
	$('.timesheet_total').each(function(index, obj) {
		if(index == 0){
			$(obj).text(weekTotalOneHrs + weekTotalTwoHrs + " hrs");
		}else{
            $(obj).text("$" + totalMoney);
        }
	});
}


