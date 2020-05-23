const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (bot, message, args, prefix) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')

    let cm = Math.round(Math.random() * 50);

    let gayembed = new Discord.RichEmbed()
       .setDescription(`<@${message.author.id}> Adlı Kullanıcının Muzu **${cm}** cm! :banana:`)
    return message.channel.send(gayembed);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};
  
exports.help = {
  name: 'muzum',
  description: 'Acaba Kaç CM',
  usage: 'muzum'
};