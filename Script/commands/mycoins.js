module.exports.config = {
  name: "coin",
  version: "1.1.0",
  hasPermssion: 0,
  credits: "Monsur Edit",
  description: "Check your current coin balance",
  commandCategory: "economy",
  usages: "[tag]",
  cooldowns: 5,
};

module.exports.run = async function({ api, event, Currencies }) {
  const { threadID, messageID, senderID, mentions } = event;

  let targetID = senderID;
  let name;

  // যদি ট্যাগ করে কাউকে
  if (Object.keys(mentions).length > 0) {
    targetID = Object.keys(mentions)[0];
    name = mentions[targetID].replace("@", "");
  } else {
    const userInfo = await api.getUserInfo(senderID);
    name = userInfo[senderID].name;
  }

  // টাকা পাওয়া
  const data = await Currencies.getData(targetID);
  const money = data.money || 0;

  // 🔥 Format function
  function formatMoney(amount) {
    if (amount < 1_000) return `${amount} coins`;
    if (amount < 1_000_000) return `${(amount / 1_000).toFixed(1)}K coins`;
    if (amount < 1_000_000_000) return `${(amount / 1_000_000).toFixed(2)}M coins`;
    return `${(amount / 1_000_000_000).toFixed(2)}B coins`;
  }

  const formatted = formatMoney(money);

  return api.sendMessage(
    `💰 ${name}'s balance: ${formatted}`,
    threadID,
    messageID
  );
};
