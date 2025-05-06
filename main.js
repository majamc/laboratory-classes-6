const { app, BrowserWindow } = require('electron');
const path = require('path');
const http = require('http');
const { spawn } = require('child_process');

let mainWindow;

function createWindow() {;
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: false
    }
  });

  const checkServer = () => {
    http.get('http://localhost:3000', (res) => {
      if (res.statusCode === 200) {
        mainWindow.loadURL('http://localhost:3000');
      } else {
        setTimeout(checkServer, 500);
      }
    }).on('error', () => {
      setTimeout(checkServer, 500);
    });
  };

  checkServer();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  spawn('npm', ['start'], {
    shell: true,
    stdio: 'inherit',
  });

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
