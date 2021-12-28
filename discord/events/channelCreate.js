const Discord = require("discord.js");

module.exports = (client, channel) => {
    const log = client.channels.cache.get(client.config.discord.logs.discord.channel);

    const embed = new Discord.MessageEmbed()
        .setColor(`${client.config.discord.embed.color}`)
        .setAuthor('A channel was Created!')
        .addField(`Channel Name:`, `${channel.name}`)
        .addField(`Channel ID:`, `${channel.id}`)

    .setTimestamp()
    log.send(embed)
}