
const Discord = require('discord.js')
const data = require('quick.db')
const db = require("quick.db");
exports.run = async (client, message, args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
let prefix = '!'// botunuzun prefixi
  
 let kategoriler = ['genel', 'moderasyon', 'eğlence', 'bilgi', 'nsfw', 'yapımcı',]
 if(!args[0]) return message.channel.send(`You must write one of the categories to access the commands. Example: !help moderasyon \n${kategoriler.join(', ')}`)
 if(!kategoriler.includes(args[0])) return message.channel.send(`**${args[0]}**, isminde bir kategorim yok.`)
 
  const embed = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.author.avatarURL)
  .setTimestamp()
  .setColor('GOLD')
  .setFooter(`${client.user.username}: ${client.commands.filter(c => c.help.kategori === args[0]).size} komut bulunuyor.`)
  .setDescription(`**${args[0]}** komutları:\n\n${prefix}${client.commands.filter(c => c.help.kategori === args[0]).map(c => c.help.name).join(', '+ prefix).replace(`${prefix}yardım`, '')}`)
message.channel.send({embed})

} 
exports.conf = {
enabled: true,
guildOnly: false,
aliases: [],
permLevel: 0,
}

exports.help = {
name: 'help'
};// codare