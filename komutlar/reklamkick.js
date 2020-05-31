const db = require('quick.db')
const Discord = require('discord.js')
exports.run = async (bot, message, args) => {
    if (!args[0]) return message.channel.send('Reklamkick açmak için aç yada kapat yaz')
    if (args[0] == 'aç') {
      let açıkkapalı = await db.fetch(`reklamkick_${message.guild.id}`)
      if(açıkkapalı) return message.reply(`Zaten ayarlı`)
      
        db.set(`reklamkick_${message.guild.id}`, 'acik')
        message.reply(`ReklamKick açıldı`)
    }
    if (args[0] == 'kapat') { 
      let açıkkapalı = await db.fetch(`reklamkick_${message.guild.id}`)
      if(!açıkkapalı) return message.reply(`zaten kapalı`)
      
        db.delete(`reklamkick_${message.guild.id}`, 'kapali')
        message.reply(`reklam kick kapatıldı`)
    }
}
exports.conf = {
    enabled: false,
    guildOnly: false,
    aliases: [],
    permLevel: 4
};
exports.help = {
    name: 'reklamkick',
  kategori:'moderasyon',
    description: 'Reklam kick sistemini açıp kapatır',
    usage: 'reklamkick aç/kapat'
};
