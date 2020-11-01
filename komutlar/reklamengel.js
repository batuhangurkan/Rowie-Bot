const Discord = require('discord.js');
const db = require('quick.db');
exports.run = async (client, message, args) => {
const code = message.mentions.channels.first() || message.channel
const frenzy = args[0]
if (!frenzy) return message.reply(`Reklam engel sistemini açmak için reklamengel aç #kanal veya reklam-engel aç yazmalsın!`)
 
  if (frenzy == 'aç') { 
  let açıkkapalı = await db.fetch(`reklamEngelFrenzy_${code.id}`)
  if(açıkkapalı) return message.reply(`Zaten reklam engel bu kanalda/belirttiğiniz kanalda aktif!`)
    
db.set(`reklamEngelFrenzy_${code.id}`,'açık')
message.reply(`Reklam engel sistemi başarıyla bu kanalda/belirttiğiniz kanalda aktif edildi!`)
  }
  
  if (frenzy == 'kapat') {
  let açıkkapalı = await db.fetch(`reklamEngelFrenzy_${code.id}`)
  if(!açıkkapalı) return message.reply(`Zaten Reklam engel bu kanalda/belirttiğiniz kanalda deaktif!`)
    
db.delete(`reklamEngelFrenzy_${code.id}`)
message.reply(`Reklam engel sistemi başarıyla bu kanalda/belirttiğiniz kanalda deaktif edildi!`)
}
};
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};
exports.help = {
  name: 'reklam-engel',
  kategori:'moderasyon',
  description: 'Frenzy Code',
  usage: 'Frenzy Code!'
}
