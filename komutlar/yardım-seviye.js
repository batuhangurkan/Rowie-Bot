const Discord = require ("discord.js");

exports.run = (client, message) => { 
const mhelp = new Discord.RichEmbed()
.setColor("#5ab1bb")
.setTitle("Seviye Sistemi Komutları")
.setThumbnail("https://i.imgur.com/JsgxK3Y.png")
.setTitle(" Seviye Sistemi Komutları ")
.addField("!seviye","Seviyeni Görebilirsin!")
.addField(" !seviye (random kişi) " , "Sunucu İçinde Etiketlediğin Kişinin Seviyesini Görürsün.")
.addField(" !seviyeyardım " , "Seviye Yardım Komutlarını Gösterir.")
message.channel.sendEmbed(mhelp)


};
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: [], 
    permLevel: 0 
  };
  
  exports.help = {
    name: 'yardım-seviye', 
    description: 'The Help Command',
    usage: 'yardım-seviye'
  };