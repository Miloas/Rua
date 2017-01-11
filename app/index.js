/* eslint-env node */
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

const startRpcConfig = require('./config')

let mainWindow

function createWindow() {

  mainWindow = new BrowserWindow({
    width: 360,
    minHeight: 572,
    resizable: false,
    icon: path.resolve(__dirname, 'static/icon.png')
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  if(process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

function startServer() {
  let config = new startRpcConfig()
  config.init()
  app.on('before-quit', ()=>{
    config.p.kill()
  })
}

app.on('ready', createWindow)

app.on('ready', startServer)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
