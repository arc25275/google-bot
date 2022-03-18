const randColor = require("../util/randColor");

module.exports = {
	name: "ping",
	description: "Shows ping",
	options: [],
	enabled: true,
	permissions: [],
	async run(client, interaction) {
		const embed = {
			description: `**${client.ws.ping}ms**`,
			color: randColor(),
		};
		await interaction.reply({ embeds: [embed] });
	},
};
