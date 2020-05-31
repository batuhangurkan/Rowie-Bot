const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
  message.delete();
  let sebep = args.slice(1).join(" ");
  let frenzy_code = message.mentions.users.first();
if(!sebep && !frenzy_code) return message.reply('kullanıcı ve sebep belirt.!')
  message.guild.ban(frenzy_code, sebep);
  message.guild.unban(frenzy_code, sebep)
};
exports.conf = {
  enabled:false,
  guildOnly: false,
  aliases: ["softban"],
  permlevel: 2
};
exports.help = {
  name: "soft-ban",
  description: "kullanıcıyı banlar sonra banını açar",
  kategori:'moderasyon',
  usage: "softban kullanıcı sebep"
};