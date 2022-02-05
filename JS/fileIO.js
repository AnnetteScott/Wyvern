let fs = require("fs");
read_file = function(path = "./DATA/user.json"){
    return fs.readFileSync(path, 'utf8');
}

write_file = function(data, path = "./DATA/user.json"){
    fs.writeFileSync(path, data);
}

function save_Data(){
    let masterJSON = {projectMasterDict: projectMasterDict, colourMasterDict: colourMasterDict, userMasterDict: userMasterDict}
    write_file(JSON.stringify(masterJSON));
}
function read_Data(){
    let masterJSONRead = JSON.parse(read_file());
    projectMasterDict = masterJSONRead['projectMasterDict'];
    colourMasterDict = masterJSONRead['colourMasterDict'];
    userMasterDict = masterJSONRead['userMasterDict'];
}
