const { app, BrowserWindow, ipcMain } = require('electron');
const { WebSocket } = require('ws');
let loginWindow;

const user = {};
var ws = new WebSocket(`ws://10.162.195.95:2048`);

const createLoginWindow = () => {
    loginWindow = new BrowserWindow({
        width: 300,
        height: 80,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: !app.isPackaged,
        }
    });

    loginWindow.loadFile('public/index.html');
    loginWindow.show();
}

const createMainWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 450,
        height: 100,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: !app.isPackaged,
        }
    });

    loginWindow.close();
    mainWindow.loadFile('public/main.html');
}

app.whenReady().then(() => {
    createLoginWindow();
    
    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0) createLoginWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('message', async (event, args) => {
    const uevent = args[0];
    switch (uevent) {
        case 'createUser':
            user.username = args[1];
            if(ws.readyState !== ws.OPEN) return;
            ws.send(JSON.stringify({ op: 0, d: { user: user } }));
            createMainWindow();
            break;
        case 'sendCommand':
            let key = args[1];
            ws.send(JSON.stringify({ op: 1, d: { user: user, key: key } }));
            break;
    }
});

ws.on('close', () => {
    ws.send(JSON.stringify({ op: 2, d: { user: user } }));
});