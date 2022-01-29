let fs = require("fs");
read_file = function(path = "./DATA/user.json"){
    return fs.readFileSync(path, 'utf8');
}

write_file = function(data, path = "./DATA/user.json"){
    fs.writeFileSync(path, data);
}

function save_Data(){
    write_file(JSON.stringify(projects));
}
function read_Data(){
    projects = JSON.parse(read_file());
}
