const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (bot, message, args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
    let hex = Math.floor(Math.random() * 16777216).toString(16);

   let embed = new Discord.RichEmbed()
        .setColor(hex)
        .setThumbnail(`https://www.colorhexa.com/${hex}.png`)
        .addField("Rastgele Renk:", "#" + hex.toUpperCase());
    return message.channel.send(embed);
}
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["rastgeler","rastgelerenk"],
  permLevel: 0
};

module.exports.help = {
  name: 'rrenk',
  description: 'rastgele renk gönderir',
  usage: 'rrenk'
};