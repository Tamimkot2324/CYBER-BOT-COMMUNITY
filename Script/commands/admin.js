const moment = require("moment-timezone");

module.exports.config = {
    name: "admin",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Tamim", //don't change my credit
    description: "Show Owner Info",
    commandCategory: "info",
    usages: "",
    cooldowns: 5
};

module.exports.run = async function({ api, event }) {
    var time = moment().tz("Asia/Dhaka").format("DD/MM/YYYY hh:mm:ss A");

    api.sendMessage({
        body: `
┏━━━━━━━━━━━━━━━━━━━━━┓
┃      🌟 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 🌟      
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 👤𝗙𝗶𝗿𝘀𝘁 𝗼𝘄𝗻𝗲𝗿 : 𝗠𝗱 𝗧𝗮𝗺𝗶𝗺
|
| 👤𝘀𝗲𝗰𝗼𝗻𝗱 𝗼𝘄𝗻𝗲𝗿:𝗠𝗮𝘆𝗮 𝗮𝗸𝘁𝗲𝗿
|
┃ 🤖𝗕𝗼𝘁 𝗻𝗮𝗺𝗲 : 🌺𝗛𝗶𝗻𝗮𝘁𝗮🌺
┃ 
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 🎭🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 🕒 𝐔𝐩𝐝𝐚𝐭𝐞𝐝 𝐓𝐢𝐦𝐞:  ${time}
┗━━━━━━━━━━━━━━━━━━━━━┛
        `
    }, event.threadID);
};
