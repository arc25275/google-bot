module.exports = {
	name: "deploy",
	description: "Deploys Commands",
	options: [
		{
			name: "dev",
			type: "SUB_COMMAND",
			description: "Pushes commands to dev server",
		},
		{
			name: "global",
			type: "SUB_COMMAND",
			description: "Pushes commands globally",
		},
	],
	enabled: false,
	permissions: [{ id: "369661965376946176", type: "USER", permission: true }],
	async run(client, interaction) {
		await interaction.defer();
		if (!client.application?.owner) await client.application?.fetch();
		if (interaction.member.id === client.application?.owner.id) {
			var slashCommands = [];
			client.commands.forEach(command => {
				slashCommands.push({
					name: command.name,
					description: command.description,
					options: command.options,
					defaultPermission: command.enabled,
					permissions: command.permissions,
				});
			});

			if (interaction.options.get("dev")) {
				const commands = await client.guilds.cache
					.get("594893277468295229")
					?.commands.set(slashCommands)
					.catch(console.error);
				// console.log(commands);
				await interaction.editReply("Commands pushed to dev server.");
			}
			if (interaction.options.get("global")) {
				await client.application?.commands;
				const commands = await client.application?.commands
					.set(slashCommands)
					.catch(console.error);
				// console.log(commands);
				await interaction.editReply("Commands pushed globally.");
			}
		}
	},
};
