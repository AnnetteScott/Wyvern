const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
ipcRenderer.on('save_Data', function (event) {
    save_Data();
});
ipcRenderer.on('read_Data', function (event) {
    read_Data();
});

read_Data();

/* 
let intervalId = window.setInterval(function(){
    save_Data();
}, 300000);
 */