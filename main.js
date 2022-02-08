const electron = require('electron');
const path = require('path');
const url = require('url');
let fs = require("fs");
const {app, BrowserWindow, Menu, ipcMain, remote} = electron;
const { dialog } = require('electron');
let mainWindow;

// Listen for app to be ready
app.on('ready', function(){
    // Create new window
    mainWindow = new BrowserWindow({
        width: 1200,
		height: 800,
		icon: __dirname + '/Images/WyvernIcon.ico',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    // Load html in window
    mainWindow.loadFile('main.html');
    // Quit app when closed
    mainWindow.on('closed', function(){
      app.quit();
    });
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  
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
                click(){ mainWindow.webContents.send('save_Data') }
            },  
            {
                label: 'Manual Save', 
                accelerator: process.platform === 'darwin' ? 'Ctrl+Shift+S' : 'Ctrl+Shift+S',
                click(){ manual_save() }
            },
            {
                label: 'Print', 
                accelerator: process.platform === 'darwin' ? 'Ctrl+P' : 'Ctrl+P',
                click(){ mainWindow.webContents.print(); }
            },
            {
                label: 'Exit', 
                accelerator: process.platform === 'darwin' ? 'Ctrl+W' : 'Ctrl+W',
                click(){ app.quit() }
            } 
        ]
      
    }
];

// Enable live reload for all the files inside your project directory
require('electron-reload')(__dirname);


function manual_save(){
    let masterDict = JSON.parse(read_file());
    dialog.showSaveDialog(mainWindow, {
        properties: ['saveFile'],
        filters: [{ name: 'json', extensions: ['json'] }]
    }).then(result => {
        let filepath = result.filePath;
        console.log(filepath);
        fs.writeFileSync(filepath, JSON.stringify(masterDict));
    }).catch(err => {
        console.log(err)
    });

		
}

read_file = function(path = "./DATA/user.json"){
    return fs.readFileSync(path, 'utf8');
}

