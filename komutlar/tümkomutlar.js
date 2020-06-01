const Discord = require("discord.js");
//CodAre RuffLys#1006
module.exports.run = async (client, message, args) => {
  try {
    const commands = new Discord.RichEmbed()
    await message.channel.send(
      `**_Toplam Komut Sayısı:_**` +
        `\`${client.commands.size}\`` +
        `\n**Komutlar:** \n${client.commands
          .map(props => `\`${props.help.name}\``)
          .join(" | ")}`

    );
  } catch (e) {
    throw e;
  }
};//CodAre RuffLys#1006

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["tümkomutlar"],
  permLevel: 0
};//CodAre RuffLys#1006

module.exports.help = {
  name: "tüm-komutlar",
  description: "Bota eklenmiş tüm komutları listeler.",
  usage: "all-commands"
};//CodAre RuffLys#1006