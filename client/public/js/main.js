const { ipcRenderer } = require('electron');

document.getElementById('drop').addEventListener('click', () => {
	ipcRenderer.send('message', ['sendCommand', 'g']);
});

document.getElementById('shift').addEventListener('click', () => {
	ipcRenderer.send('message', ['sendCommand', 'shift']);
});

document.getElementById('leftCick').addEventListener('click', () => {
	ipcRenderer.send('message', ['sendCommand', 'leftClick']);
});

document.getElementById('useE').addEventListener('click', () => {
	ipcRenderer.send('message', ['sendCommand', 'useE']);
});

document.getElementById('useQ').addEventListener('click', () => {
	ipcRenderer.send('message', ['sendCommand', 'useQ']);
});

document.getElementById('muteAudio').addEventListener('click', () => {
	ipcRenderer.send('message', ['sendCommand', 'audio_mute']);
});

document.getElementById('sendKey').addEventListener('click', () => {
	let key = document.getElementById('key').value;
	ipcRenderer.send('message', ['sendCommand', key[0]]);
});
