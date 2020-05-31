const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json'),
      prefix = ayarlar.prefix
exports.run = async(client, message, args) =>{
  
let frenzy_ibrahim = await db.fetch(`Frenzy?Code?OtorolRol_${message.guild.id}`) || await db.fetch(`Frenzy?Code?OtorolKanal_${message.guild.id}`)
if(!frenzy_ibrahim) return message.reply(`:x: Bu sistem zaten kapalı durumda. Açmak için **${prefix}otorol rol kanal**`)
db.delete(`Frenzy?Code?OtorolRol_${message.guild.id}`) 
db.delete(`Frenzy?Code?OtorolKanal_${message.guild.id}`)
message.channel.send(`Otorol kapatıldı!\nYeni gelen kullanıcılara hiç bir rol vermeyeceğim.`)
};  
exports.conf = {
  enabled: false, 
  guildOnly: false, 
  aliases: ['otorol-kapat'],
  permLevel: 0 
};
exports.help = {
  name: 'otorolkapat',
  description: 'Otorol Sistemi - Frenzy Code',
  kategori:'moderasyon',
  usage: 'otorolkapat'
};