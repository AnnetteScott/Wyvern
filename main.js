const electron = require('electron');
const path = require('path');
const url = require('url');
let fs = require("fs");
const {app, BrowserWindow, Menu, ipcMain} = electron;
const {download} = require("electron-dl");
const { dialog } = require('electron');
let mainWindow;
let devMode = false;
let saveFilePath = app.getPath('userData') + "\\data\\user.json"
if (!fs.existsSync(app.getPath('userData') + "\\data")){
    fs.mkdirSync(app.getPath('userData') + "\\data");
    fs.writeFileSync(saveFilePath, JSON.stringify({"projects": {}, "clients": {}, "colours": {}, "users": {}, "budgets": {}}));

}


// Listen for app to be ready
app.on('ready', function(){
    // Create new window
    mainWindow = new BrowserWindow({
		icon: __dirname + '/Images/WyvernIcon.ico',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    // Load html in window
    mainWindow.loadFile('main.html');
    mainWindow.maximize();
    // Quit app when closed
    mainWindow.on('close', function(e) { //   <---- Catch close event
		e.preventDefault();
        save_Data();
		setTimeout(function(){
			e.defaultPrevented = false;
			app.exit();
		}, 1500)
    });
    mainWindow.webContents.send("download_folder", app.getPath('downloads'));
    ipcMain.on("downloadUpdate", (event, info) => {
        info.properties.onProgress = status => mainWindow.webContents.send("download progress", status);
        download(BrowserWindow.getFocusedWindow(), info.url, info.properties)
            .then(dl => mainWindow.webContents.send("download complete", dl.getSavePath()));
    });

    if(devMode){
        // Open the DevTools.
        mainWindow.webContents.openDevTools();
    }
   
  
    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);
});

// Create menu template
const mainMenuTemplate =  [
    // Each object is a dropdown
    {
        label: "File",
        submenu: [
            {
                label: 'Save', 
                accelerator: process.platform === 'darwin' ? 'Ctrl+S' : 'Ctrl+S',
                click(){ save_Data() }
            },  
            {
                label: 'Manual Save', 
                accelerator: process.platform === 'darwin' ? 'Ctrl+Shift+S' : 'Ctrl+Shift+S',
                click(){ manual_save() }
            },
            {
                label: 'Open', 
                accelerator: process.platform === 'darwin' ? 'Ctrl+O' : 'Ctrl+O',
                click(){ open_file() }
            },
            {
                label: 'Exit', 
                accelerator: process.platform === 'darwin' ? 'Ctrl+W' : 'Ctrl+W',
                click(){ app.quit() }
            } 
        ]
      
    }
];

if(devMode){
    // Enable live reload for all the files inside your project directory
    require('electron-reload')(__dirname);
}



//Read a file from a given location.
function read_file(path){
    return fs.readFileSync(path, 'utf8');
}


function save_Data(){
    mainWindow.webContents.send("read_from_var");
    ipcMain.on('readed_var', function(event, data) {
        fs.writeFileSync(saveFilePath , JSON.stringify(data));
    })
}

function manual_save(){
    let masterDict = JSON.parse(read_file(saveFilePath));
    dialog.showSaveDialog(mainWindow, {
        properties: ['saveFile'],
        filters: [{ name: 'json', extensions: ['json'] }]
    }).then(result => {
        let filepath = result.filePath;
        fs.writeFileSync(filepath, JSON.stringify(masterDict));
    }).catch(err => {
        console.log(err)
    });

		
}


function open_file(){
    dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [{ name: 'json', extensions: ['json'] }]
    }).then(result => {
        let path = result['filePaths'][0];
        let masterDict = JSON.parse(read_file(path));
        fs.writeFileSync(saveFilePath, JSON.stringify(masterDict));
        require('electron-reload')(__dirname);
    }).catch(err => {
        console.log(err)
    });

}


ipcMain.on('master_dict_read', function(event, arg) {
    let masterDict = JSON.parse(read_file(saveFilePath));
    event.sender.send('master_dict_reading', masterDict);

});


//auto save
let minutes = 5;
let time = minutes * 60 * 1000;
setInterval(function() {
    save_Data();
}, time); 
