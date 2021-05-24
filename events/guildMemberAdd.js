const Discord = require("discord.js");
const config = require("../config")
module.exports = (client, member) => {
    const log = client.channels.cache.get(config.memberLogs);
    const embed = new Discord.MessageEmbed()
        .setColor(`${config.embedColor}`)
        .setAuthor('A new user Joined!')
        .addField(`User Joined:`, `${member.user.tag}`)
        .addField(`User ID:`, `${member.user.id}`)
        .setTimestamp()
    log.send(embed)
}