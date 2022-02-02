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