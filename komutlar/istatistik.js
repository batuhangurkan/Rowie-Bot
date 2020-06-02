
const Discord = require("discord.js");
const moment = require("moment");
const os = require('os');
require("moment-duration-format");
const db = require("quick.db");
exports.run = async (bot, message, args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
  const duration = moment.duration(bot.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");

  let msg = message
   const bune = moment.duration(bot.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
   const annencilermaldır = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setFooter('Gults  \'Buyur Benim Hakkımda Bilgiler', bot.user.avatarURL)
  .addField("»**Botun Sahibi**", `<@267604752764764160>`)
  .addField("»**Bellek kullanımı**", (process.memoryUsage().heapUsed / 512 / 512).toFixed(2) + ' MB', true)  
  .addField("»**Çalışma süresi**", bune)
  .addField('»**Müzik Çalınan Sunucu Sayısı**;', bot.voiceConnections.size)
  .addField('»**Kullanıcılar**:', bot.guilds.reduce((a, b) => a + b.memberCount, 0))
  .addField("»**Sunucular**", bot.guilds.size.toLocaleString(), true)
  .addField("»**Kanallar**", bot.channels.size.toLocaleString(), true)
  .addField("»**Discord.JS sürüm**", "v"+Discord.version, true)
  .addField("»**Node.JS sürüm**", `${process.version}`, true)
  .addField("»**Ping**", bot.ping+" ms", true)
  .addField("»**CPU**", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
  .addField("»**Bit**", `\`${os.arch()}\``, true)
  .addField("»**İşletim Sistemi**", `\`\`${os.platform()}\`\``) 
 return message.channel.send(annencilermaldır);
  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [ 'botbilgi'],
  permLevel: 0
};

exports.help = {
  name: "botbilgi",
  description: "Bot i",
  kategori:'bilgi',
  usage: "botbilgi"
};