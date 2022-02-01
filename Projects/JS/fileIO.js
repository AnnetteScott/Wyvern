let fs = require("fs");
read_file = function(path = "./DATA/user.json"){
    return fs.readFileSync(path, 'utf8');
}

write_file = function(data, path = "./DATA/user.json"){
    fs.writeFileSync(path, data);
}

function save_Data(){
    write_file(JSON.stringify(projectMasterDict));
}
function read_Data(){
    projectMasterDict = JSON.parse(read_file());
}
