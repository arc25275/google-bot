const fs = require("fs");
const c = require("chalk");

module.exports = {
	once: true,
	async run(client) {
		console.log(
			`Logged in as ${c.greenBright(client.user.tag)}! In ${c.greenBright(
				client.guilds.cache.size
			)} servers.`
		);
		const commandFiles = fs
			.readdirSync(__dirname + "/../commands")
			.filter((file) => file.endsWith(".js"));
		for (const file of commandFiles) {
			const command = require(__dirname + `/../commands/${file}`);
			await client.commands.set(command.name, command);
		}
		console.log("Commands Loaded:");
		client.commands.forEach((command) =>
			console.log(
				`[ ${c.greenBright(
					command.name.charAt(0).toUpperCase() + command.name.slice(1)
				)} ]`
			)
		);
	},
};
