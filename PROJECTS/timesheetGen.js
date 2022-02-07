function timesheetGen(e){
    //Variables
    const projectID = $(e.target).attr('projectid')
    let projWeek = masterDict['projects'][projectID]['weeks'][$(e.target).attr('weekTitle')]
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
    let timeArr = [...timeList]
    timeArr.unshift("Time|Date");
    if(masterDict['projects'][projectID]['colourList'] != []){
        masterDict['projects'][projectID]['colourList'].forEach(colourID => {
            timeArr.push(masterDict['colours'][colourID]['colourName'])
        });
    }
    timeArr.push("Total Hours:");
    timeArr.push("Weekly Hours:");
    timeArr.push("Timesheet Hours:");
    timeArr.push("Timesheet Total $:");
    rowCount = timeArr.length;

	//Add Cells
	$('.time_sheet_column').empty();	
    $('.time_sheet_column').each(function(col, obj) {
		elem = "";
		for(let row = 0; row < rowCount; row++){
			let cellID = columnLetter[col] + row.toString();
			elem += `<div cellid="${cellID}"></div>`;

		}
		$(obj).append(elem)
	});





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

    timeArr.push("Total Hours:");
    timeArr.push("Weekly Hours:");
    timeArr.push("Timesheet Hours:");
    timeArr.push("Timesheet Total $:");

    return timeArr;

}