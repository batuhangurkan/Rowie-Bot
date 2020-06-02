const Discord = require('discord.js');
const ph = require("pornhub");
exports.run = async (client, message, args) => {
let kong = args[0]//CodAre a aitir
if(!kong) return message.channel.send("porno linki giriniz")
 if (message.channel.nsfw === true) {
ph.details(`${kong}`, function(err, details) {
const embed = new Discord.RichEmbed()
.setColor('#ffa31a')
.setTitle(details.title)
.setThumbnail(details.thumb)
.addField('Porno tagları:\n', details.tags, true)
.addField('Porno Süresi:\n', details.duration, true)
message.channel.send(embed)
});
}else {
    message.channel.send("Bu kanal bir NSFW kanalı değil!")
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["pornhub"],
  kategori: 'nsfw',

  permLevel: 0
};

exports.help = {
  name: "pornhub",
  description: "Pornhub'daki video bilgileri",
  usage: "pornhub"
};