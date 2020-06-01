const Discord = require ("discord.js");

exports.run = (client, message) => { 
const mhelp = new Discord.RichEmbed()
.setColor("#5ab1bb")
.setTitle("Moderasyon Komutları Sayfa 2")
.setThumbnail("https://i.imgur.com/JsgxK3Y.png")
.addField("!hazır-kanallar" , "Sunucuda Gerekli Hazır Kanalları Yaratır.")
.addField("!herkeserolver [@rol]" , "Herkese Belirttiğiniz Rolü Verir.")
.addField("!herkesdenrolal" , "Herkesten Belirttiğiniz Rolü Alır.")
.addField("!hgbb-ayarla [#kanal]" , "Resimsiz Hoşgeldin-BB Kanalını Ayarlar.")
.addField("!kilit [#kanal] [süre] " , "Belirttiğiniz Kanalı Belirttiğiniz Süre Kadar Kilitler.")
.addField("!kick [kullanıcı] " , "Kullanıcıyı Sunucudan Atar.")
.addField("!küfürengel (aç/kapat)" , "Küfür Engel Sistemini Açar.")
.addField("!mute [kullanıcı] " , "Kullanıcıyı Sunucuda Muteler.")
.addField("!otorol [@rol] [#kanal]" , "Otorol Sistemini Aktif Eder.")
.addField("!otorolkapat" , "Otorol Sistemini Kapatır.")
.addField("!oylama" , "Oylama Yapar.")
.addField("!random" , "Sunucuda Herhangi Bir Kişiyi Çıkarır(Çekiliş İçin Kullanılabilir.).")
.addField("!reklamengel (aç/kapat)" , "Reklam Engel Sistemini Açar.")
.addField("!reklamkick (aç/kapat)" , "Reklam Kick Özelliğini Açar.")
.addField("!resimlihg-ayarla [#kanal]" , "Resimli Hoş Geldin Sistemini Ayarlar.")
.addField("!rol-koruma (aç/kapat)" , "Rol Koruma Sistemini Açar.")
.addField("!sa-as (aç/kapat)" , "Selam Sistemini Açar.")
message.channel.sendEmbed(mhelp)


};
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: [], 
    permLevel: 0 
  };
  
  exports.help = {
    name: 'yardım-moderasyon-2', 
    description: 'The Help Command',
    usage: 'yardım-moderasyon-2'
  };