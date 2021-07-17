const { translatekey } = require("../config/auth.json");
const { decode } = require("html-entities");
const ISO = require("iso-639-1");
const randColor = require("../util/randColor");

module.exports = {
	name: "translate",
	description: "Translate something from one language to another",
	options: [
		{
			name: "query",
			type: "STRING",
			description: "What you want to translate",
			required: true,
		},
		{
			name: "language",
			type: "STRING",
			description: "Language to be translated to. Uses ISO 639-1 codes.",
			//https://gist.github.com/Josantonius/b455e315bc7f790d14b136d61d9ae469 Add to help/info later
			required: true,
		},
		{
			name: "mobile",
			type: "BOOLEAN",
			description: "Mobile Friendly copying",
			required: false,
		},
	],
	enabled: true,
	permissions: [],
	async run(client, interaction) {
		await interaction.defer();
		const { value: query } = interaction.options.get("query");
		const { value: target } = interaction.options.get("language");
		var { value: mobile } = false;
		if (interaction.options.get("mobile")) {
			mobile = interaction.options.get("mobile").value;
		}
		var source = "";
		var translatedText = "";
		if (!ISO.validate(target))
			return await interaction.editReply("Invalid Language Provided");
		//Detect

		await fetch(
			`https://translation.googleapis.com/language/translate/v2/detect?key=${translatekey}`,
			{
				method: "post",
				body: JSON.stringify({ q: query }),
				headers: { "Content-Type": "application/json" },
			}
		)
			.then((res) => res.json())
			.then((json) => (source = json.data.detections[0][0].language));

		await fetch(
			`https://translation.googleapis.com/language/translate/v2?key=${translatekey}`,
			{
				method: "post",
				body: JSON.stringify({
					q: query,
					source: source,
					target: target,
					format: "text",
				}),
				headers: { "Content-Type": "application/json" },
			}
		)
			.then((res) => res.json())
			.then(
				(json) =>
					(translatedText = decode(json.data.translations[0].translatedText))
			);
		if (mobile) {
			await interaction.editReply(translatedText);
			return;
		}
		if (!mobile) {
			const embed = {
				title: "Results:",
				description: `Original Text (${ISO.getName(
					source
				)}):\n \`\`\`${query}\`\`\`\nTranslated Text(${ISO.getName(
					target
				)}):\n \`\`\`${translatedText}\`\`\``,
				color: randColor(),
			};
			await interaction.editReply({ embeds: [embed] });
			return;
		}
	},
};
