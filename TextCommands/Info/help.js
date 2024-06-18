const { EmbedBuilder } = require("discord.js")
const fs = require("node:fs");

module.exports = {
  name: "help",
  group: "info",
  aliases: [],
  cooldown: 0,
  description: "Xem tất cả những lệnh khả dụng của bot",
  usage: "{prefix}help <tên >",
  bperms: ["EmbedLinks", "AttachFiles"],
  async execute(client, message, args, prefix) {
    const ignoredDir = [
      "Dev"
    ];
    if (!args[0]) {
      const categories = fs.readdirSync("./TextCommands/")
        .filter((dir) => !ignoredDir.includes(dir))
        .map((dir) => {
          const commands = fs.readdirSync(`./TextCommands/${dir}/`).filter((file) => file.endsWith(".js"));
          const cmds = commands
            .map((command) => {
              const file = require(`../../TextCommands/${dir}/${command}`);
              if (!file.hidden) {
                const name = file.name.replace(".js", "");
                return `\`${name}\``;
              }
            })
            .filter((cmd) => cmd !== undefined);

          return {
            name: `<a:mail:1246803808026103960> ${dir}`,
            value: cmds.length === 0 ? "In progress." : cmds.join(" "),
          };
        });

      const embed = new EmbedBuilder()
      .setTitle("Danh Sách Lệnh Của Bot")
      .setDescription(`Prefix của bot là **`${prefix}`**`)
      .setColor(client.c.fvr)
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .addFields(categories)
      .setFooter({ text: "Bé Bún Cute", iconURL: `https://media.discordapp.net/attachments/1236580619283075103/1252307927876767794/1246437179647856671.gif?ex=6671be24&is=66706ca4&hm=995f0e349b24ecf245868c354db712842a734b4a1432b32c02ccc6a68ed6305f&=&width=192&height=177` })
      .setTimestamp();
      await message.reply({ embeds: [embed] })
    }
    else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));

      if (!command || command.group === "dev") {
        return client.deleteMsg(message, `${client.e.error} Lệnh không hợp lệ! Sử dụng \`${client.prefix}help\` cho tất cả các lệnh của tớ!`, 5000, "reply")
      }
      const embed = new EmbedBuilder()
      .setTitle(`Tên lệnh: ${command.name}`)
      .setColor("#D2F3C3")
      .addFields(
        {
            name: "Aliases:",
            value: command.aliases
              ? `\`${command.aliases && command.aliases.length > 0 ? command.aliases.join("` `") : 'Không có'}\``
              : "Không có"
          },
          {
            name: "Usage:",
            value: command.usage
              ? `\`${command.usage.replace(/{prefix}/g, client.prefix)}\``
              : `\`${client.prefix}${command.name}\``
          },
          {
            name: "Description:",
            value: command.description
              ? command.description
              : "Không có mô tả cho lệnh này."
          }
      )
      .setFooter({ text: `Được yêu cầu bởi ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
      .setTimestamp()
      await message.reply({ embeds: [embed] })
    }
  }
}

