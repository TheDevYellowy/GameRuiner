const { ipcRenderer } = require('electron');

document.getElementById('drop').addEventListener('click', () => {
    console.log('clicked drop');
    ipcRenderer.send('message', ['sendCommand', 'g']);
});

document.getElementById('shift').addEventListener('click', () => {
    console.log('clicked run');
    ipcRenderer.send('message', ['sendCommand', 'shift']);
});

document.getElementById('leftCick').addEventListener('click', () => {
    console.log('click shoot');
    ipcRenderer.send('message', ['sendCommand', 'leftClick']);
});

document.getElementById('useE').addEventListener('click', () => {
    console.log('click shoot');
    ipcRenderer.send('message', ['sendCommand', 'useE']);
});

document.getElementById('useQ').addEventListener('click', () => {
    console.log('click shoot');
    ipcRenderer.send('message', ['sendCommand', 'useQ']);
});

document.getElementById('muteAudio').addEventListener('click', () => {
    console.log('click shoot');
    ipcRenderer.send('message', ['sendCommand', 'audio_mute']);
});