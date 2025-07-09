module.exports.config = {
  name: "setcoins",
  version: "1.0.0",
  hasPermssion: 2, // 🛡️ শুধু admin ইউজ করতে পারবে
  credits: "Monsur Edit",
  description: "Set any user's coin balance manually",
  commandCategory: "economy",
  usages: "[tag or uid] [amount]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args, Currencies, mentions }) {
  const { threadID, messageID } = event;

  let targetID;
  let nameTarget;

  // ✅ ট্যাগ করা ইউজার
  if (Object.keys(mentions).length > 0) {
    targetID = Object.keys(mentions)[0];
    nameTarget = mentions[targetID].replace("@", "");
  }
  // ✅ UID দিয়ে
  else if (!isNaN(args[0])) {
    targetID = args[0];
    nameTarget = `User (${targetID})`;
  } 
  else {
    return api.sendMessage("❌ Please tag a user or provide a valid UID.", threadID, messageID);
  }

  // ✅ এমাউন্ট validate
  const amount = parseInt(args[args.length - 1]);
  if (isNaN(amount) || amount < 0) {
    return api.sendMessage("❌ Please provide a valid amount.", threadID, messageID);
  }

  try {
    await Currencies.setData(targetID, { money: amount });
    return api.sendMessage(`✅ Set ${nameTarget}'s coin balance to ${amount} coins.`, threadID, messageID);
  } catch (err) {
    console.error(err);
    return api.sendMessage("⚠️ Failed to set coins. Please try again.", threadID, messageID);
  }
};
