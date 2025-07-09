module.exports.config = {
  name: "setcoin",
  version: "1.0.0",
  hasPermssion: 2, // শুধু অ্যাডমিন পারবে
  credits: "Monsur Edit",
  description: "Set someone's coin balance manually",
  commandCategory: "economy",
  usages: "[tag or uid] [amount]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args, Currencies }) {
  const { threadID, messageID, mentions } = event;

  let targetID, nameTag;

  // ✅ ১. যদি কেউকে tag করে
  if (Object.keys(mentions).length > 0) {
    targetID = Object.keys(mentions)[0];
    nameTag = mentions[targetID].replace("@", "");
  } 
  // ✅ ২. না হলে ধরে নিচ্ছে uid দিলো
  else {
    targetID = args[0];
    nameTag = "User";
  }

  // ✅ ৩. টাকা validate
  const amount = parseInt(args[args.length - 1]);
  if (isNaN(amount) || amount < 0) {
    return api.sendMessage("❌ Please provide a valid amount to set.", threadID, messageID);
  }

  // ✅ ৪. টাকা সেট করা
  try {
    await Currencies.setData(targetID, { money: amount });
    return api.sendMessage(`✅ Successfully set ${nameTag}'s balance to ${amount} coins.`, threadID, messageID);
  } catch (err) {
    console.error(err);
    return api.sendMessage("⚠️ Failed to set balance. Please try again.", threadID, messageID);
  }
};
