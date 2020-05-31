const Discord = require('discord.js');
exports.run = async (client, message, args) => {
  
if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(':x: **|** Bu komut için yetkin yetersiz!')
let frenzy = message.mentions.roles.first() || message.guild.roles.get(args.slice(0).join(' ')) || message.guild.roles.find(role => role.name === args.slice(0).join(' '));
if (!frenzy) return message.channel.send('Rol etiketlemeliydin!')
  
message.guild.members.forEach(wictor => {
wictor.removeRole(frenzy)
})
message.channel.send('Herkesden '+frenzy+' rolü alındı!')
}
exports.conf = {
enabled: false,
guildOnly: false,
aliases: ['hra'],
permLevel: 0
}
exports.help = {
name: 'herkesdenrolal',
    kategori:'moderasyon',
description: 'Herkesden rol alır.',
usage: 'herkesdenrolal'
}
