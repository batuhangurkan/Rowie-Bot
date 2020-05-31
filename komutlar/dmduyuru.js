const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {
if(message.author.id !== ayarlar.sahip) return
  let mesaj = args.slice(0).join(' ');
if (mesaj.length < 1) return message.channel.send('Bir Şey Yazmalısınız');
  message.delete();
 client.users.forEach(frenzy => {
frenzy.send(mesaj)
})
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel:0 
};

exports.help = {
  kategori:'moderasyon',
  name: 'dmduyuru'
};