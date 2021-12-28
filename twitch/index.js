module.exports = async => {
    const config = require('../config')

    const tmi = require("tmi.js");

    const identityconfig = {
        options: {
            debug: true
        },
        connection: {
            cluster: "aws",
            reconnect: true
        },
        identity: {
            username: config.twitch.username,
            password: config.twitch.oauth
        },
        channels: config.twitch.channels
    }

    const client = new tmi.client(identityconfig)
    client.connect();
    client.log.setLevel('warn')

    //Main Function/Handler
    client.on("chat", async(channel, user, message, self) => {
        if (self) return;
        const args = message.slice(config.shared.prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        try {
            let commandFile = require(`./commands/${cmd}.js`)
            commandFile.run(client, message, args, user, channel, self)
        } catch (err) {}

        //Chat Logger (WIP)
    })
}