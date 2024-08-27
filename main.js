const { app, BrowserWindow, ipcMain } = require('electron');
const isPortReachable = require('is-port-reachable');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile('index.html');
    mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.handle('scan-ports', async (event, host, startPort, endPort) => {
    const openPorts = [];
    for (let port = startPort; port <= endPort; port++) {
        const reachable = await isPortReachable(port, { host });
        if (reachable) {
            openPorts.push(port);
        }
    }
    return openPorts;
});
