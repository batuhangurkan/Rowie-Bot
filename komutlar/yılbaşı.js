const Discord = require('discord.js');
const ms = require('parse-ms');
const db = require("quick.db");
exports.run = async(client, message, args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
  let okul = new Date('2021-01-01:00:00')
    let zaman = ms(okul - Date.now())
    message.channel.send(`Yılbaşının kutlanmasına **${zaman.days}** gün **${zaman.hours}** saat **${zaman.minutes}** dakika kaldı!`)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yılbaşı',
  kategori:'bilgi',
  description: '',
usage: ""
};