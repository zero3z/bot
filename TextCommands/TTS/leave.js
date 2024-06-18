const { joinVoiceChannel } = require("@discordjs/voice") 

module.exports = {
  name: "leave",
  group: "tts",
  aliases: ["dc", "disconnect"],
  cooldown: 0,
  description: "Cho bot rời khỏi kênh voice của bạn",
  usage: "prefix + leave",
  bperms: ["Connect"],
  async execute(client, message, args) {
   const channel = message.member.voice.channel
    if (!channel) {
      return client.deleteMsg(message, `${client.e.error} Vào phòng voice để sử dụng lệnh`, 5000, "reply");
    }
    if (!message.guild.members.me.voice.channel) {
      return client.deleteMsg(message, `${client.e.error} Bot không trong kênh thoại`, 5000, "reply");
    }
    if (message.guild.members.me.voice.channelId !== message.member.voice.channelId) {
      return client.deleteMsg(message, `${client.e.error} Bạn phải ở cùng kênh thoại với bot để dùng lệnh`);
    }

    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    })
    await message.react(client.e.success)
    connection.destroy()
  }
}
