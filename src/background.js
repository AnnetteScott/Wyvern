import { app, protocol, BrowserWindow, Menu, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const path = require('path');
import fs from "fs";
const { dialog } = require('electron');
const isDevelopment = true;
let win;
let masterDict;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
	{ scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
	win = new BrowserWindow({
		webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            nativeWindowOpen: true
        }
  	})

	win.maximize();
  	if (process.env.WEBPACK_DEV_SERVER_URL) {
		// Load the url of the dev server if in development mode
		await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
		if (isDevelopment) win.webContents.openDevTools()
	}else{
		createProtocol('app')
		// Load the index.html when not in development
		win.loadURL('app://./index.html')
	}
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
	if (isDevelopment) {
		// Install Vue Devtools
		try {
		await installExtension(VUEJS3_DEVTOOLS)
		} catch (e) {
		console.error('Vue Devtools failed to install:', e.toString())
		}
	}
	createWindow()

    if(isDevelopment){
        // Build menu from template
        const mainMenu = Menu.buildFromTemplate(DEVmainMenuTemplate);
        // Insert menu
        Menu.setApplicationMenu(mainMenu);  
        
    }else{
        // Build menu from template
        const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
        // Insert menu
        Menu.setApplicationMenu(mainMenu);  
    }
	
})

const mainMenuTemplate =  [
    // Each object is a dropdown
    {
        label: "File",
        submenu: [
            {
                label: 'Save', 
                accelerator: process.platform === 'darwin' ? 'Ctrl+S' : 'Ctrl+S',
                click(){ saveData() }
            },  
            {
                label: 'Manual Save', 
                accelerator: process.platform === 'darwin' ? 'Ctrl+Shift+S' : 'Ctrl+Shift+S',
                click(){ manualSave() }
            },
            {
                label: 'Open', 
                accelerator: process.platform === 'darwin' ? 'Ctrl+O' : 'Ctrl+O',
                click(){ loadData() }
            },
            {
                label: 'Exit', 
                accelerator: process.platform === 'darwin' ? 'Ctrl+W' : 'Ctrl+W',
                click(){ app.quit() }
            } 
        ]
    }
];

const DEVmainMenuTemplate =  [
    // Each object is a dropdown
    {
        label: "File",
        submenu: [
            {
                label: 'Save', 
                accelerator: process.platform === 'darwin' ? 'Ctrl+S' : 'Ctrl+S',
                click(){ saveData() }
            },  
            {
                label: 'Manual Save', 
                accelerator: process.platform === 'darwin' ? 'Ctrl+Shift+S' : 'Ctrl+Shift+S',
                click(){ manualSave() }
            },
            {
                label: 'Open', 
                accelerator: process.platform === 'darwin' ? 'Ctrl+O' : 'Ctrl+O',
                click(){ loadData() }
            },
            {
                label: 'Dev Tools', 
                accelerator: process.platform === 'darwin' ? 'Ctrl+D' : 'Ctrl+D',
                click(){ win.webContents.openDevTools()}
            },
            {
                label: 'Exit', 
                accelerator: process.platform === 'darwin' ? 'Ctrl+W' : 'Ctrl+W',
                click(){ app.quit() }
            } 
        ]
    }
];

let saveFilePath = app.getPath('userData') + "\\data\\userData.json"
function saveData(){
	win.webContents.send("reedMasterDict");
    ipcMain.on('readMasterDict', function(event, data) {
        fs.writeFileSync(saveFilePath , JSON.stringify(data));
		event;
    })
}

function loadData(){
	dialog.showOpenDialog(win, {
        properties: ['openFile'],
        filters: [{ name: 'json', extensions: ['json'] }]
    }).then(result => {
        let path = result['filePaths'][0];
        masterDict = JSON.parse(read_file(path));
        win.webContents.send("loadData", JSON.stringify(masterDict));
        fs.writeFileSync(saveFilePath, JSON.stringify(masterDict));
        win.reload()
    }).catch(err => {
        console.log(err)
    });
}

function manualSave(){
    saveData();
    setTimeout(function(){
        let masterDict = JSON.parse(read_file(saveFilePath));
        dialog.showSaveDialog(win, {
            properties: ['saveFile'],
            filters: [{ name: 'json', extensions: ['json'] }]
        }).then(result => {
            let filepath = result.filePath;
            fs.writeFileSync(filepath, JSON.stringify(masterDict));
        }).catch(err => {
            console.log(err)
        });    
    }, 100)
    
}

if(!fs.existsSync(app.getPath('userData') + "\\data")){
    fs.mkdirSync(app.getPath('userData') + "\\data");
    fs.writeFileSync(saveFilePath, JSON.stringify({"projects": {}, "clients": {}, "colours": {'colourWhite':{'name': 'White', 'colour': '#ffffff'}}, "users": {}, "records": {"accounts": [], "categories": ['Contract Work']}, "saveVersion": 7}));
}else if(!fs.existsSync(app.getPath('userData') + "\\data\\userData.json")){
    fs.writeFileSync(saveFilePath, JSON.stringify({"projects": {}, "clients": {}, "colours": {'colourWhite':{'name': 'White', 'colour': '#ffffff'}}, "users": {}, "records": {"accounts": [], "categories": ['Contract Work']}, "saveVersion": 7}));
}

ipcMain.on('master_dict_read', function(event, arg) {
    let masterDict = JSON.parse(read_file(saveFilePath));
    event.sender.send('master_dict_reading', masterDict);

});

function read_file(path){
    return fs.readFileSync(path, 'utf8');
}
