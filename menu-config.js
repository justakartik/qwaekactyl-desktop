module.exports = [{
        label: 'Home',
        submenu: [
            { label: 'Home', click: () => { require('./main')("home") } },
            { label: 'About', click: () => { require('./main')("about") } },
            { role: 'quit' },
        ]
    },
    {
        label: 'Panel',
        submenu: [
            { label: 'Panel', click: () => { require('./main')("panel") } },
        ]
    },
    {
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
        ]
    },
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'zoomIn' },
            { role: 'zoomOut' },
        ]
    },
]