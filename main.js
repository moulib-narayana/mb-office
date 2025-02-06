const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false, // Recommended for security
            contextIsolation: true,
        },
    });

    if (process.env.NODE_ENV === "development") {
        mainWindow.loadURL("http://localhost:3000"); // Load Vite dev server
    } else {
        mainWindow.loadFile(path.join(__dirname, "dist", "index.html")); // Load built React app
    }

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
});
