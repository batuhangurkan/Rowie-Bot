const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
  message.channel.send(`Şanslı Kişimiz : <@${message.guild.members.random().id}>`)
};
exports.conf = {
  enabled:false,
  guildOnly: false,
  aliases: [],
  permlevel: 2
};
exports.help = {
  kategori:'moderasyon',
  name: "random"
};
//Frenzy Code
