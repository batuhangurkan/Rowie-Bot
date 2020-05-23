const Discord = require('discord.js');
const db = require ("quick.db")
const cevaplar = [
    "Evet",
    "Hayır",
    "Belki",
];
exports.run = function(client, message, args) {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
    var soru = args.join(' ');
    var cevap = cevaplar[Math.floor(Math.random() * cevaplar.length)];
    if(!soru) return message.channel.sendEmbed(new Discord.RichEmbed().setColor('RANDOM').setAuthor('Hata').setDescription('Soru Giriniz'))
    else return message.channel.sendEmbed(new Discord.RichEmbed().setColor('RANDOM').setDescription(cevap).setAuthor('Cevap:'))

};  
exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 0 
};
exports.help = {
  name: '8ball', 
  description: 'Sorduğunuz Soruya Rastgele Cevap Verir.',
  usage: '8ball [soru]'
};
