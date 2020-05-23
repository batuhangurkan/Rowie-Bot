const db = require("quick.db");
exports.run = async function (client, message) {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
let perms = client.elevation(message)
message.reply("İzin Seviyeniz: " + perms)
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["permlevel","permLevel","izinseviyesi","botizin"],
  permLevel: 0
};

module.exports.help = {
  name: 'perm',
  description: 'Bottaki izin seviyenizi gösterir.',
  usage: 'perm'
};
//XiR