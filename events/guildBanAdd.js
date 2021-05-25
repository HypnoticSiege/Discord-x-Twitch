const Discord = require("discord.js");
const config = require("../config")
module.exports = (client, guild, user) => {
    const log = client.channels.cache.get(config.DiscordLogs);
    const embed = new Discord.MessageEmbed()
        .setColor(`${config.embedColor}`)
        .setAuthor('A new user was Banned!')
        .addField(`Banned User:`, `${user.tag}`)
        .addField(`User ID:`, `${user.id}`)
        .setTimestamp()
    log.send(embed)
}