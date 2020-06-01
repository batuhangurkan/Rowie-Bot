const Discord = require('discord.js');
const db = require('quick.db');
exports.run = async (client, message, args) => {
const code = message.mentions.channels.first() || message.channel
const frenzy = args[0]
if (!frenzy) return message.reply(`Küfür engel sistemini açmak için küfürengel aç #kanal veya küfürengel aç yazmalsın!`)
 
  if (frenzy == 'aç') { 
  let açıkkapalı = await db.fetch(`küfürEngelFrenzy_${code.id}`)
  if(açıkkapalı) return message.reply(`Zaten küfür engel bu kanalda/belirttiğiniz kanalda aktif!`)
    
db.set(`küfürEngelFrenzy_${code.id}`,'açık')
message.reply(`Küfür engel sistemi başarıyla bu kanalda/belirttiğiniz kanalda aktif edildi!`)
  }
  
  if (frenzy == 'kapat') {
  let açıkkapalı = await db.fetch(`küfürEngelFrenzy_${code.id}`)
  if(!açıkkapalı) return message.reply(`Zaten küfür engel bu kanalda/belirttiğiniz kanalda deaktif!`)
    
db.delete(`küfürEngelFrenzy_${code.id}`)
message.reply(`Küfür engel sistemi başarıyla bu kanalda/belirttiğiniz kanalda deaktif edildi!`)
}
};
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};
exports.help = {
  name: 'küfürengel',
  kategori:'moderasyon',
  description: 'Frenzy Code',
  usage: 'Frenzy Code!'
}
