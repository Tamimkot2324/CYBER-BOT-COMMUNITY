module.exports.config = {
  name: "top",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "Monsur Edit ✨",
  description: "Display a premium-styled top 20 richest users list",
  commandCategory: "economy",
  usages: "top",
  cooldowns: 5
};

module.exports.run = async function({ api, event, Currencies }) {
  try {
    const allUser = await Currencies.getAll(['userID', 'money']);
    const sorted = allUser.sort((a, b) => b.money - a.money).slice(0, 20);

    let msg = `💎 𝗧𝗢𝗣 𝟮𝟬 𝗥𝗜𝗖𝗛𝗘𝗦𝗧 𝗨𝗦𝗘𝗥𝗦 💎\n━━━━━━━━━━━━━━━━━━━━━━━\n`;

    let index = 1;
    for (const user of sorted) {
      const name = await api.getUserInfo(user.userID)
        .then(res => res[user.userID].name)
        .catch(() => "Unknown User");

      const medal = index === 1 ? "🥇"
                  : index === 2 ? "🥈"
                  : index === 3 ? "🥉"
                  : "🏅";

      msg += `${medal} ${index.toString().padStart(2, '0')}. ${name}\n`;
      msg += `   💰 ${user.money.toLocaleString()} coins\n`;
      msg += `━━━━━━━━━━━━━━━━━━━━━━━\n`;

      index++;
    }

    msg += `👑 Keep earning to climb the ranks!`;

    return api.sendMessage(msg, event.threadID, event.messageID);
  } catch (err) {
    console.error(err);
    return api.sendMessage("⚠️ Error fetching leaderboard.", event.threadID, event.messageID);
  }
};
