const Discord = require('discord.js');
exports.run = async (client, message, args ) => {
  if (!message.member.hasPermission("MOVE_MEMBERS")) return message.channel.send("Bu Komutu Kullanabilmek İçin **Üyeleri Taşı** Yetkisine Sahip Olman Gerek!")

 let seslikanal = message.member.voiceChannelID
let seslikanal1 = message.member.voiceChannel
let kullanıcı = message.mentions.members.first()
let kullanıcıkanal = kullanıcı.voiceChannel
if(!seslikanal) return message.channel.send("Bir Sesli Kanalda Değilsin!")
if(kullanıcı.id == message.member.id) return message.channel.send("Kendini Çekemezsin!")
if(!args[0]) return message.channel.send("Birini Etiketlemelisin!")
if(!kullanıcıkanal) return message.channel.send("Etiketlediğin Kullanıcı Sesli Kanalda Değil!")

if(kullanıcıkanal) {
kullanıcı.setVoiceChannel(seslikanal)
message.channel.send(`${kullanıcı} Başarıyla **${kullanıcıkanal}** Kanalından **${seslikanal1}** Kanalına Çekildi!`)
}
 }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sesliçek'],
  permLevel: 0
};

exports.help = {
  name: 'çek',
  açıklama: ''
};