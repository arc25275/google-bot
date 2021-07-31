const loadCommands = require("../util/loadCommands.js");
const c = require("chalk");

module.exports = {
	once: true,
	async run(client) {
		console.log(
			`Logged in as ${c.greenBright(client.user.tag)}! In ${c.greenBright(
				client.guilds.cache.size
			)} servers.\n`
		);
		loadCommands(client);
	},
};
