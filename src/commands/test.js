module.exports = {
	name: "test",
	description: "test",
	async execute(message, args) {
        message.channel.send("Test")
    }
}