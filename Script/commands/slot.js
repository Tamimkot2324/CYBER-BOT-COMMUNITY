module.exports.config = {
  name: "slot",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Tamim",
  description: "Play slot machine and win coins",
  commandCategory: "economy",
  usages: "[bet amount]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args, Currencies }) {
  const { threadID, senderID, messageID } = event;

  const bet = parseInt(args[0]);
  if (isNaN(bet) || bet <= 0) return api.sendMessage("❌ Please enter a valid bet amount.", threadID, messageID);

  const userData = await Currencies.getData(senderID);
  const balance = userData.money || 0;

  if (balance < bet) return api.sendMessage("😢 You don't have enough coins to bet.", threadID, messageID);

  const slots = ["🍒", "🍋", "🍊", "🍇", "🍉"];
  const result = [slots[Math.floor(Math.random() * slots.length)],
                  slots[Math.floor(Math.random() * slots.length)],
                  slots[Math.floor(Math.random() * slots.length)]];

  let win = false;
  if (result[0] === result[1] && result[1] === result[2]) win = true;

  const message = `🎰 SLOT MACHINE 🎰\n─────────────\n| ${result.join(" | ")} |\n─────────────\n` +
    (win ? `🎉 You won ${bet * 2} coins!` : `😢 You lost ${bet} coins.`);

  await Currencies.setData(senderID, {
    money: win ? balance + bet : balance - bet
  });

  return api.sendMessage(message, threadID, messageID);
};