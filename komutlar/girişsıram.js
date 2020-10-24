const Discord = require('discord.js');
const data = require('quick.db')

exports.run = async (client, message, args) => {// chimp ♡'d#0110
let codare = await data.fetch(`giriş.${message.guild.id}.${message.author.id}`)
  
message.channel.send(`Sunucuya giriş sıran: ${codare-1 ? codare-1 : '0'} > **${codare ? codare : '0'}** > ${codare+1 ? codare+1 : '0'}`)

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'giriş-sıram'
};// codare