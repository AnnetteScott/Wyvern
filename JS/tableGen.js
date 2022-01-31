function tableGen(){
    let tableContainer = document.getElementById("project_table");
    let colLetter = ['Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
    let rowCount = 97;
    let tableHTML = '';
    let timeList = timeGen();
    for(col in colLetter){
        tableHTML += '<div>';
        for(let row = 0; row <= rowCount; row++){
            let cellID = colLetter[col] + row.toString();
            if(colLetter[col] != 'Z'){
                tableHTML += `<div value="${cellID}" onclick="cellClicked(event)"></div>`;
            }else{
                tableHTML += `<div value="${cellID}">${timeList[row]}</div>`;
            }
        }
        tableHTML += '</div>';
    }

    tableContainer.innerHTML = tableHTML;

}

function cellClicked(e){
    console.log(e.target.getAttribute('value'));
}

tableGen();

function timeGen(){
    let timeArr = ["Time|Date"];

    for (let hours = 0; hours < 24; hours++){
        for(let mins = 0; mins <= 45; mins += 15){
            let hourString = hours.toString();
            let minString = mins.toString();
            if(hours < 10){
                hourString = "0" + hours.toString();
            }
            if(mins == 0){
                minString = "00";
            }
            let newTime = hourString + ":" + minString;
            timeArr.push(newTime);
            
        }
    }
    timeArr.push("Total:");
    return timeArr;

}