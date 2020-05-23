const Discord = require(`discord.js`);
const db = require("quick.db");
exports.run = (client, message, args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
 let mesaj = args.slice(0).join(' ');
 let member = message.mentions.members.first();
 let body = 'https://mc-heads.net/body/' + mesaj
 if (mesaj.length < 1) return message.reply('bir oyuncu adı belirtmelisin.');
 if (mesaj == member) {
    message.reply('kullanıcı değil, bir oyuncu adı belirtmelisin :/')
 } else {
 const mcbody = new Discord.RichEmbed()
   .setColor('#ffa200')
   .setTitle('Oyuncu: ' + mesaj)
   .setImage(body)
 message.channel.send(mcbody);
 }
};

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permLevel: 0,
 kategori: "eğlence" //Komutun kategorisini belirtiyoruz
};

exports.help = {
 name: 'mcskin',
 description: 'Belirtilen oyuncunun kostümünü gösterir.',
 usage: 'mcbody <oyuncu>'
};