module.exports.config = {
  name: "top",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Monsur",
  description: "Show top 20 richest users",
  commandCategory: "economy",
  usages: "[top]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, Currencies }) {
  const { threadID, messageID } = event;

  const allUsers = await Currencies.getAll(['userID', 'money']);
  const sorted = allUsers.sort((a, b) => b.money - a.money).slice(0, 20);

  let msg = `🏆 𝗧𝗢𝗣 𝟮𝟬 𝗥𝗜𝗖𝗛𝗘𝗦𝗧 𝗨𝗦𝗘𝗥𝗦 🏆\n━━━━━━━━━━━━━━━━━━━━━━━\n`;

  let i = 1;
  for (const user of sorted) {
    const name = await api.getUserInfo(user.userID)
      .then(res => res[user.userID].name)
      .catch(() => "Unknown User");

    const medal = i === 1 ? "🥇" : i === 2 ? "🥈" : i === 3 ? "🥉" : "🏅";
    msg += `${medal} ${i.toString().padStart(2, '0')}. ${name}\n   💰 ${user.money.toLocaleString()} coins\n━━━━━━━━━━━━━━━━━━━━━━━\n`;
    i++;
  }

  msg += "👑 Keep earning to climb the ranks!";
  return api.sendMessage(msg, threadID, messageID);
};