module.exports.config = {
  name: "setmoney",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Tamim",
  description: "Set someone’s coin balance",
  commandCategory: "economy",
  usages: "[tag or uid] [amount]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args, Currencies, mentions }) {
  const { threadID, messageID } = event;

  let userID, name;
  if (Object.keys(mentions).length > 0) {
    userID = Object.keys(mentions)[0];
    name = mentions[userID].replace("@", "");
  } else {
    userID = args[0];
    name = `User (${userID})`;
  }

  const amount = parseInt(args[args.length - 1]);
  if (isNaN(amount) || amount < 0) return api.sendMessage("❌ Invalid amount.", threadID, messageID);

  await Currencies.setData(userID, { money: amount });
  return api.sendMessage(`✅ Set ${name}'s balance to ${amount} coins.`, threadID, messageID);
};