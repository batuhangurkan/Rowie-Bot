const Discord = require('discord.js');
const moment = require('moment');
moment.locale('en');

exports.run = async (client, message, args) => {// can ♡ b#1308

  let created = moment(message.member.createdAt);
  let joined = moment(message.member.joinedAt);
  let member_roles;
  let roles = message.member.roles.filter(s => s.name !== '@everyone');
  if(roles.size < 1) {
  member_roles = 'None'
  } else if(roles.size > 20) {
  member_roles = roles.map(s => s.name).slice(0, 20).join(', ')+` and ${roles.map(s => s.name).slice(20, roles.size).length} more..`;
  } else {
  member_roles = roles.map(s => s.name).join(', ');
  }
  const info = new Discord.RichEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setThumbnail(message.author.avatarURL)
  .setColor('#0fa06b')
  .addField('ID', message.author.id, true)
  .addField('Nickname', message.member.nickname ? message.member.nickname : 'None', true)
  .addField('Account Created', created.format('dddd, MMMM Do YYYY, @ h:mm:ss a'))
  .addField('Join Date', joined.format('dddd, MMMM Do YYYY, @ h:mm:ss a'))
  .addField('Roles '+`[${roles.size}]`, member_roles);

  message.channel.send(info);

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'info'
};// codare ♥
// tatsu kb kardesim