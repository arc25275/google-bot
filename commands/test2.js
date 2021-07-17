module.exports = {
	name: "test2",
	description: "test but invisible .",
	options: [],
	enabled: true,
	permissions: [],
	async run(client, interaction) {
		await interaction.reply({ content: "testing!!!11!!", ephemeral: true });
	},
};
