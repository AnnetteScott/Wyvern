let colID;
let cellNum;
let clockInDate;

function clockIn(){
    let today = new Date();
    clockInDate = (today.getMonth() + 1) + "/" + today.getDate() + "/" + (today.getFullYear() - 2000);
    let minutes = (((today.getMinutes() + 7.5)/15 | 00) * 15) % 60;
    if (minutes == 0){
        minutes = '00'
    }
    let hours = parseInt(today.getHours());
    if (today.getMinutes() >= 53){
        hours++;
        hours = hours % 24;
    }
    let time;
    if(hours < 10){
        time = "0" + hours + ":" + minutes;
    }else{
        time = hours + ":" + minutes;
    }

    cellNum = timeList.indexOf(time) + 1;
    let weeksDict = masterDict['projects'][currentProjectID]['weeks'];

    let colIndex = 1;

    for(const [weekIDs, weekDict] of Object.entries(weeksDict)){
        if(Date.parse(clockInDate) >= Date.parse(mericaDate(weekDict['startDate'])) && Date.parse(clockInDate) < Date.parse(mericaDate(addToDate((weekDict['startDate']), 14)))){
            timesheetGen(false, chosenID = currentProjectID, chosenWeek = weekIDs);
            chosenWeekID = weekIDs;
            let nextDate = mericaDate(weekDict['startDate']);
            while(clockInDate != nextDate){
                colIndex++;
                nextDate = mericaDate($(`[cellid=${colID}0]`).text());
            }
            colID = columnLetter[colIndex];
            const cellID = colID + cellNum.toString();
    
            
            if(selectedCellsList != []){
                selectedCellsList.forEach(cellIDR => {
                    let colouredCells = weeksDict[weekIDs]['colourCells']
                    if(colouredCells.hasOwnProperty(cellIDR)){
                        cellDeSelect(cellIDR, masterDict['colours'][colouredCells[cellIDR]]['colour']);
                    } else {
                        cellDeSelect(cellIDR, "white");
                    }
                    
                });
            }
            console.log(columnLetter)
            $(`[cellid=${cellID}]`).css({"background-color": "#D1D3D9",  "border-color": "cyan"});
            weekID = $(`[cellid=${cellID}]`).attr('weekid');

            $(`[cellid=${cellID}]`)[0].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });    
            selectedCellsList = [cellID];
            break;
        }
    }
    
}

function clockOut(){
    let today = new Date();
    clockOutDate = (today.getMonth() + 1) + "/" + today.getDate() + "/" + (today.getFullYear () - 2000);
    if(clockInDate == clockOutDate){
        let minutes = (((today.getMinutes() + 7.5)/15 | 0) * 15) % 60;
        if (minutes == 0){
            minutes = '00'
        }
        let time = today.getHours() + ":" + minutes;
        let timeIndex = timeList.indexOf(time) + 1;
        let cellCount = cellNum + 1;
        if(timeIndex != cellNum){
            while(time != $(`[cellid=Z${cellCount}]`).text()){
                let cellID = colID + cellCount;
                cellCount++;
                selectedCellsList.push(cellID);
                $(`[cellid=${cellID}]`).css({"background-color": "#D1D3D9",  "border-color": "cyan"});
            }
        }
    }
}