module.exports = {
    discord: {
        token: "YOUR-TOKEN-HERE", //Get yours at https://discord.com/developers/applications/

        logs: {
            discord: {
                enabled: true,
                channel: '909654880669560902'
            },

            twitch: {
                enabled: true,
                channel: '924332370860052541'
            }
        },

        embed: {
            color: 'BLUE',
            footer: 'Hypnotic Development',
            logo: 'https://hypnoticsiege.net/images/uploads/logo.png'
        }
    },

    twitch: {
        oauth: 'oauth:YOUR-OAUTH', //Get yours at https://twitchapps.com/tmi/
        channels: ['hypnoticsiege'],
        username: 'hypnoticsiege'
    },

    shared: {
        prefix: '!',
    }
}