
function checkColourStatus(){
    if(colourMasterDict != {}){
        Object.keys(colourMasterDict).forEach(function(colour){
            Object.keys(projectMasterDict).forEach(function(proj){
                let checkStatus = document.getElementById(`settings_colour_${proj}_${colour}`).checked;
                console.log(checkStatus);
            });
        });
    }
}