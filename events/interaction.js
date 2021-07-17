const fetch = require("node-fetch");
const fs = require("fs");

module.exports = {
	once: false,
	async run(client, interaction) {
		if (!interaction.isCommand()) return;
		try {
			client.commands.get(interaction.commandName).run(client, interaction);
		} catch (error) {
			console.log(error);
		}
	},
};
