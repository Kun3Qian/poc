const { app, BrowserWindow } = require('electron')
const electron_edge = require('electron-edge')

let win;

var hello = electron_edge.func(function () {/*
    #r "System.dll"
    using System;
    async (input) => 
                { 
        var message = ".NET welcomes " + input.ToString();
        message += "\r\n--By Kun";
        Console.WriteLine(message);
        return message;
                }
*/});
 
function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 600, 
    height: 600,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`
  })


  win.loadURL(`file://${__dirname}/dist/index.html`)

  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()

  hello('Node.js', function (error, result) {
    if (error) throw error;
    console.log(result);
    });

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })
}



// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})

 

 
/*
var clrMethod = edge.func({
    assemblyFile: 'TestCSharpProject.dll',
    typeName: 'TestCSharpProject.Test',
    methodName: 'FormatInputString' // This must be Func<object,Task<object>>
});
 
clrMethod('Test calling a c# method in a dll from javascript',function (error, result) {
                if (error) throw error;
                console.log(result);
});
*/