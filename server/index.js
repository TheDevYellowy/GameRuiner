console.clear();

const { WebSocketServer } = require('ws');
const robot = require('robotjs');
const wait = require('util').promisify(setTimeout);
const ip = import('public-ip');

var cooldowns = {};
const wss = new WebSocketServer({ port: 2048, host: '10.162.195.95' });

wss.on('connection', async (ws) => {
    ws.on('message', async (data) => {
        data = JSON.parse(data.toString());
        const { op, d } = data;
        switch(op) {
            case 0:
                console.log(`${d.user.username} has connected`);
                cooldowns[d.user.username] = {};
                break;
            case 1:
                try {
                    if(cooldowns[d.user.username][d.key] > Date.now()) return;
                    if(d.key == 'leftClick') {
                        console.log(`${d.user.username} made you shoot`);
                        robot.mouseClick();
                        cooldowns[d.user.username][d.key] = Date.now() + 5000;
                    } else if(d.key == 'useQ') {
                        console.log(`${d.user.username} made you use your Q`);
                        robot.keyTap('q');
                        await wait(500);
                        robot.mouseClick();
                        cooldowns[d.user.username][d.key] = Date.now() + 3000;
                    } else if(d.key == 'useE') {
                        console.log(`${d.user.username} made you use your E`);
                        robot.keyTap('e');
                        await wait(500);
                        robot.mouseClick();
                        cooldowns[d.user.username][d.key] = Date.now() + 3000;
                    } else if(d.key == 'audio_mute') {
                        console.log(`${d.user.username} muted your audio`);
                        robot.keyTap('audio_mute');
                        await wait(5000);
                        robot.keyTap('audio_mute');
                        cooldowns[d.user.username][d.key] = Date.now() + 10000;
                    } else {
                        console.log(`${d.user.username} made you press ${d.key}`);
                        robot.keyTap(d.key);
                        cooldowns[d.user.username][d.key] = Date.now() + 5000;
                    }
                } catch (e) {
                    console.error(`An error has occured: ${e}`);
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