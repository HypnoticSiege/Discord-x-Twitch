//Shared Dependancies
const config = require('./config');
const prefix = config.prefix;
const colors = require('colors/safe')

//Twitch Bot Dependancies
const tmi = require("tmi.js");

//Discord Bot Dependancies
const Discord = require('discord.js');
const Enmap = require("enmap");
const fs = require("fs");



//Discord Bot Start
const client = new Discord.Client();
client.commands = new Enmap();

//Logging
client.on('messageDelete', async message => {
    const log = client.channels.cache.get(config.DiscordLogs);
    var embed = new Discord.MessageEmbed().setColor(`${config.embedColor}`).setAuthor('Message Deleted', message.guild.iconURL).addField('User', message.author.tag).addField('Message', message.content).addField('Channel', message.channel).setTimestamp()
    if (message.author == client.user.id) return;
    else return log.send(embed)
});

client.on("messageUpdate", function(oldMessage, newMessage) {
    const log = client.channels.cache.get(config.DiscordLogs);
    var embed = new Discord.MessageEmbed().setColor(`${config.embedColor}`).setAuthor(`Message Edited`).setDescription(`**User:** \n${oldMessage.author.tag}\n\n**Old Message:** \n${oldMessage.content}\n\n**New Message:** \n${newMessage.content}`).addField('Channel', `${oldMessage.channel}`).setTimestamp()
    if (oldMessage.author == client.user.id) return;
    else return log.send(embed)
});

//Event Handler
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
        console.log(colors.green(`${eventName} Event ✅`));
    });
});

//Command Handler
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(colors.green(`${commandName} Command ✅`));
        client.commands.set(commandName, props);
    });
});
client.login(config.token);
//Discord Bot Finish



//Twitch Bot Start
const identityconfig = {
    options: {
        debug: true
    },
    connection: {
        cluster: "aws",
        reconnect: true
    },
    identity: {
        username: config.username,
        password: config.oauth
    },
    channels: config.channels
}

//Login/Connect Twitch
var twitchclient = new tmi.client(identityconfig)
twitchclient.connect();
twitchclient.on("connected", (address, port) => {
    console.log(colors.green(`Twitch Bot Online ✅`))
})

//Set Logging Level
twitchclient.log.setLevel('warn')

//Main Function/Handler
twitchclient.on("chat", async(channel, user, message, self) => {
        if (self) return;
        const args = message.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        //Command Handler
        try {
            let commandFile = require(`./twitch_cmds/${cmd}.js`)
            commandFile.run(twitchclient, message, args, user, channel, self)
        } catch (err) {}

        //Chat Logger
        const log = client.channels.cache.get(config.TwitchLogs);
        const ChatEmbed = new Discord.MessageEmbed()
            .setAuthor(`Message Sent by ${user.username}`)
            .setTitle(`New Message on ${channel}'s Channel`)
            .addField('Message Content:', `${message}`)
            .setFooter('Message Sent')
            .setColor(config.embedColor)
            .setTimestamp();
        return log.send(ChatEmbed)
    })
    //Twitch Bot End