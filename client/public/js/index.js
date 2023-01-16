var ipcRenderer = require('electron').ipcRenderer;

function login() {
    let name = document.getElementById("name").value;
    // let ip = document.getElementById("ip").value;
    if(name == null) return;

    ipcRenderer.send('message', ['createUser', name]);
}

let button = document.getElementById('login');
button.addEventListener('click', (ev) => {
    login();
});