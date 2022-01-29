const electron = require('electron');
const path = require('path');
const url = require('url');
const {app, BrowserWindow, Menu, ipcMain} = electron;
let mainWindow;

// Listen for app to be ready
app.on('ready', function(){
    // Create new window
    mainWindow = new BrowserWindow({
        width: 1200,
		height: 800,
		icon: __dirname + '/WyvernIcon.ico',
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
                label: 'Open', 
                accelerator: process.platform === 'darwin' ? 'Ctrl+O' : 'Ctrl+O',
                //click(){ app.quit() }
            }, 
            {
                label: 'Save', 
                accelerator: process.platform === 'darwin' ? 'Ctrl+S' : 'Ctrl+S',
                //click(){ app.quit() }
            },  
            {
                label: 'Print', 
                accelerator: process.platform === 'darwin' ? 'Ctrl+P' : 'Ctrl+P',
                //click(){ app.quit() }
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

  