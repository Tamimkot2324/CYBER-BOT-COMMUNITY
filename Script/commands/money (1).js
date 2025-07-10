module.exports.config = {
  name: "money",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Monsur",
  description: "Check your or someone's coin balance",
  commandCategory: "economy",
  usages: "[tag or uid]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args, Currencies, mentions }) {
  const { threadID, senderID, messageID } = event;

  let userID = senderID;
  let name = "Your";

  if (Object.keys(mentions).length > 0) {
    userID = Object.keys(mentions)[0];
    name = mentions[userID].replace("@", "") + "'s";
  }

  const data = await Currencies.getData(userID);
  const money = data?.money || 0;

  function formatMoney(amount) {
    if (amount < 1_000) return `${amount} coins`;
    if (amount < 1_000_000) return `${(amount / 1_000).toFixed(1)}K coins`;
    if (amount < 1_000_000_000) return `${(amount / 1_000_000).toFixed(2)}M coins`;
    return `${(amount / 1_000_000_000).toFixed(2)}B coins`;
  }

  return api.sendMessage(`💰 ${name} balance: ${formatMoney(money)}`, threadID, messageID);
};