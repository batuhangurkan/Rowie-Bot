
const Discord = require('discord.js')
const data = require('quick.db')

exports.run = async (client, message, args) => {
let prefix = '!'// botunuzun prefixi
  
 let kategoriler = ['genel', 'moderasyon', 'eğlence', 'yapımcı',]
 if(!args[0]) return message.channel.send(`Komutlara Ulaşmak İçin Kategorilerden Birini Yazmalısın. Örnek: !yardım moderasyon \n${kategoriler.join(', ')}`)
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
name: 'yardım'
};// codare