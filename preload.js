const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    scanPorts: (host, startPort, endPort) => ipcRenderer.invoke('scan-ports', host, startPort, endPort)
});
