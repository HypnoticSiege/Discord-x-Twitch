module.exports = async client => {
    client.user.setActivity(client.config.twitch.channels[0], {
        type: "WATCHING",
    });
}