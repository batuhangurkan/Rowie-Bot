const Discord = require('discord.js')
const data = require('quick.db')

exports.run = async (client, message, args) => {

let isim = []
message.guild.members.forEach(user => {
if(user.hasPermission('ADMINISTRATOR')) {
if(!user.bot) {
isim.push(`${user.user.tag}`)
}}})
  
const embed = new Discord.RichEmbed()
.setAuthor(message.guild.name, message.guild.iconURL)
.setColor('RED')
.setDescription(`Seste olmayan yetkililer: ${isim.join(', ')}`)
await message.channel.send(embed)

} 
exports.conf = {
enabled: true,
guildOnly: false,
aliases: [],
permLevel: 0,
}

exports.help = {
  kategori:'genel',
name: 'sesteolmayan-yetkililer'
}