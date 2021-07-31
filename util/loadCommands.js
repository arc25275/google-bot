const fs = require("fs");
const c = require("chalk");
const { Table } = require("console-table-printer");

module.exports = async function loadCommands(client) {
	const commandFiles = fs
		.readdirSync(__dirname + "/../commands")
		.filter((file) => file.endsWith(".js"));
	for (const file of commandFiles) {
		const command = require(__dirname + `/../commands/${file}`);
		await client.commands.set(command.name, command);
	}
	const p = new Table({
		title: "Commands",
		columns: [
			{ name: "Name", alignment: "left" },
			{ name: "Description", alignment: "left" },
		],
	});
	client.commands.forEach((command) => {
		p.addRow(
			{
				Name: command.name.charAt(0).toUpperCase() + command.name.slice(1),
				Description: command.description,
			},
			{ color: "green" }
		);
	});
	p.printTable();
};
