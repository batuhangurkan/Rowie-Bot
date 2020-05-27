const Discord = require('discord.js')
const ms = require("ms");

exports.run = async (client, message, args) => {
const mb = new Discord.RichEmbed()
.setAuthor(client.user.username, client.user.avatarURL)
.setFooter(`Gults`)
.setTimestamp()

const emb = new Discord.RichEmbed()
.setAuthor(client.user.username, client.user.avatarURL)
.setFooter(`Gults`)
.setTimestamp()

if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(mb.setDescripton(`Bu komutu kullanabilmek için yetkiniz yetersiz.`))
let batuhan = message.mentions.users.first()
let rol = message.mentions.roles.first()

if(!args[0]) return message.channel.send(mb.setDescription(`Bir kullanıcı etiketlemelisin.`))
if(!batuhan) return message.channel.send(mb.setDescription(`**${args[0]}**, kişisini sunucuda bulamıyorum.`))
  
if(!args[1]) return message.channel.send(mb.setDescription(`Bir rol etiketlemelisin.`))
if(!rol) return message.channel.send(mb.setDescription(`**${args[1]}**, rolünü sunucuda bulamıyorum.`))
  
if(!args[2]) return message.channel.send(mb.setDescription(`Ne kadar süre rolün kalacağını belirtmelisin.`))
let süre = args[2];

message.guild.members.get(batuhan.id).addRole(rol.id)
message.channel.send(emb.setDescription(`${batuhan} isimli kişiye ${message.author.username} tarafından ${süre.replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')} boyunca ${rol} rolü verildi.`)).then(m => {
setTimeout(async () =>{  
message.guild.members.get(batuhan.id).removeRole(rol.id)
m.edit(emb.setDescription(`${rol}, için rol süresi doldu.`))
}, ms(süre))
})
  
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'süreli-rol'
};// codare