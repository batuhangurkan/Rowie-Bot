const Discord = require('discord.js')
const ms = require("ms");

exports.run = async (client, message, args) => {//chimp ᵈ♡#0110
const mb = new Discord.RichEmbed()
.setAuthor(client.user.username, client.user.avatarURL)
.setFooter(`Codare`)
.setTimestamp()

const emb = new Discord.RichEmbed()
.setAuthor(client.user.username, client.user.avatarURL)
.setFooter(`Codare`)
.setTimestamp()

if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(mb.setDescripton(`Bu komutu kullanabilmek için yetkiniz yetersiz.`))
let codare = message.mentions.channels.first()
if(!args[0]) return message.channel.send(mb.setDescription(`Bir kanalı etiketlemelisin.`))
if(!codare) return message.channel.send(mb.setDescription(`#**${args[0]}**, kanalını sunucuda bulamıyorum.`))
  
if(!args[1]) return message.channel.send(mb.setDescription(`Ne kadar süre kilitli kalacağını belirtmelisin.`))
let süre = args[1];
  
let kanal = message.guild.channels.get(codare.id);
let role = message.guild.roles.find(c => c.name === '@everyone');

kanal.overwritePermissions(role, { 'SEND_MESSAGES': false })
kanal.send(emb.setDescription(`Bu kanal ${message.author} tarafından ${süre.replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')} boyunca kilitlendi.`)).then(m => {
setTimeout(async () =>{  
kanal.overwritePermissions(role, { 'SEND_MESSAGES': null })
m.edit(emb.setDescription(`Kanal kilidi açıldı.`))
}, ms(süre))
})
  
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kanalkilit'
};// codare