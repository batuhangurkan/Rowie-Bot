const Discord = require ("discord.js");

exports.run = (client, message) => { 
const mhelp = new Discord.RichEmbed()
.setColor("#5ab1bb")
.setTitle("Moderasyon Komutları Sayfa 3")
.setThumbnail("https://i.imgur.com/JsgxK3Y.png")
.addField("!sayaç [#kanal]" , "Sayaç Sistemini Ayarlar.")
.addField("!sayaç-kapat" , "Sayaç Sistemini Kapatır.")
.addField("!sayaç-sustur [kullanıcı] [süre]" , "Kullanıcıyı Seslide Sustur.")
.addField("!sesli-çekiliş" , "Sesli Kanaldakiler Arasında Çekiliş Yapar.")
.addField("!sil [mesajsayısı]" , "Mesajları Siler.")
.addField("!yavaşmod [süre]" , "Kanalda Yavaş Mod Aktifleştirir.")
.addField("!snipe" , "Son Silinen Mesajı Gösterir.")
.addField("!soft-ban [kullanıcı]" , "SoftBan: Kullanıcıyı Banlar Ve Geri Banını Açar.")
.addField("!tempmute [kullanıcı] [süre]" , "Süreli Olarak Mute Atar.")
.addField("!mute-log-ayarla [#kanal]" , "Mute Log Kanalını Ayarlar.")
.addField("!çek [kullanıcı]" , "Kullanıcıyı Bulunduğunuz Sesli Kanala Çeker.")
.addField("!unban [kullanıcıid]" , "Kullanıcının Banını Açar.")
.addField("!unbanall" , "Tüm Banları Kaldırır.")
.addField("!unmute [kullanıcı]" , "Kullanıcının Mutesini Açar.")
.addField("!uyar [kullanıcı]" , "Kullanıcıyı Uyarır.")
.addField("!votekick [kullanıcı]" , "Kullanıcıy Oylama İle Kickler.")
.addField("!yaz [mesaj]" , "Bota Mesaj Yazdırırsınız.")
.addField("!çekiliş [çekilişyapılıcakmesaj]" , "Çekiliş Yapmaya Yarar.")
message.channel.sendEmbed(mhelp)


};
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: [], 
    permLevel: 0 
  };
  
  exports.help = {
    name: 'yardım-moderasyon-3', 
    description: 'The Help Command',
    usage: 'yardım-moderasyon-3'
  };