module.exports = {
    discord: {
        token: "NzgxMTY0MjE4NjYxMzM5MTc2.X75p3w.GStgV70ZV98-lz5QTK7qBQbvJJo", //Get yours at https://discord.com/developers/applications/

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
        oauth: 'oauth:1sy6feu1mdrs3mktj7b6vqvx5o9x9n', //Get yours at https://twitchapps.com/tmi/
        channels: ['hypnoticsiege'],
        username: 'hypnoticsiege'
    },

    shared: {
        prefix: '!',
    }
}