const Discord = require("discord.js");
const config = require("../config")
module.exports = (client, member) => {
    const log = client.channels.cache.get(config.memberLogs);
    const embed = new Discord.MessageEmbed()
        .setColor(`${config.embedColor}`)
        .setAuthor('A uer Left!')
        .addField(`User Left:`, `${member.user.tag}`)
        .addField(`User ID:`, `${member.user.id}`)
        .setTimestamp()
    log.send(embed)
}