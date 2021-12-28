const Discord = require("discord.js");

module.exports = (client, guild, user) => {
    const log = client.channels.cache.get(client.config.discord.logs.discord.channel);
    const embed = new Discord.MessageEmbed()
        .setColor(`${client.config.discord.embed.color}`)
        .setAuthor('A new user was Banned!')
        .addField(`Banned User:`, `${user.tag}`)
        .addField(`User ID:`, `${user.id}`)
        .setTimestamp()
    log.send(embed)
}