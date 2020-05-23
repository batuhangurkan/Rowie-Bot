const Discord = require('discord.js');
const db = require("quick.db");
  const habboavatar = [
  "https://media.discordapp.net/attachments/618073962382884867/622098602780655616/images.png",
  "https://media.discordapp.net/attachments/618073962382884867/622098609306861568/2972009776.gif",
  "https://media.discordapp.net/attachments/618073962382884867/622098609667571735/2220098211.gif",
  "https://media.discordapp.net/attachments/618073962382884867/622098616076599296/254570346.gif",
  "https://cdn.discordapp.com/attachments/618073962382884867/622098618446381057/avatarimage.png",
  "https://cdn.discordapp.com/attachments/618073962382884867/622098622141562910/3635662995.gif",
  "https://cdn.discordapp.com/attachments/618073962382884867/622098623642992681/833002355.gif",
  "https://cdn.discordapp.com/attachments/618073962382884867/622098627984097292/l61448706252.gif",
  "https://cdn.discordapp.com/attachments/618073962382884867/622098629964070963/3786361634.gif",
  "https://cdn.discordapp.com/attachments/618073962382884867/622099576870141952/avatar.png",
  "https://cdn.discordapp.com/attachments/618073962382884867/622099581924016148/2590419572.gif"

 ]
  
exports.run = function(client, message, args) {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')

const habbo = habboavatar[Math.floor(Math.random() * habboavatar.length)];

message.channel.send(
new Discord.RichEmbed()  
  .setTitle("Gults - Habbo Avatar")
  .setImage(habbo)
  
  )
};

exports.conf = {
  enabled: true,//True => Komut açık, False => Komut kapalı 
  guildOnly: false, //True => Sadece Servere Özel, False => Heryerde kullanılabilir
  aliases: [],//Komutun farklı kullanımları ÖR: !ping, !p
  permLevel: 0 //kimlerin kullanabileceğini  (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name: 'habboavatar',//Komutun adı (Komutu girerken lazım olucak)
  description: 'Bot size rastgele habbo avatarı atar',//Komutun Açıklaması
  kategori: 'eğlence',// Komutun olduğu kategori. kategoriler: bot-yetkili-ayarlar-kullanıcı-eğlence
  usage: 'habboavatar' //komutun kullanım şekli; ÖR: !ban @Kullanıcı
}