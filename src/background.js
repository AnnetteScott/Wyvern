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


const gotTheLock = app.requestSingleInstanceLock()
    
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (win) {
      if (win.isMinimized()) win.restore()
      win.focus()
    }
  })
    
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
}

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

const dataPath = app.getPath('userData') + "\\data";


function saveData(){
	win.webContents.send("reedMasterDict");
    ipcMain.on('readMasterDict', function(event, data) {
        fs.writeFileSync(dataPath + "\\userData.json" , JSON.stringify(data));
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
        fs.writeFileSync(dataPath + "\\userData.json", JSON.stringify(masterDict));
        win.reload()
    }).catch(err => {
        console.log(err)
    });
}

function manualSave(){
    saveData();
    setTimeout(function(){
        let masterDict = JSON.parse(read_file(dataPath + "\\userData.json"));
        dialog.showSaveDialog(win, {
            properties: ['saveFile'],
            filters: [{ name: '.json', extensions: ['json'] }]
        }).then(result => {
            let filepath = result.filePath;
            fs.writeFileSync(filepath, JSON.stringify(masterDict));
        }).catch(err => {
            console.log(err)
        });    
    }, 100)
    
}

let masterRawFormat = {"projects": {}, "clients": {}, "colours": {'colourWhite':{'name': 'Clear', 'colour': '#ffffff'}}, "users": {}, "records": {"accounts": [], "categories": {}, 'savedTransactions': {}}, "saveVersion": 13, "showGST": true, "version": "4.1.6"}

if(!fs.existsSync(dataPath)){
    fs.mkdirSync(dataPath);
    fs.writeFileSync(dataPath + "\\userData.json", JSON.stringify(masterRawFormat));
}else if(!fs.existsSync(dataPath + "\\userData.json")){
    fs.writeFileSync(dataPath + "\\userData.json", JSON.stringify(masterRawFormat));
}

if(!fs.existsSync(dataPath + "\\receipts")){
    fs.mkdirSync(dataPath + "\\receipts");
}

ipcMain.on('master_dict_read', function(event, arg) {
    let masterDict = JSON.parse(read_file(dataPath + "\\userData.json"));
    event.sender.send('master_dict_reading', masterDict);

});

ipcMain.on('upload_file', function(event, receiptID) {
    dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: '.pdf', extensions: ['pdf'] }]
    }, function (files) {
        console.log(files)
        if (files !== undefined) {
            let path = files['filePaths'][0];
            console.log(path)
            fs.copyFile(path, `${dataPath}\\receipts\\${receiptID}.pdf`, (err) => {
                if (err){
                    throw err;
                }else{
                    console.log('path: ' + path)
                    win.webContents.send("uploaded_file_done");
                }
            });
        }
    });
});

ipcMain.on('upload_file_input', function(event, receiptID) {

    dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: '.pdf', extensions: ['pdf'] }]
    }, function (files) {
        console.log(files)
        if (files !== undefined) {
            let path = result['filePaths'][0];
            console.log(path)
            fs.copyFile(path, `${dataPath}\\receipts\\${receiptID}.pdf`, (err) => {
                if (err){
                    throw err;
                }else{
                    console.log('path: ' + path)
                    win.webContents.send("uploaded_file_input");
                }
            });
        }
    });
});

ipcMain.on('download_file', function(event, receiptID) {
    dialog.showSaveDialog(win, {
        properties: ['saveFile'],
        filters: [{ name: '.pdf', extensions: ['pdf'] }]
    }).then(result => {
        let filepath = result.filePath;
        fs.copyFile(`${dataPath}\\receipts\\${receiptID}.pdf`, filepath, (err) => {
            if (err) throw err;
        });
    }).catch(err => {
        console.log(err)
    });    
});

function read_file(path){
    return fs.readFileSync(path, 'utf8');
}

ipcMain.on('trigger_save_pop_up', function(event, receiptID) {
    win.webContents.send("trigger_the_save_pop_up");
});