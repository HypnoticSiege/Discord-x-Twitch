const parse = require('parse-duration')
const Discord = require("discord.js");
const config = require("../config");
const vcs = new Map()

module.exports = (client, oldState, newState) => {
    const log = client.channels.cache.get(config.DiscordLogs);
    if (!log) return
    const embed = new Discord.MessageEmbed()
        .setColor(`${config.embedColor}`)
        .setAuthor('Voice Status Update!')
        .setTimestamp()
    if (oldState.serverDeaf !== newState.serverDeaf && newState.serverDeaf) log.send(embed.setDescription(`**${newState.member.user.tag}** Was Server Deafened!`))
    else if (oldState.serverDeaf !== newState.serverDeaf && !newState.serverDeaf) log.send(embed.setDescription(`**${newState.member.user.tag}** Was Undeafened!`))
    else if (oldState.serverMute !== newState.serverMute && newState.serverMute) log.send(embed.setDescription(`**${newState.member.user.tag}** Was Server Muted!`))
    else if (oldState.serverMute !== newState.serverMute && !newState.serverMute) log.send(embed.setDescription(`**${newState.member.user.tag}** Was Unmuted!`))
    else if (oldState.channelID !== newState.channelID && newState.channelID && !oldState.channelID) log.send(embed.setDescription(`**${newState.member.user.tag}** joined a voice channel!\n**Joined Channel:** ${newState.channel}`))
    else if (oldState.channelID !== newState.channelID && oldState.channelID && !newState.channelID) log.send(embed.setDescription(`**${newState.member.user.tag}** left a voice channel!\n**Left channel:** ${oldState.channel}`))
    else if (oldState.channelID !== newState.channelID && oldState.channelID && newState.channelID) log.send(embed.setDescription(`**${newState.member.user.tag}** moved voice channels!\n**Old Channel:** ${oldState.channel}\n**New Channel:** ${newState.channel}`))
    else if (oldState.streaming !== newState.streaming && newState.streaming) log.send(embed.setDescription(`**${newState.member.user.tag}** starting streaming!\n**Streaming in:** ${newState.channel}`))
    else if (oldState.streaming !== newState.streaming && !newState.streaming) log.send(embed.setDescription(`**${newState.member.user.tag}** stopped streaming!`))
}