const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "donate",
  group: "Dev",
  aliases: ["dnt"],
  cooldown: 2,
  description: "Xem Info donate",
  usage: "prefix + donate",
  async execute(client, message, args) {
    const emoji = {
      Tốt : "<:green:1252306549632798730>",
      Ổn : "<:yellow:1252306597401722890>",
      Tệ : "<:red:1252306491138900111>"
    }

    const embed = new EmbedBuilder()
      .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setColor(client.c.fvr)
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .addFields(
        {
          name: "<:mbbank:1132201851945766913> __**TRAN LE MINH KHOI**__",
          value: `**89922999999**`,
          inline: true
        },
        {
          name: "<:momo:1132202298689454101> __**NGUYỄN HOÀNG THANH TRÚC**__",
          value: `**0585683400**`,
          inline: true
        },
      )
      .setTimestamp();

    await message.channel.send({ content: "**INFO DONATE**", embeds: [embed] })
  }
}
