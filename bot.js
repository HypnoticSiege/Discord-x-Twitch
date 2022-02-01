const HypnoticDiscord = require('./discord')
HypnoticDiscord()

const HypnoticTwitch = require('./twitch')
HypnoticTwitch()

console.clear()

console.log('Discord and Twitch bots are now running.')
const figlet = require('figlet');
const colors = require('colors/safe')

figlet(`Discord x Twitch`, function(err, data) {
    if (err) return console.error(err);
    console.log(colors.cyan(data));
    console.log('Created by ' + colors.brightCyan(`HypnoticSiege - https://hypnoticsiege.net`))
});

const app = require('./web');
app(HypnoticDiscord, HypnoticTwitch)