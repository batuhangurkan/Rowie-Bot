const Discord = require('discord.js')
const ms = require("ms");

exports.run = async (client, message, args) => {
const mb = new Discord.RichEmbed()
.setAuthor(client.user.username, client.user.avatarURL)
.setFooter(`Codare`)
.setTimestamp()

const emb = new Discord.RichEmbed()
.setAuthor(client.user.username, client.user.avatarURL)
.setFooter(`Codare`)
.setTimestamp()

if(!message.member.hasPermission('MUTE_MEMBERS')) return message.channel.send(mb.setDescripton(`Bu komutu kullanabilmek için yetkiniz yetersiz.`))

let codare = message.mentions.users.first()
if(!args[0]) return message.channel.send(mb.setDescription(`Bir kişiyi etiketlemelisin.`))
if(!codare) return message.channel.send(mb.setDescription(`**${args[0]}**, kişisini sunucuda bulamıyorum.`))
if(message.guild.members.get(codare.id).highestRole.calculatedPosition > message.member.highestRole.calculatedPosition) return message.channel.send(mb.setDescription(`Bu kişinin rolü/rolleri, senin rolün/rollerinden daha yüksek.`))
if(!message.guild.members.get(codare.id).voiceChannel) return message.channel.send(mb.setDescription(`Bu kullanıcı seslide değil.`))
if(!args[1]) return message.channel.send(mb.setDescription(`Ne kadar süre susturacağımı belirtmelisin.`))
let süre = args[1];
  
let sebep1 = args.join(' ').slice(args[1].length+args[0].length + 1)
let sebep = sebep1 ? sebep1 : 'Sebep girilmemiş.'

message.guild.members.get(codare.id).setMute(true).then(() =>
message.channel.send(mb.setDescription(`Birisi ses kanalı üzerinden susturuldu!`)
                     .addField(`İşlemi yapan:`, message.author, true)
                     .addField(`İşlem yapılan:`, codare.tag, true)
                     .addField(`Süre:`, süre.replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat'), true)
                     .addField(`Sebep:`, sebep)))
setTimeout(async () =>{
message.guild.members.get(codare.id).setMute(false).then(() =>
message.channel.send(emb.setDescription(`Susturulma süresi bitti:`)
                     .addField(`İşlemi yapan:`, message.author, true)
                     .addField(`İşlem yapılan:`, codare.tag, true)
                     .addField(`Süre:`, süre.replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat'), true)
                     .addField(`Sebep:`, sebep)))                   
}, ms(süre))

} 
exports.conf = {
enabled: true,
guildOnly: false,
aliases: ['ss'],
permLevel: 0,
}

exports.help = {
name: 'seslide-sustur'
}// codare