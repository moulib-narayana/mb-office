const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false, // Recommended for security
            contextIsolation: true,
            enableRemoteModule: false,
        },
    })

    if (process.env.NODE_ENV === "development") {
        win.loadURL("http://localhost:3000"); // Load Nuxt dev server
    } else {
        win.loadFile(path.join(__dirname, "dist", "index.html")); // Load built Nuxt app
    }

    // win.loadFile('index.html')
}

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')

    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
