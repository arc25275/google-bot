module.exports = {
	name: "test",
	description: "testing yeah! yep",
	options: [],
	enabled: true,
	permissions: [],
	async run(client, interaction) {
		console.log("AAAAAAAAA");
		await interaction.reply({ content: "Test!!!!" });
	},
};
