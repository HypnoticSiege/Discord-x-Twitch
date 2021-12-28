const Discord = require("discord.js");

module.exports = (client, member) => {
    const log = client.channels.cache.get(client.config.discord.logs.discord.channel);
    const embed = new Discord.MessageEmbed()
        .setColor(`${client.config.discord.embed.color}`)
        .setAuthor('A uer Left!')
        .addField(`User Left:`, `${member.user.tag}`)
        .addField(`User ID:`, `${member.user.id}`)
        .setTimestamp()
    log.send(embed)
}