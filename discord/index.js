module.exports = async => {
    const config = require('../config');
    const Discord = require('discord.js');
    const Enmap = require("enmap");
    const fs = require("fs");

    const client = new Discord.Client();
    client.config = config;
    client.commands = new Enmap();

    client.on('messageDelete', async message => {
        const log = client.channels.cache.get(client.config.discord.logs.discord.channel);
        var embed = new Discord.MessageEmbed().setColor(`${client.config.discord.embed.color}`).setAuthor('Message Deleted', message.guild.iconURL).addField('User', message.author.tag).addField('Message', message.content).addField('Channel', message.channel).setTimestamp()
        if (message.author == client.user.id) return;
        else return log.send(embed)
    });

    client.on("messageUpdate", function(oldMessage, newMessage) {
        const log = client.channels.cache.get(client.config.discord.logs.discord.channel);
        var embed = new Discord.MessageEmbed().setColor(`${client.config.discord.embed.color}`).setAuthor(`Message Edited`).setDescription(`**User:** \n${oldMessage.author.tag}\n\n**Old Message:** \n${oldMessage.content}\n\n**New Message:** \n${newMessage.content}`).addField('Channel', `${oldMessage.channel}`).setTimestamp()
        if (oldMessage.author == client.user.id) return;
        else return log.send(embed)
    });

    //Event Handler
    fs.readdir("./discord/events/", (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            const event = require(`./events/${file}`);
            let eventName = file.split(".")[0];
            client.on(eventName, event.bind(null, client));
        });
    });

    //Command Handler
    fs.readdir("./discord/commands/", (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            let props = require(`./commands/${file}`);
            let commandName = file.split(".")[0];
            client.commands.set(commandName, props);
        });
    });

    client.login(config.discord.token);
}