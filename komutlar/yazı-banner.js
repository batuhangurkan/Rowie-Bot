const Discord = require('discord.js');
const db = require("quick.db");
module.exports.run = async (client, message, args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
  let txt = args.join('+');
  if(!args[0]) return message.channel.send("Lütfen yazı yazın!");
  
  let embed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setAuthor("Banner!")
  .setImage("https://dummyimage.com/2000x500/33363c/ffffff&text=" + txt)
  .setFooter("Banner Oluşturuldu!");
  
  message.channel.send(embed);
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["banneryazı","yazıbanner","banneryaz"],
  permLevel: 0
};

module.exports.help = {
  name: 'yazı-banner',
  description: 'Yazdığınız yazıyı banner olarak atar',
  usage: 'yazıb <yazdırmak istediğiniz yazı>'
};
//XiR