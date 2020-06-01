const Discord = require('discord.js');
const superagent = require('superagent');
exports.run = (client, msg, args) => {
  if (msg.channel.nsfw === true) {
    superagent.get('https://nekobot.xyz/api/image')
    .query({ type: 'hass'})
    .end((err, response) => {
      msg.channel.send({ file: response.body.message }); 
      return 
    });
  } else {
    msg.channel.send("Bu kanal bir NSFW kanalı değil!")
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['hentai'],
  permLevel: 0
};

exports.help = {
  name: 'hentai',
  kategori:'nsfw',
  description: '+18 Komut',
  usage: 'pgif'
};