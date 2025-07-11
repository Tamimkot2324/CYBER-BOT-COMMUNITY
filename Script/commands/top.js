module.exports.config = {
  name: "top",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Tamim",
  description: "Show top 20 richest users",
  commandCategory: "economy",
  usages: "[top]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, Currencies }) {
  const { threadID, messageID } = event;

  const allUsers = await Currencies.getAll(["userID", "money"]);
  const sorted = allUsers.sort((a, b) => b.money - a.money).slice(0, 20);

  let msg = "🏆 𝗧𝗢𝗣 𝟮𝟬 𝗥𝗜𝗖𝗛𝗘𝗦𝗧 𝗨𝗦𝗘𝗥𝗦 🏆\n━━━━━━━━━━━━━━━━━━━━━━━\n";
  let index = 1;

  for (const user of sorted) {
    let name = "Unknown User";
    try {
      const info = await api.getUserInfo(user.userID);
      name = info[user.userID]?.name || name;
    } catch (e) {}

    const medal = index === 1 ? "🥇" : index === 2 ? "🥈" : index === 3 ? "🥉" : "🏅";
    const moneyStr = user.money.toLocaleString();

    msg += `${medal} ${index.toString().padStart(2, "0")}. ${name}\n   💰 ${moneyStr} coins\n━━━━━━━━━━━━━━━━━━━━━━━\n`;
    index++;
  }

  msg += "👑 Keep grinding and earn more coins!";
  return api.sendMessage(msg, threadID, messageID);
};
