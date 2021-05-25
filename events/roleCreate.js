const Discord = require("discord.js");
const config = require("../config")
module.exports = (client, role) => {
    const log = client.channels.cache.get(config.DiscordLogs);
    if (!log || !channel.guild) return

    const embed = new Discord.MessageEmbed()
        .setColor(`${config.embedColor}`)
        .setAuthor('A new Role was Created!')
        .addField(`Role Name:`, `${role.name}`)
        .addField(`Role ID:`, `${role.id}`)

    .setTimestamp()
    log.send(embed)
}