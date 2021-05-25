const Discord = require("discord.js");
const config = require("../config")
module.exports = (client, channel) => {
    const log = client.channels.cache.get(config.DiscordLogs);
    if (!log || !channel.guild) return

    const embed = new Discord.MessageEmbed()
        .setColor(`${config.embedColor}`)
        .setAuthor('A channel was Deleted!')
        .addField(`Channel Name:`, `${channel.name}`)
        .addField(`Channel ID:`, `${channel.id}`)

    .setTimestamp()
    log.send(embed)
}