console.clear();

const { WebSocketServer } = require('ws');
const { WebhookClient } = require('discord.js');
const robot = require('robotjs');
const wait = require('util').promisify(setTimeout);

var cooldowns = {};
const wss = new WebSocketServer({ port: 2048, host: '10.162.195.95' });
const webhook = new WebhookClient({ url: 'https://ptb.discord.com/api/webhooks/1066146232420020334/l_NgtnrVSkZX3jMc1unZDsi2ciVxTQjP8kLCjt6lQh_0pHRlHGl6haQuB2arQ57sKHzI' });

wss.on('connection', async (ws) => {
	ws.on('message', async (data) => {
		data = JSON.parse(data.toString());
		const { op, d } = data;
		switch (op) {
			case 0:
				webhook.send({username: 'Server', content: `${d.user.username} has connected`});
				cooldowns[d.user.username] = {};
				break;
			case 1:
				try {
					if (cooldowns[d.user.username][d.key] > Date.now()) return;
					if (d.key == 'leftClick') {
						webhook.send({ username: d.user.username, content: 'I just made you shoot' });
						robot.mouseClick();
						cooldowns[d.user.username][d.key] = Date.now() + 5000;
					} else if (d.key == 'useQ') {
						webhook.send({ username: d.user.username, content: 'I just made you use your Q' });
						robot.keyTap('q');
						await wait(500);
						robot.mouseClick();
						cooldowns[d.user.username][d.key] = Date.now() + 3000;
					} else if (d.key == 'useE') {
						webhook.send({ username: d.user.username, content: 'I just made you use your E' });
						robot.keyTap('e');
						await wait(500);
						robot.mouseClick();
						cooldowns[d.user.username][d.key] = Date.now() + 3000;
					} else if (d.key == 'audio_mute') {
						webhook.send({ username: d.user.username, content: 'I just muted your audio' });
						robot.keyTap('audio_mute');
						await wait(5000);
						robot.keyTap('audio_mute');
						cooldowns[d.user.username][d.key] = Date.now() + 10000;
					} else if(d.key == 'shift') {
						webhook.send({ username: d.user.username, content: 'I just made you run' });
						robot.keyToggle(d.key, true);
						await wait(1000);
						robot.keyToggle(d.key, false);
						cooldowns[d.user.username][d.key] = Date.now() + 5000;
					} else {
						webhook.send({ username: d.user.username, content: `I just made you press ${d.key}` });
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
	webhook.send({ username: 'Server', content: `I am online at ${wss.address().address}:${wss.address().port}`});
});
