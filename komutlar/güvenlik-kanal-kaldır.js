const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async (bot, message, args) => {
  let açıkkapalı = await db.fetch(`FrenzyCodeGüvenlik_${message.guild.id}`)
  if(!açıkkapalı) return message.reply(`Güvenlik Kanalı Zaten Ayarlı Değil!`)
  
db.delete(`FrenzyCodeGüvenlik_${message.guild.id}`)
message.reply(' Güvenlik Kanalı Başarıyla Sıfırlandı.')
  
};
module.exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ["güvenlikkaldır"],
  permLevel: 3
};
module.exports.help = {
  kategori:'moderasyon',
  name: 'güvenlik-kaldır',
};
