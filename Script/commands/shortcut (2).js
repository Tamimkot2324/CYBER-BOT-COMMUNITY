
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "shortcut",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "Modified by ChatGPT for Monsur",
  description: "Teach and use global message shortcuts",
  commandCategory: "system",
  usages: "[add/list/delete]",
  cooldowns: 5
};

module.exports.onLoad = function () {
  try {
    const file = path.resolve(__dirname, "cache", "shortcutdata.json");
    if (!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify([]));
    const data = JSON.parse(fs.readFileSync(file, "utf-8"));
    global.moduleData = global.moduleData || {};
    global.moduleData.shortcut = data;
  } catch (e) {
    console.error("❌ Shortcut loading error:", e);
  }
};

module.exports.handleEvent = async function ({ event, api }) {
  const { threadID, messageID, body } = event;
  const data = global.moduleData.shortcut || [];
  const match = data.find(i => i.input.toLowerCase() === body.toLowerCase());
  if (match) return api.sendMessage(match.output, threadID, messageID);
};

module.exports.handleReply = async function ({ event, api, handleReply }) {
  if (handleReply.author !== event.senderID) return;
  const file = path.resolve(__dirname, "cache", "shortcutdata.json");
  let data = JSON.parse(fs.readFileSync(file, "utf-8"));

  switch (handleReply.type) {
    case "requireInput": {
      if (data.find(i => i.input === event.body))
        return api.sendMessage("⚠️ এই ইনপুট আগে থেকেই আছে!", event.threadID, event.messageID);

      return api.sendMessage("✏️ এখন রিপ্লাই করে আউটপুট লেখো:", event.threadID, (_, info) => {
        global.client.handleReply.push({
          type: "final",
          name: module.exports.config.name,
          author: event.senderID,
          input: event.body,
          messageID: info.messageID
        });
      });
    }

    case "final": {
      const shortcut = {
        id: Math.random().toString(36).substring(2, 10),
        input: handleReply.input,
        output: event.body || "empty"
      };

      data.push(shortcut);
      global.moduleData.shortcut = data;
      fs.writeFileSync(file, JSON.stringify(data, null, 2));

      return api.sendMessage(`✅ শর্টকাট সংরক্ষিত:
🔑 Input: ${shortcut.input}
📤 Output: ${shortcut.output}`, event.threadID, event.messageID);
    }
  }
};

module.exports.run = async function ({ event, api, args }) {
  const { threadID, messageID, senderID } = event;
  const file = path.resolve(__dirname, "cache", "shortcutdata.json");
  let data = JSON.parse(fs.readFileSync(file, "utf-8"));

  switch (args[0]) {
    case "list":
    case "all": {
      if (!data.length) return api.sendMessage("⚠️ কোনো শর্টকাট সেট করা হয়নি!", threadID, messageID);
      const msg = data.map((i, idx) => `${idx + 1}. ${i.input} => ${i.output}`).join("\n");
      return api.sendMessage("📚 সমস্ত Global Shortcut:\n" + msg, threadID, messageID);
    }

    case "delete":
    case "remove": {
      const input = args.slice(1).join(" ");
      const index = data.findIndex(i => i.input === input || i.id === input);
      if (index === -1) return api.sendMessage("❌ shortcut খুঁজে পাওয়া যায়নি!", threadID, messageID);

      data.splice(index, 1);
      global.moduleData.shortcut = data;
      fs.writeFileSync(file, JSON.stringify(data, null, 2));
      return api.sendMessage("🗑️ শর্টকাট মুছে ফেলা হয়েছে!", threadID, messageID);
    }

    default: {
      return api.sendMessage("📥 শর্টকাট কীওয়ার্ড কী হবে? রিপ্লাই করে দাও।", threadID, (_, info) => {
        global.client.handleReply.push({
          type: "requireInput",
          name: module.exports.config.name,
          author: senderID,
          messageID: info.messageID
        });
      });
    }
  }
};
