const Discord = require('discord.js'); 
const db = require("quick.db");
module.exports.run = async (bot, message, args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
let iUser = message.mentions.members.first() || message.author;
const embed = new Discord.RichEmbed()
.setColor(`#FF000`)
.setDescription(`<@${iUser.id}> kullanınıcın ID Numarası: **${iUser.id}**`)
message.channel.send(embed);
}
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ıdgöster"],
  permLevel: 0
};

module.exports.help = {
  name: "ıd",
  description: "Id Numaranızı gösterir.",
  usage: "ıd"
};