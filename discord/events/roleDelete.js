const Discord = require("discord.js");
const config = require("../../config")

module.exports = (client, role) => {
    const log = client.channels.cache.get(client.config.discord.logs.discord.channel);
    if (!log || !channel.guild) return

    const embed = new Discord.MessageEmbed()
        .setColor(`${client.config.discord.embed.color}`)
        .setAuthor('A Role was Deleted!')
        .addField(`Role Name:`, `${role.name}`)
        .addField(`Role ID:`, `${role.id}`)

    .setTimestamp()
    log.send(embed)
}