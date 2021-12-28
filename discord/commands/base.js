//This is a base Command for the Discord Section of this Bot

//Import Discord
const Discord = require("discord.js");

//Run Client, Message, and Args
module.exports.run = async(client, message, args) => {
    message.channel.send(`Hey!`)
};