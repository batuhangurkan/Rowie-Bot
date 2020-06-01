const Discord = require ("discord.js");

exports.run = (client, message) => { 
const mhelp = new Discord.RichEmbed()
.setColor("#5ab1bb")
.setTitle("Moderasyon Komutları Sayfa 1")
.setThumbnail("https://i.imgur.com/JsgxK3Y.png")
.addField("!afk (sebep)", "Sunucuda Afk Olursunuz Ve Biri Sizi Etiketlerse Bot Otomatik Olarak Girdiğiniz Sebebi Gösterir.")
.addField("!anket (konu,mesaj)", "Bulunduğunuz Kanalda Anket Oluşturursunuz.")
.addField("!anti-spam [aç/kapat]" , "Bulunduğunuz Kanalda Anti-Spam Özelliğini Aktif Eder.")
.addField("!bot-izin [botid]", "Anti-Raid Özelliği Aktif Edilmiş İse Botu Sunucuya Yeniden Almak İçin Kullanılır.")
.addField("!ban [kullanıcı] (sebep)", "Kullanıcıyı Sunucudan Banlar.")
.addField("!banlananlar" , "Sunucudan Banlananları Gösterir.")
.addField("!başvuru", "Başvuru Yapmak İçin Kullanılır.")
.addField("!bot-isim [botetiket] [yenisim]", "Sunucunuzda Bot İsimlerini Değiştirir.")
.addField("!capslock-engelleme (aç/kapat)", "Kanalda Büyük Harf Kullanımını Engeller.")
.addField("!davet-sıralaması", "Sunucuda En Çok Davet Yapan Kişileri Gösterir.")
.addField("!üyemesaj [kullanıcı]" , "Kullanıcıya Bot Tarafından Mesaj Gönderilir.")
.addField("!dmduyuru" , "Özel Mesajdan Duyuru Yapar.")
.addField("!duyuru (duyuru mesajı)" , "Bulunduğunuz Kanalda Duyuru Yapar.")
.addField("!embedliyaz [mesaj]" , "Kanala Embedli Yazı Yazar.")
.addField("!emojiekle [link]" , "Sunucuya Link İle Emoji Ekler.")
.addField("!forceban [id]" , "Id İle Ban Atar.")
.addField("!güvenlik-ayarla [#kanalismi]" , "Güvenlik Kanalı Ayarlar.")
.addField("!güvenlik-kaldır [#kanalismi]" , "Güvenlik Kanalını Siler.")
message.channel.sendEmbed(mhelp)


};
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: [], 
    permLevel: 0 
  };
  
  exports.help = {
    name: 'yardım-moderasyon-1', 
    description: 'The Help Command',
    usage: 'yardım-moderasyon-1'
  };