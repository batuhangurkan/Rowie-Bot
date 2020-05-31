const Discord = require("discord.js")
const fs = require("fs")

exports.run = (bot, message) => {
    let profil = JSON.parse(fs.readFileSync("./jsonlar/snipe.json", "utf8"));
    if(!profil[message.guild.id]) {
      const embed = new Discord.RichEmbed();
      embed.setTitle(`**Snipe**`);
      embed.setColor('RANDOM')
      embed.addField(`Bilinmiyor!`, `\n\`\`\`Bilinmiyor!\`\`\``)
    message.channel.send({embed: embed});
    } else {
      if(profil[message.guild.id]) {
    const embed = new Discord.RichEmbed();
      embed.setTitle(`**Snipe**`);
      embed.setColor('RANDOM')
      embed.addField(`${profil[message.guild.id].isim}`, `\n\`\`\`${profil[message.guild.id].mesaj}\`\`\``)
    message.channel.send({embed: embed});
      }
    }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['s'],
  permLevel: 0
};

exports.help = {
  name: "snipe",
  kategori:'moderasyon',
  description: "En son silinen mesaji gosterir.",
  usage: "snipe"
};