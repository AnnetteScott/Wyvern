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

function printInvoice(elem){
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write('<html><head><title>' + document.title  + '</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>' + document.title  + '</h1>');
    mywindow.document.write(document.getElementById(elem).innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
}