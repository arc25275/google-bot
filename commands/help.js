const randColor = require("../util/randColor");

module.exports = {
	name: "help",
	description: "Gives more info about a command",
	options: [],
	enabled: true,
	permissions: [],
	async run(client, interaction) {
		const embed = { fields: [], color: randColor() };
		client.commands.forEach(command => {
			embed.fields.push({
				name: `/${command.name}`,
				value: `${command.description}`,
			});
		});
		await interaction.reply({ embeds: [embed] });
	},
};
