const Discord = require('discord.js')
const db = require('quick.db')
exports.run = (client, message, args) => {
  
  if(message.author.id != "267604752764764160") return
  
  if(!args[0]) return message.channel.send('Bakım modunu açmak için !bakım aç')
  
  if(args[0] === 'aç') {
    if(db.fetch(`bakim`)) return message.channel.send('Bakım modu zaten açık')
    message.channel.send('Bakım modu açıldı. Bundan sonra bot komutlar için kapalı olucak.')
    db.set(`bakim`, 'acik')
  }
  if(args[0] === 'kapat'){
    if(!db.fetch(`bakim`)) return message.channel.send('Bakım modu zaten kapalı.')
    message.channel.send('Bakım modu kapatıldı. Komutlar yeniden aktif!')
    db.delete(`bakim`)
  }
  
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['bakım'],
  permLevel: 0
}
exports.help = {
  name: 'bakım'
}