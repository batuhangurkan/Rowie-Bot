const Discord = require('discord.js');
const IPinfo = require('get-ipinfo');
exports.run = async (client, message, args) => {
let kong = args[0]//CodAre a aitir
if(!kong) return message.reply("ip girmeyi unutun :}")
IPinfo(kong, function(err, ip) {
const embed = new Discord.RichEmbed()
    .setTitle('İp Bilgileri')
    .addField('Oturduğu Şehir:', ip.city || "bilinmiyor")//CodAre a aitir
    .addField('İp Numarası:', ip.ip || "bilinmiyor")
    .addField('Host:', ip.hostname || "bilinmiyor")
    .addField('Yer:', ip.region || "bilinmiyor")
    .addField('Kordinat:', ip.loc || "bilinmiyor")
    .addField('Şirket:', ip.org || "bilinmiyor")//CodAre a aitir
    .addField('Posta Kodu:', ip.postal || "bilinmiyor")
    .setColor('RANDOM');//CodAre a aitir
message.channel.send(embed)
          })//CodAre a aitir
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ip"],
  permLevel: 0
};

exports.help = {
  name: "ip",
  description: "!ip ip-numarası",
  usage: "ipbilgi"
};