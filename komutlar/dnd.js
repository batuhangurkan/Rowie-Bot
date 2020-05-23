const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client,message,args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
    
var OGON = message.guild.members.find("id", "267604752764764160");
if(message.member !== OGON)return message.channel.send("Bu komutu kullanmak için uygun izniniz yok.");
if(OGON) {
client.user.setStatus("dnd");
message.channel.send('Durum **Rahatsız Etmeyin** olarak değiştirildi.');
}


}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

module.exports.help = {
  name: 'dnd',
  description: 'Rastgele tavşan resmi gönderir.',
  usage: 'dnd'
};
//XiR