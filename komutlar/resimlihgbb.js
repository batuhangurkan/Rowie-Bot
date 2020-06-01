const Discord = require('discord.js');
const db = require('quick.db');
exports.run = async (client, message, params, args) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(':no_entry: Hoşgeldin kanalı ayarlamak için `Yönetici` yetkisine sahip olman gerek.')
  let hgkanali = message.mentions.channels.first();
  if (!hgkanali) return message.channel.send(':no_entry: Hoşgeldin kanalı ayarlamak için bir kanal etiketlemeniz gerekli. `/resimlihg-ayarla #kanal`')
    db.set(`hgKanal_${message.guild.id}`, message.mentions.channels.first().id)
  let i = await db.fetch(`hgKanal_${message.guild.id}`)
  message.channel.send(`${process.env.basarili} Hoşgeldin kanalı, <#${i}> olarak ayarlandı.`)    
        
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permLevel: 0
};
exports.help = {
 name: 'resimlihg-ayarla',
  kategori:'moderasyon',
 description: 'neblm',
 usage: 'resimlihg-ayarla'
};
