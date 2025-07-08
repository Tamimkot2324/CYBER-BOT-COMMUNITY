const fs = require("fs");
module.exports.config = {
	name: "cake",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "𝙋𝙧𝙞𝙮𝙖𝙣𝙨𝙝 𝙍𝙖𝙟𝙥𝙪𝙩", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "cake",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("CAKE")==0 || event.body.indexOf("Cake")==0 || event.body.indexOf("cake")==0 || event.body.indexOf(".cake")==0) {
		var msg = {
				body: "💝 YE LO BBY CAKE KHAO 🎂\n\n(-𝐌𝐚𝐝𝐞 𝐁𝐲 🌹چـﹿٰٰٰٖٖٖٜ۬ﹿٰٰٖٖٜ۬ﹻۗـوزَۂ ❤👑🌹چـﹿٰٰٰٖٖٖٜ۬ﹿٰٰٖٖٜ۬ﹻۗـوزَیِ❤👑❤️-)",
				attachment: 
fs.createReadStream(__dirname + `/cache/Cake.jpg`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🎂", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
