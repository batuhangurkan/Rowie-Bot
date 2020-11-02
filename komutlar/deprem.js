const Discord = require('discord.js');
exports.run = (client, msg, args) => {
  msg.channel.send("Hello");
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'pussy',
  kategori:'nsfw',
  description: '+18 Komut',
  usage: 'pussy'
};