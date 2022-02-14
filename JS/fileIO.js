const { webContents } = require("electron");
let fs = require("fs");


//Read a file from a given location.
function read_file(path = "./DATA/user.json"){
    return fs.readFileSync(path, 'utf8');
}

//Writes a file to a given location.
//If the file is inside a folder, that folder must already exist.
//If the file doesn't exist, creates a new one with the given name. If it does, replaces the file's contents.
function write_file(data, path = "./DATA/user.json"){
    fs.writeFileSync(path, data);
}

function save_Data(){
    write_file(JSON.stringify(masterDict));
}
function read_Data(){
    masterDict = JSON.parse(read_file());
}

function PRINTtheTHING(){
    webContents.print();
}