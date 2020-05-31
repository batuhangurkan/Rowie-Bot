const Discord = require('discord.js');
exports.run = async (client, message, args) => {
  
if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(':x: **|** Bu komut için yetkin yetersiz!')
let frenzy = message.mentions.roles.first() || message.guild.roles.get(args.slice(0).join(' ')) || message.guild.roles.find(role => role.name === args.slice(0).join(' '));
if (!frenzy) return message.channel.send('Rol etiketlemeliydin!')
  
message.guild.members.forEach(wictor => {
wictor.addRole(frenzy)
})
message.channel.send('Herkese '+frenzy+' rolü veriildi!')
}
exports.conf = {
enabled: false,
guildOnly: false,
aliases: ['hrv'],
permLevel: 0
}
exports.help = {
name: 'herkeserolver',
  kategori:'moderasyon',
description: 'Herkese rol verir.',
usage: 'herkeserolver'
}
