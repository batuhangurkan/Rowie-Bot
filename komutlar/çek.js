const Discord = require('discord.js')
const ayarlar = require('./index.js')
exports.run = async (client ,message ,args) => {
const id = args[0]
if (!id)
return message.reply("HEY ! ÜYELERİN GİDECEĞİ VEYA GELECEĞİ KANALIN ID SİNİ YAZMAYI UNUTMA ;)")
message.guild.members.filter(a => a.voiceChannel).forEach(x => x.setVoiceChannel(id))
message.channel.send(`Bütün Sesli Kanaldaki Üyeler <#${id}> İsimli Odaya Taşındı! `)
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['herkesi-taşı'],
  permLevel: 0
};
exports.help = {
  name: "çek"
};