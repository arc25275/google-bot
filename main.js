const fs = require("fs");
const fetch = require("node-fetch");
const Discord = require("discord.js");
const myIntents = new Discord.Intents();
myIntents.add("GUILD_MEMBERS", "GUILD_MESSAGES", "GUILDS");
const { token } = require("./config/auth.json");
// const config = require("./config/config.json");

const client = new Discord.Client({ intents: myIntents });
client.events = new Discord.Collection();
client.commands = new Discord.Collection();

client.login(token);

//Command Handler
const commandFiles = fs
	.readdirSync("./commands")
	.filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

//Event Handler
fs.readdir("./events/", (err, files) => {
	if (err) return console.error(err);

	files.forEach((file) => {
		const eventFunction = require(`./events/${file}`);
		if (eventFunction.disabled) return;

		const event = file.split(".")[0];
		const emitter = client;
		const once = eventFunction.once;

		try {
			emitter[once ? "once" : "on"](
				event,
				eventFunction.run.bind(null, client)
			);
		} catch (error) {
			console.log(error);
		}
	});
});
