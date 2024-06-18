const { evaluate } = require("mathjs");

module.exports = {
  name: "math",
  group: "util",
  aliases: [],
  cooldown: 10,
  description: "Tính toán giúp bạn",
  usage: "prefix + math <phép tính>",
  async execute(client, message, args) {
    const math = args.join(" ");
    if (!math) return client.deleteMsg(message, `${client.e.error} Vui lòng nhập phép tính hợp lệ`, 5000, "reply")
    try {
      const result = evaluate(math)
      await message.reply(`<a:mail:1246803808026103960> | **${message.member.user.username}, Kết quả là: __${result}__  **`)
    } catch(e) {
      return client.deleteMsg(message, `${client.e.error} Vui lòng nhập phép tính `, 5000, "reply")
    }
  },
};
