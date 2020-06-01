const Discord = require('discord.js'),
      db = require('quick.db'),
      ayarlar = require('../ayarlar.json'),
      prefix = ayarlar.prefix
exports.run = async (client, message, args) => {
  
const ibrahim = message.mentions.channels.first()
if(!ibrahim) return message.reply(`Lütfen bir kanal etiketle!`)
  
await db.set(`FrenzyGörselKanal_${message.guild.id}`,ibrahim.id)  
  
message.reply(`Sadece görsel atılabilir kanalını ${ibrahim} olarak ayarladım.`)
};
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};
exports.help = {
  name: 'görselkanal',
  description: 'Frenzy Code',
  usage: 'görselkanal #kanal'
};
