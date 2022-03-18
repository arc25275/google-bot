const fetch = require("node-fetch");
const randColor = require("../util/randColor");

module.exports = {
	name: "doodle",
	description: "Gets todays Google Doodle, or a specific date",
	options: [
		{
			name: "today",
			type: "SUB_COMMAND",
			description: "Gets todays Doodle",
		},
		{
			name: "date",
			type: "SUB_COMMAND",
			description: "Specifies a date for a doodle",
			options: [
				{
					name: "year",
					type: "INTEGER",
					description: "Year of Doodle",
					required: true,
				},
				{
					name: "month",
					type: "INTEGER",
					description: "Month of Doodle",
					required: true,
				},
				{
					name: "day",
					type: "INTEGER",
					description: "Day of Doodle",
					required: true,
				},
			],
		},
	],
	enabled: true,
	permissions: [],
	async run(client, interaction) {
		var doodles = {};
		var doodle = {};
		var found = false;
		const BASE_URL = "https://www.google.com/doodles/json/";

		if (interaction.options.get("today")) {
			await fetch(
				`${BASE_URL}${new Date().getFullYear()}/${new Date().getMonth() + 1}`
			)
				.then(res => res.json())
				.then(json => (doodles = json));
			if (
				doodles[0].run_date_array[2] <= new Date().getDate() + 1 &&
				doodles[0].run_date_array[2] >= new Date().getDate() - 1
			) {
				doodle = doodles[0];
				found = true;
			} else {
				found = false;
			}
		}

		if (interaction.options.get("date")) {
			const date = interaction.options.get("date").options;
			console.log(date);
			await fetch(
				`https://www.google.com/doodles/json/${date.get("year").value}/${
					date.get("month").value
				}`
			)
				.then(res => res.json())
				.then(json => (doodles = json));

			doodle = doodles.find(d => d.run_date_array[2] == date.get("day").value);
			found = !!doodle;
		}
		if (found) {
			const embed = {
				title: doodle.title,
				image: {
					url: `https:${doodle.url}`,
				},
				color: randColor(),
			};
			await interaction.reply({ embeds: [embed] });
		} else {
			await interaction.reply("No Doodle found");
		}
	},
};
