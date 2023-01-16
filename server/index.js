console.clear();

const { WebSocketServer } = require('ws');
const robot = require('robotjs');
const wait = require('util').promisify(setTimeout);
const ip = import('public-ip');

const wss = new WebSocketServer({ port: 2048, host: '10.162.195.95' });

wss.on('connection', async (ws) => {
    ws.on('message', async (data) => {
        data = JSON.parse(data.toString());
        const { op, d } = data;
        console.log({ op, d });
        switch(op) {
            case 0:
                console.log(`${d.user.username} has connected`);
                break;
            case 1:
                if(d.key == 'leftClick') {
                    robot.mouseClick();
                } else if(d.key == 'useQ') {
                    robot.keyTap('q');
                    await wait(500);
                    robot.mouseClick();
                } else if(d.key == 'useE') {
                    robot.keyTap('e');
                    await wait(500);
                    robot.mouseClick();
                } else if(d.key == 'audio_mute') {
                    robot.keyTap('audio_mute');
                    await wait(5000);
                    robot.keyTap('audio_mute');
                } else {
                    robot.keyTap(d.key);
                }
                break;
            case 2:
                console.log(`${d.user.username} disconnected`);
                break;
            default:
                console.log(data);
                break;
        }
    });
});

wss.on('listening', async () => {
    let address = await ip.then(i => i.publicIpv4());
    console.log(`server is ready at ${wss.address().address}:${wss.address().port}`);
})