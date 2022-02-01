module.exports = {
    discord: {
        token: "NzgxMTY0MjE4NjYxMzM5MTc2.X75p3w.6odNShMFbnQ9MtWoCZynGLL7H1w", //Get yours at https://discord.com/developers/applications/

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
        oauth: 'oauth:tghdt7v4zwveds5i5j6z0ze7f6x4kd', //Get yours at https://twitchapps.com/tmi/
        channels: ['hypnoticsiege'],
        username: 'hypnoticsiege'
    },

    shared: {
        prefix: '!',
    },

    dashboard: {
        clientID: '781164218661339176',
        clientSecret: 'Z9KPsuI__TJhsazPnXsDtBo0Biw2Yxfb',
        domain: 'http://localhost',
        usingCustomDomain: false,
        port: 80
    },
}