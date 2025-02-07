// const { contextBridge, ipcRenderer } = require('electron')
// contextBridge.exposeInMainWorld('versions', {
//     node: () => process.versions.node,
//     chrome: () => process.versions.chrome,
//     electron: () => process.versions.electron,
//     ping: () => ipcRenderer.invoke('ping'),
//     // we can also expose variables, not just functions
// })

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    versions: {
        node: () => process.versions.node,
        chrome: () => process.versions.chrome,
        electron: () => process.versions.electron
    },
    ping: () => ipcRenderer.invoke('ping'),

    // Securely expose IPC communication methods
    send: (channel, data) => {
        // Only allow specific channels
        const validChannels = ['toMain'];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    receive: (channel, callback) => {
        const validChannels = ['fromMain'];
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => callback(...args));
        }
    },
    removeListener: (channel) => {
        ipcRenderer.removeAllListeners(channel);
    }
});
