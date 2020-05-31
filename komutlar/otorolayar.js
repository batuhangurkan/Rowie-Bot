	
const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json'),
      prefix = ayarlar.prefix
exports.run = async(client, message, args) =>{
  
let frenzy_ibrahim = await db.fetch(`Frenzy?Code?OtorolRol_${message.guild.id}`) || await db.fetch(`Frenzy?Code?OtorolKanal_${message.guild.id}`)
if(frenzy_ibrahim) return message.reply(`:x: Bu sistem zaten aktif durumda. Kapatmak için **${prefix}otorolkapat**`)
let frenzy_role = message.mentions.roles.first()
let frenzy_kanal = message.mentions.channels.first()
if(!frenzy_kanal || !frenzy_role) return message.reply(`Otorol sistemini ayarlamak için **rol ve kanal** belirtmelisin.`)
  
db.set(`Frenzy?Code?OtorolRol_${message.guild.id}`,frenzy_role.id) 
db.set(`Frenzy?Code?OtorolKanal_${message.guild.id}`,frenzy_kanal.id)
message.channel.send(`Otorol aktif edildi!\nYeni gelen kullanıcılara <@&${frenzy_role.id}> rolünü vereceğim.`)
};  
exports.conf = {
  enabled: false, 
  guildOnly: false, 
  aliases: ['otorolayarla'],
  permLevel: 0 
};
exports.help = {
  name: 'otorol',
  description: 'Otorol Sistemi - Frenzy Code',
   kategori:'moderasyon',
  usage: 'otorol rol kanal'
};