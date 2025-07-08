module.exports.config = {
  name: "money",
  version: "1.0.4",
  hasPermssion: 0,
  credits: "Mirai Team (Modified by ChatGPT)",
  description: "Check balance with formatted value",
  commandCategory: "economy",
  usages: "[Tag]",
  cooldowns: 5
};

module.exports.languages = {
  "bn": {
    "sotienbanthan": "🔐 আপনার ব্যালেন্স: %1\n💵 $%2",
    "sotiennguoikhac": "💰 %1 এর ব্যালেন্স: %2\n💵 $%3"
  }
}

// Format number to K, M, B
function formatMoney(value) {
  value = parseFloat(value);
  if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(2) + "B";
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(2) + "M";
  if (value >= 1_000) return (value / 1_000).toFixed(1) + "K";
  return value.toString();
}

module.exports.run = async function({ api, event, args, Currencies, getText }) {
  const { threadID, messageID, senderID, mentions } = event;

  // নিজের টাকা
  if (!args[0]) {
    const money = (await Currencies.getData(senderID)).money || 0;
    const formatted = formatMoney(money);
    return api.sendMessage(getText("sotienbanthan", formatted + "৳", money.toLocaleString()), threadID, messageID);
  }

  // অন্যের টাকা
  else if (Object.keys(mentions).length == 1) {
    const mentionID = Object.keys(mentions)[0];
    const name = mentions[mentionID].replace(/@/g, "");
    const money = (await Currencies.getData(mentionID)).money || 0;
    const formatted = formatMoney(money);

    return api.sendMessage({
      body: getText("sotiennguoikhac", name, formatted + "৳", money.toLocaleString()),
      mentions: [{ tag: name, id: mentionID }]
    }, threadID, messageID);
  }

  else return global.utils.throwError(this.config.name, threadID, messageID);
};
