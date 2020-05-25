
const Discord = require('discord.js');

exports.run = (client, message, args) => {

  let mesaj = args.slice(0).join(' ');
if (mesaj.length < 1) return message.reply('Embedli Yazı Yazmak İçin Komutu Kullanabilirsin.');

    const yaz = new Discord.RichEmbed()
      .setColor('#fff000')
      .addField(`Mesajın ^^`, `${mesaj}`)
    return message.channel.sendEmbed(yaz);
};
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [''],
  permLevel: 0
};

exports.help = {
  name: 'embedliyaz',
  description: '',
  usage: ''
};