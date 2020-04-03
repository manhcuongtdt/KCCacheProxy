const { app, BrowserWindow, Tray, Menu, ipcMain } = require("electron")
const path = require("path")

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) { // eslint-disable-line global-require
    app.quit()
}

let tray = null
const createWindow = () => {
    // Create the browser window.

    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "index.html"))

    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    tray = new Tray(path.join(__dirname, "icon.png"))
    tray.setToolTip("KCCacheProxy")
    tray.setContextMenu(Menu.buildFromTemplate([
        {
            label: "Show",
            click: () => mainWindow.show()
        }, {
            label: "Quit",
            click: () => {
                app.isQuiting = true
                app.quit()
            }
        }
    ]))
    tray.on("double-click", () => mainWindow.show())

    mainWindow.on("minimize", (e) => {
        e.preventDefault()
        mainWindow.hide()
    })

    global.mainWindow = mainWindow
    mainWindow.on("closed", () => global.mainWindow = null)
    mainWindow.on("close", (event) => {
        if(!app.isQuiting){
            event.preventDefault()
            mainWindow.hide()
        }

        return false
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow)

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit()
    }
})

app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

require("../proxy/ipc").registerElectron(ipcMain)
require("../proxy/config").loadConfig(app)
require("../proxy/proxy")
