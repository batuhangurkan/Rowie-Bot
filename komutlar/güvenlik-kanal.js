const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async (bot, message, args) => {
  let açıkkapalı = await db.fetch(`FrenzyCodeGüvenlik_${message.guild.id}`)
  if(açıkkapalı) return message.reply(`Güvenlik Kanalı Zaten Ayarlı!`)
  
   let kanal = message.mentions.channels.first()
   if (!kanal) return message.channel.send(' Lütfen Bir Kanal Etiketleyiniz.')
   db.set(`FrenzyCodeGüvenlik_${message.guild.id}`, kanal.id)
   message.channel.send(`Güvenlik Kanalını Başarıyla ${kanal} Olarak Ayarlandım.`)
};
module.exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ["güvenlikayarla"],
  permLevel: 3
};
module.exports.help = {
  kategori:'moderasyon',
  name: 'güvenlik-ayarla'
};
