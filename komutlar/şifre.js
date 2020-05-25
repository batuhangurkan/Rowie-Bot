const Discord = require('discord.js');
const generator = require('generate-password');
const db = require("quick.db");

exports.run = function(client, message, args) {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
    var uzunluk = args.slice(0).join(' ');

    if (!uzunluk) return message.reply('Bir uzunluk belirt. **Doğru Kullanım**: !şifre <uzunluk>')



    var password = generator.generate({
        length: uzunluk,
        numbers: true,
    })

    message.channel.send(password);
};  

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'şifre', 
  description: 'Rastgele bir şifre oluşturur.**Doğru Kullanım**: !şifre <uzunluk>',
  kategori:'genel',
  usage: 'şifre <uzunluk>'
};
//XiR - NOX