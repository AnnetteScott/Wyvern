const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
ipcRenderer.on('save_Data', function (event) {
    save_Data();
});
ipcRenderer.on('read_Data', function (event) {
    read_Data();
});
ipcRenderer.on('PRINTtheTHING', function (event) {
    PRINTtheTHING();
});

read_Data();

