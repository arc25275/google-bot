fetch = require("node-fetch");
const { searchkey } = require("../config/auth.json");
const randColor = require("../util/randColor");
module.exports = {
	name: "search",
	description: "Searches something.",
	options: [
		{
			name: "query",
			type: "STRING",
			description: "What you want to search",
			required: true,
		},
	],
	enabled: true,
	permissions: [],
	async run(client, interaction) {
		await interaction.defer();
		const { value: query } = interaction.options.get("query");
		const fields = [];
		await fetch(
			`https://customsearch.googleapis.com/customsearch/v1?cx=336aaf40ae3497966&exactTerms=${query}&key=${searchkey}`
		)
			.then((res) => res.json())
			.then((json) =>
				json.items.forEach((res) => {
					fields.push({
						name: `**${res.title}** - ${res.link}`,
						value: res.snippet,
					});
				})
			);
		const embed = {
			title: "Results:",
			fields: fields,
			color: randColor(),
		};
		await interaction.editReply({ embeds: [embed] });
	},
};
