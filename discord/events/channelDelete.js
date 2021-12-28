const Discord = require("discord.js");

module.exports = (client, channel) => {
    const log = client.channels.cache.get(client.config.discord.logs.discord.channel);
    if (!log || !channel.guild) return

    const embed = new Discord.MessageEmbed()
        .setColor(`${client.config.discord.embed.color}`)
        .setAuthor('A channel was Deleted!')
        .addField(`Channel Name:`, `${channel.name}`)
        .addField(`Channel ID:`, `${channel.id}`)

    .setTimestamp()
    log.send(embed)
}