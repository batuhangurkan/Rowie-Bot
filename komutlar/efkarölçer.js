const Discord = require('discord.js');
const db = require("quick.db");
exports.run = (client, message) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
      const random = Math.floor(Math.random() * 100) + 1
      message.channel.send(`:smoking:  Efkar Ölçer %${random} Efkar Ölçüldü  ??`)
   } 
 
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permLevel: 0
}

exports.help = {
 name: 'efkarölçer',
 description: 'Efkarınızı Ölçer ',
  kategori:'eğlence',
 usage: 'efkarölçer'
};