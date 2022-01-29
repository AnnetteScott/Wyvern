const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
ipcRenderer.on('save_Data', function (event) {
    save_Data();
});
ipcRenderer.on('read_Data', function (event) {
    read_Data();
});

let projects = {};
read_Data();


//This must be last
TaskManager.start();