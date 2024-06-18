const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  group: "info",
  aliases: ["pong"],
  cooldown: 2,
  description: "Xem độ trễ của bot",
  usage: "prefix + ping",
  async execute(client, message, args) {
    const emoji = {
      Tốt : "<:green:1252306549632798730>",
      Ổn : "<:yellow:1252306597401722890>",
      Tệ : "<:red:1252306491138900111>"
    }

    const ws = client.ws.ping;
    const api = new Date() - new Date(message.createdTimestamp);
    const uptime = client.secondsToDhms(Math.floor(client.uptime / 1000));

    const wsEmoji = ws < 100 ? emoji.Tốt : ws < 200 ? emoji.Ổn : emoji.Tệ;
    const apiEmoji = api < 500 ? emoji.Tốt : api < 1000 ? emoji.Ổn : emoji.Tệ;

    const embed = new EmbedBuilder()
      .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setColor(client.c.fvr)
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .addFields(
        {
          name: "<:bot:1252307222042775703> Tin nhắn phản hồi",
          value: `${apiEmoji} ${api}`,
          inline: true
        },
        {
          name: "<:web:1252307321359433889> WebSocket",
          value: `${wsEmoji} ${ws}`,
          inline: true
        },
        {
          name: "<:green:1252306549632798730> Uptime",
          value: uptime
        }
      )
      .setTimestamp();

    await message.channel.send({ content: "🏓 Pong!!!", embeds: [embed] })
  }
}
