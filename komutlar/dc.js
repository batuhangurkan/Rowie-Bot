const Discord = require('discord.js');
const db = require("quick.db");

exports.run = async (bot, message, args) => { if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
var dogruluk = [
"**Hiç Sevgilin oldu mu?**",
"**Diktatör olsaydınız, ilk önce hangi yasayı düzenlerdiniz?**",
"**Hayatının en büyük hatası neydi?**",
"**Şimdiye kadar yaptığın en kötü şey nedir?**",
"**Eğer bir vampir olsaydın, şimdi kim ısırırdın?**",
"**Şu ana kadar yaptığın en cesur şey nedir?**",
"**En çok ne kadar uyumayı hayal ediyorsun?**",
"**Hala yaptığın çocukça bir şey nedir?**",
"**Hangi suçu işledin?**",
"**En kötü sepetiniz neydi?**",
"**Her zaman sadık mısın?**",
"**Yaşın kaç?**"
];
  
var cesaret = [
"**Sunucu sahibine söyle seni banlasın.**",
"**Sunucuda bir üyeye seni seviyorum de**",
"**Bulunduğun bütün sunuculardan çık**",
"**Sunucudaki birisine sevgililik teklif et**",
"**Sunucudaki adminlere adam olun de**",
"**Discord adını ben malım yap**",
"**Bir sunucuya gir ve ilk gördüğün mesajın sabihine adam ol de**",
"**Sunucun varsa sunucunu sil**",
"**Sunucun varsa duyuru kanalında 10 kere everyone çek**",
"**Adını: Bunu okuyan tosun, Okuyana kosun yap**",
"**Real fotonu at.**"
];
  
const dogru = dogruluk[Math.floor(Math.random() * dogruluk.length)];
const ceza = cesaret[Math.floor(Math.random() * cesaret.length)];
if (!args[0]) return message.channel.send(
new Discord.RichEmbed()
  .setTitle(":warning: Hata")
  .setDescription("**Doğruluk mu?** yoksa **Cesaret mi?** Seç bakalım :)")
  .setTimestamp()
  .setColor("RANDOM")
)

let cevp;
    
    
if (args[0] === "cesaret") {
 cevp = (ceza)
}
if (args[0] === "doğruluk") {
  cevp = (dogru)
}


message.channel.send(
new Discord.RichEmbed()
  .setDescription(cevp)
  .setColor("RANDOM")
  .setTimestamp()
  )
};

exports.conf = {
  enabled: true,//True => Komut açık, False => Komut kapalı 
  guildOnly: false, //True => Sadece Servere Özel, False => Heryerde kullanılabilir
  aliases: [],//Komutun farklı kullanımları ÖR: !ping, !p
  permLevel: 0 //kimlerin kullanabileceğini  (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name: 'dc',//Komutun adı (Komutu girerken lazım olucak)
  description: 'Doğruluk mu? Cesaret mi? Oynatır',//Komutun Açıklaması
  kategori: 'eğlence',// Komutun olduğu kategori. kategoriler: bot-yetkili-ayarlar-kullanıcı-sunucu-eğlence-efektcerceve
  usage: 'dc' //komutun kullanım şekli; ÖR: !ban @Kullanıcı
}