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

function backUp(){
    write_file(JSON.stringify(masterDict), "./DATA/Backups/user.json");
}

let minutes = 5;
let the_interval = minutes * 60 * 1000;
let backUpNum = 0;
setInterval(function() {
    let path = `./DATA/Backups/backup${backUpNum}.json`;
    write_file(JSON.stringify(masterDict), path);
    backUpNum++;
    backUpNum = backUpNum % 3;
}, the_interval);