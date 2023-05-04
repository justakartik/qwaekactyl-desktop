/* 
Author - Justakartik
Github - https://github.com/justakartik/qwaekactyl-desktop
Project name - Qwaekactyl Desktop
License - MIT
Used packages and elements - electron, discord-rpc, electron-builder, qwaekactyl-desktop-pack
*/

const { app, BrowserWindow, webContents, ipcMain, Menu, Tray } = require('electron')
const path = require('path')
const MainMenuapp = require('./menu-config')
const RightMenuapp = require('./right-menu-config')
const appConfig = require('./config')


const rpc = require("discord-rpc");
client = new rpc.Client({ transport: 'ipc' });


const AppID = "1102133283044733000"
const details = "The Best Control Panel For Splitting Resources On Pterodactyl Panel."
const state = "0.0.1"
const largeImageKey = "largeqwack"
const largeImageText = "Qwaekactyl CP Desktop"

client.on('ready', () => {

    client.setActivity({
        details: details,
        state: state,
        largeImageKey: largeImageKey,
        largeImageText: largeImageText,
        buttons: [
            { label: "Github", url: "https://github.com/Qwaekactyl/Qwaekactyl" }, { label: "Discord", url: "https://discord.gg/suusMvAVtp" },
        ]
    });
});
rpc.register(AppID);
client.login({ clientId: AppID }).catch((error) => {
    throw error.message;
});

let mainWindow

//Menu
let mainMenu = Menu.buildFromTemplate(MainMenuapp)

let rightMenu = Menu.buildFromTemplate(RightMenuapp)


function createWindow() {
    mainWindow = new BrowserWindow({
        width: appConfig['width'],
        height: appConfig['height'],
        minWidth: appConfig['minWidth'],
        minHeight: appConfig['minHeight'],
        icon: './build/icon.ico',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
        
    })

    //Load Appliaction Main Menu
    Menu.setApplicationMenu(mainMenu)

    //Load Right click menu
    mainWindow.webContents.on('context-menu', e => {
        rightMenu.popup(mainWindow)
    })

    //CreatWindow execute loding remote content
    loadWebContent()

    
    

    tray = new Tray('./assets/logo.png')

    tray.setToolTip('Qwaekactyl Desktop')
    tray.on("click",() => (
        mainWindow.isVisible()?mainWindow.hide():mainWindow.show()



    ))

    mainWindow.on('minimize', function (event) {
        event.preventDefault();
        mainWindow.setSkipTaskbar(false);
       
    });
}




let icon = "./build/logo.ico";
if (process.platform == "win32") {
    icon = "./build/logo.ico";
} else if (process.platform == "darwin") {
    icon = "./build/logo.ico";
}


function loadWebContent() {
    //Loading spalsh screen
    mainWindow.loadFile(path.join(__dirname, 'public/loading.html'))

    //create webContants
    let wc = mainWindow.webContents

    //suessfull loding page afer dom created
    wc.once('did-finish-load', () => {
        mainWindow.loadURL(appConfig['websiteUrl'])
    })


    //if not loading page redirect error page
    wc.on('did-fail-load', (error, code) => {
        //console.log(code)
        mainWindow.loadFile(path.join(__dirname, 'public/offline.html'))
    })
}

//Check website loading error (offline, page not found or etc.)
ipcMain.on('online-status-changed', (event, status) => {
    if (status == true) { loadWebContent() }
})

//Load menuItem local pages (About, Home page, etc)
module.exports = (pageId) => {
    if (pageId === 'home') {
        loadWebContent()
    } else {
        mainWindow.loadFile(path.join(__dirname, `public/${pageId}.html`))
    }
}


app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})