const Discord = require("discord.js");
const config = require("../config")
module.exports = (client, guild, user) => {
    const log = client.channels.cache.get(config.serverLogs);
    const embed = new Discord.MessageEmbed()
        .setColor(`${config.embedColor}`)
        .setAuthor('A user was Unbanned!')
        .addField(`Unbanned User:`, `${user.tag}`)
        .addField(`User ID:`, `${user.id}`)

    .setTimestamp()
    log.send(embed)
}