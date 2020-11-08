const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
let bug = args.join(" ").slice(0);
let user = message.author.username;
let guild = message.guild.name;
let guildid = message.guild.id;
let kanal = message.channel.name;
  let kanalid = message.channel.id;
let channel = bot.channels.get("772436569637388298")//bug repot kanal id
let embed = new Discord.RichEmbed()
.setTitle("Bug Bildirisi")
.addField("Bug", bug)
.addField("Report Eden", user, true)
.addField("Sunucu", guild, true)
.addField("Sunucu ID", guildid, true)
.addField("Kanal", kanal, true)
.addField("Kanal ID", kanalid, true)
.setColor("RED")
  const embed2 = new Discord.RichEmbed()
    .setColor("RED")
    .setDescription(
      `${message.author.username}, hata bildiriminiz yetkililere iletilmiştir. Geri dönüş yapılmayacaktır.`)
    message.channel.send(embed2)
channel.send(embed).then(message => {
  message.react('❌')
  message.react('✔')
  });
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['hatabildir', 'bugreport', 'bugbildir', 'hata', 'bug'],
  permLevel: 0  
};
exports.help = {
  name: 'bug-bildir',
  description: 'Botla ilgili hataları bildirirsiniz.',
  usage: 'bug-bildir'
}