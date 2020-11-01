const Discord = require('discord.js'),
      db = require('quick.db')
module.exports.run = async (client, message, args) => {
let channelfc= message.mentions.channels.first()
if(!channelfc) return message.reply('Bir Kanal Etiketle!')
db.set(`FrenzyResimsizHGBB_${message.guild.id}`,channelfc.id)
message.reply('HG BB Ayarlandı!')
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'hgbb-ayarla',
  kategori:'moderasyon',
  description: 'Frenzy Code',
  usage: 'Frenzy Code'
};