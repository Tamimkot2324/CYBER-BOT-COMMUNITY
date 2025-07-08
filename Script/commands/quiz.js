const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "quiz",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "ChatGPT-Bangla",
  description: "বাংলা কুইজ খেলুন এবং পুরস্কার জিতুন!",
  commandCategory: "game",
  usages: "",
  cooldowns: 5
};

let questions = [];
const session = new Map();

module.exports.onLoad = function () {
  const file = path.resolve(__dirname, "cache", "quiz_bank.json");
  if (!fs.existsSync(file)) return console.error("❌ কুইজ প্রশ্ন ফাইল পাওয়া যায়নি!");
  questions = JSON.parse(fs.readFileSync(file, "utf-8"));
  console.log(`✅ Loaded ${questions.length} quiz questions.`);
};

module.exports.run = async function ({ api, event }) {
  const { senderID, threadID, messageID } = event;
  if (!questions.length) return api.sendMessage("❌ প্রশ্ন লোড হয়নি।", threadID, messageID);

  const quiz = questions[Math.floor(Math.random() * questions.length)];
  const text = `🎯 প্রশ্ন:\n${quiz.question}\n\n` +
               quiz.options.map((opt, i) => `${i + 1}. ${opt}`).join("\n") +
               "\n\n✏️ উত্তর দিতে শুধু অপশন নম্বর লিখুন (1-4)।";

  session.set(senderID, {
    answer: quiz.answer,
    timeout: setTimeout(() => session.delete(senderID), 60 * 1000)
  });

  return api.sendMessage(text, threadID, messageID);
};

module.exports.handleReply = async function ({ event, api, Currencies }) {
  const { senderID, body, threadID, messageID } = event;
  if (!session.has(senderID)) return;

  const userAns = parseInt(body.trim());
  if (isNaN(userAns) || userAns < 1 || userAns > 4)
    return api.sendMessage("⚠️ ১ থেকে ৪ এর মধ্যে একটি নম্বর দিন।", threadID, messageID);

  const data = session.get(senderID);
  clearTimeout(data.timeout);
  session.delete(senderID);

  if (userAns === data.answer) {
    const rewardXP = 50, rewardMoney = 2000;
    await Currencies.increaseMoney(senderID, rewardMoney);
    await Currencies.increaseExp(senderID, rewardXP);
    return api.sendMessage(`✅ সঠিক উত্তর!\n🎁 আপনি পেয়েছেন:\n+💸 ${rewardMoney} টাকা\n+⭐ ${rewardXP} XP`, threadID, messageID);
  } else {
    return api.sendMessage(`❌ ভুল উত্তর! সঠিক উত্তর ছিল অপশন ${data.answer}`, threadID, messageID);
  }
};
