function addToDict(e){
    let checkBoxTitle = e.target.getAttribute('title').substr(9);
    let checkBoxColourName = e.target.getAttribute('value');
    let colourDict = colourMasterDict[checkBoxColourName][1];
    if(e.target.checked){
        if(colourDict['yes'].includes(checkBoxTitle)){       
        } else {
            const index = colourDict['no'].indexOf(checkBoxTitle);
            if(index > -1){colourDict['no'].splice(index, 1)};
            colourDict['yes'].push(checkBoxTitle)
        }
    } else if(e.target.checked === false){
        if(colourDict['no'].includes(checkBoxTitle)){       
        } else {
            const index = colourDict['yes'].indexOf(checkBoxTitle);
            if(index > -1){colourDict['yes'].splice(index, 1)};
            colourDict['no'].push(checkBoxTitle)
        }
    }
}


function showColourOptions(e){
    let clickedName = e.target.innerHTML;
    if(selectedColourName == ''){
        selectedColourName = clickedName
    } else if(clickedName != selectedColourName){
        document.querySelector(`[value="${selectedColourName}"]`).classList.add("hidden");
    }
    selectedColourName = clickedName;
    selectedColour = colourMasterDict[selectedColourName][0];
    document.querySelector(`[value="${clickedName}"]`).classList.toggle("hidden");
}

function deleteColour(){
    if (confirm(`You are about to DELETE ${selectedColourName}. This action is permanent and removes it from everywhere. Continue?`)) {
        delete colourMasterDict[selectedColourName];
        for (const [projName, projDict] of Object.entries(projectMasterDict)) {
            for (const [weeks, weekInfo] of Object.entries(projDict['time_sheet_weeks'])) {
                for (const [cell, cellColour] of Object.entries(weekInfo['cells'])) {
                    if(cellColour == selectedColour){
                        delete projectMasterDict[projName]['time_sheet_weeks'][weeks]['cells'][cell]
                    }
                }
                for (const [colour, dict] of Object.entries(weekInfo['colour_totals'])) {
                    if(colour == selectedColour){
                        delete projectMasterDict[projName]['time_sheet_weeks'][weeks]['colour_totals'][colour]
                    }
                }
            }
        }
        selectedColourName = '';
    }
    //document.querySelector(`[value="${selectedColourName}"]`).classList.add("hidden");
}

function changeColour(){
    let newName = document.getElementById('colour_creation_name').value;
    let newColour = document.getElementById('colour_creation_colour').value;
    let newRate = parseFloat(document.getElementById('colour_creation_rate').value);
    newColour = hexToRgb(newColour);

    let oldDict = colourMasterDict[selectedColourName]
    delete colourMasterDict[selectedColourName]
    colourMasterDict[newName] = [newColour, oldDict[1], newRate];

    for (const [projName, projDict] of Object.entries(projectMasterDict)) {
        for (const [weeks, weekInfo] of Object.entries(projDict['time_sheet_weeks'])) {
            for (const [cell, cellColour] of Object.entries(weekInfo['cells'])) {
                if(cellColour == selectedColour){
                    projectMasterDict[projName]['time_sheet_weeks'][weeks]['cells'][cell] = newColour;
                }
            }
            for (const [colour, dict] of Object.entries(weekInfo['colour_totals'])) {
                if(colour == selectedColour){
                    delete projectMasterDict[projName]['time_sheet_weeks'][weeks]['colour_totals'][colour]
                }
            }
        }
    }
    changePage('PAGE_settings');

}


function editColour(){
    document.getElementById('colour_creation_name').value = selectedColourName;
    let rgbList = selectedColour.split("(")[1].split(", ");
    let hex = rgbToHex(parseInt(rgbList[0]), parseInt(rgbList[1]), (parseInt(rgbList[2].substring(0, rgbList[2].length - 1))))
    document.getElementById('colour_creation_colour').setAttribute('value', hex);
    document.getElementById('colour_creation_rate').value = colourMasterDict[selectedColourName][2]

    document.querySelector(`[value="${selectedColourName}"]`).classList.add("hidden");

    document.getElementById('create_new_colour_button').classList.add("hidden");//.style.display = 'none';
    document.getElementById('change_colour_button').classList.remove("hidden");//.style.display = 'unset';

    changePage('PAGE_add_new_colour');
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }