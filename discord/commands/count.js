const Discord = require("discord.js");
module.exports.run = async(client, message, args) => {
    message.reply(
        `This Bot is on ${client.guilds.cache.size} servers and serving ${client.users.cache.size} members!`
    );
};