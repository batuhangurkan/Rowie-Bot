const Discord = require('discord.js'),
      db = require('quick.db'),
      ayarlar = require('../ayarlar.json'),
      prefix = ayarlar.prefix
exports.run = async (client, message, args) => {
  
const frenzy_sayı = args[1]
const frenzy_kanal = message.mentions.channels.first()
if(!frenzy_sayı || !frenzy_kanal) return message.reply(`Sayaç Sistemini Ayarlamak İçin Lütfen Sayı ve Kanal Belirtiniz. **Örn** : \`${prefix}sayaç #kanal 100\``)
if(isNaN(frenzy_sayı)) return message.reply(`Sayaç Sistemini Ayarlamak İçin Sayıyı Sadece Rakamlardan Yazmalısın!`)
  
await db.set(`FrenzyCode+SayaçSayı_${message.guild.id}`,frenzy_sayı)  
await db.set(`FrenzyCode+SayaçKanal_${message.guild.id}`,frenzy_kanal.id)  
  
message.reply(`Sayaç Başarıyla Ayarlandı!`)
};
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};
exports.help = {
  name: 'sayaç',
  kategori:'moderasyon',
  description: 'Sayaç Sistemi - Frenzy Code',
  usage: 'sayaç <sayı> <#kanal>'
};
