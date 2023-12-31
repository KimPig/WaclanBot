import dotenv from 'dotenv';
import { SearchEngine } from './types.js';
import * as lavalinks from "./lavalinks.json" assert { type: 'json' };

dotenv.config();
let exports = {
    token: process.env.TOKEN,
    prefix: process.env.PREFIX,
    color: {
        red: 0xff0000,
        green: 0x00ff00,
        blue: 0x0000ff,
        yellow: 0xffff00,
        main: 0x4287f5,
    },
    searchEngine: process.env.SEARCH_ENGINE || SearchEngine.YouTube,
    maxPlaylistSize: parseInt(process.env.MAX_PLAYLIST_SIZE) || 100,
    botStatus: process.env.BOT_STATUS || 'online',
    botActivity: process.env.BOT_ACTIVITY || 'WaclanBot',
	botActivityType: process.env.BOT_ACTIVITY_TYPE || '0',
    maxQueueSize: parseInt(process.env.MAX_QUEUE_SIZE) || 100,
    owners: process.env.OWNERS?.split(','),
    database: process.env.DATABASE_URL,
    clientId: process.env.CLIENT_ID,
    guildId: process.env.GUILD_ID,
    links: {
        img: process.env.IMG_LINK || 'https://img3.gelbooru.com//images/bc/4d/bc4dc7baa27bf085330ff4634cb8003a.png'
    },
    icons: {
        youtube: 'https://media.discordapp.net/attachments/963097935820750878/1054328059639111700/3670147.png',
        spotify: 'https://media.discordapp.net/attachments/963097935820750878/1054333449252655104/spotify.png',
        soundcloud: 'https://media.discordapp.net/attachments/963097935820750878/1054333449638526986/145809.png',
        applemusic: 'https://media.discordapp.net/attachments/963097935820750878/1054333450368340018/apple-music-icon.png',
        deezer: 'https://media.discordapp.net/attachments/963097935820750878/1054333450024394802/5968803.png'
    },
    production: parseBoolean(process.env.PRODUCTION) || true,
    lavalink: [
        {
            url: process.env.LAVALINK_URL,
            auth: process.env.LAVALINK_AUTH,
            name: process.env.LAVALINK_NAME,
            secure: parseBoolean(process.env.LAVALINK_SECURE) || false,
        },
    ],
    geniusKey: process.env.GENIUS_KEY,
};
for (const i in lavalinks.list) {
    exports.lavalink.push(lavalinks.list[i])
}
export default exports;
function parseBoolean(value) {
    if (typeof value === 'string') {
        value = value.trim().toLowerCase();
    }
    switch (value) {
        case 'true':
            return true;
        default:
            return false;
    }
}
/**
 * Project: lavamusic
 * Author: Blacky
 * Company: Coders
 * Copyright (c) 2023. All rights reserved.
 * This code is the property of Coder and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/ns8CTk9J3e
 */
