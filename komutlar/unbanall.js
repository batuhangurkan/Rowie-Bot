const Discord = require('discord.js'); 
exports.run = (client, message, args) => {
message.guild.fetchBans().then(frenzy => {
frenzy.forEach(code => {
message.guild.unban(code)
});});
  message.channel.send(`Herkesin Banını Kaldırdım!`)
};
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ['banlarıkaldır'],
  permLevel: 2
};
exports.help = {
kategori:'moderasyon',
  name: 'unbanall'
};
