// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')

const createWindow = () => {
  	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		icon: __dirname + '/WyvernIcon.ico',
	})

	var settingsWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		show: false
	})
	settingsWindow.loadURL('file://' + __dirname + '/Pages/settings.html')

	var budgetWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		show: false
	})
	budgetWindow.loadURL('file://' + __dirname + '/Pages/Budget.html')
	
	var invoiceWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		show: false
	})
	invoiceWindow.loadURL('file://' + __dirname + '/Pages/Invoice.html')
	
	var timeSheetWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		show: false
	})
	timeSheetWindow.loadURL('file://' + __dirname + '/Pages/Timesheet.html')

  // and load the index.html of the app.
  mainWindow.loadFile('main.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  var menu = Menu.buildFromTemplate([
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
                    label: 'New Timesheet', 
                    accelerator: process.platform === 'darwin' ? 'Ctrl+T' : 'Ctrl+T',
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
    ])

    Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

const electron = require('electron')

// Enable live reload for all the files inside your project directory
require('electron-reload')(__dirname);
