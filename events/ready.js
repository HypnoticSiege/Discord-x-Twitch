module.exports = async client => {
    const config = require('../config')
    const colors = require('colors/safe')
    client.user.setActivity(config.username, {
        type: "PLAYING",
    });
    console.log(colors.green(`Discord Username: ${client.user.tag}`));
    console.log(colors.green("Default Prefix: " + config.prefix));
    console.log(colors.green(`Discord Bot Online ✅`))
}