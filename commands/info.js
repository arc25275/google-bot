const randColor = require("../util/randColor");

module.exports = {
	name: "info",
	description: "Gives info about the bot",
	options: [],
	enabled: true,
	permissions: [],
	async run(client, interaction) {
		const embed = {
			fields: [
				{
					name: "Uptime",
					value: `${client.uptime}ms`,
				},
				{
					name: "Apis Used",
					value: `• [Discord.js](https://discord.js.org)\n•  [Google Doodle API](https://www.google.com/doodles/json)\n• [Google Custom Search API](https://developers.google.com/custom-search/v1/overview)\n• [Google Translate API](https://cloud.google.com/translate/docs/quickstart-client-libraries)`,
				},
			],
			color: randColor(),
		};

		await interaction.reply({ embeds: [embed] });
	},
};
