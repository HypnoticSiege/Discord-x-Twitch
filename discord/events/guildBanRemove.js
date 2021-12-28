const Discord = require("discord.js");

module.exports = (client, guild, user) => {
    const log = client.channels.cache.get(client.config.discord.logs.discord.channel);
    const embed = new Discord.MessageEmbed()
        .setColor(`${client.config.discord.embed.color}`)
        .setAuthor('A user was Unbanned!')
        .addField(`Unbanned User:`, `${user.tag}`)
        .addField(`User ID:`, `${user.id}`)

    .setTimestamp()
    log.send(embed)
}