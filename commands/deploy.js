module.exports = {
	name: "deploy",
	description: "Deploys Commands",
	options: [],
	enabled: true,
	permissions: [{ id: "822946105955450920", type: "ROLE", permission: true }],
	async run(client, interaction) {
		await interaction.defer();
		if (!client.application?.owner) await client.application?.fetch();
		if (interaction.member.id === client.application?.owner.id) {
			var slashCommands = [];
			client.commands.forEach((command) => {
				slashCommands.push({
					name: command.name,
					description: command.description,
					options: command.options,
					defaultPermission: command.enabled,
					permissions: command.permissions,
				});
			});

			const commands = await client.guilds.cache
				.get("594893277468295229")
				?.commands.set(slashCommands)
				.catch(console.error);
			console.log(commands);
			await interaction.editReply("Commands Pushed");
		}
	},
};
