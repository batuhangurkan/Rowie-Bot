const Discord = require('discord.js')
const db = require("quick.db");
exports.run = (client, message, args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
  let user = message.mentions.users.first();
  if(!user) return message.channel.send('Sarılıcağın birisini etiketlemelisin')
  if (user.id === message.author.id) return message.reply('Kendine sarılamazsın :)');

    
  if ( message.react('😍')) {
      var gif = ['https://media.giphy.com/media/bWBg2sTDVuL3a/giphy.gif', 'https://media.giphy.com/media/3VEFW2uWzO3kY/giphy.gif', 'https://media.giphy.com/media/EaJaGsdkKhx9S/giphy.gif', '', 'https://media.giphy.com/media/JW1TgfyhKmpLG/giphy.gif', 'https://media.giphy.com/media/rAN7mYlR3Jzxe/giphy.gif', 'https://media.giphy.com/media/EvYHHSntaIl5m/giphy.gif', 'https://media.giphy.com/media/f6y4qvdxwEDx6/giphy.gif', 'https://media.giphy.com/media/16bJmyPvRbCDu/giphy.gif', 'https://media.giphy.com/media/8tpiC1JAYVMFq/giphy.gif', 'https://media.giphy.com/media/l0HlOvJ7yaacpuSas/giphy.gif', 'https://images-ext-2.discordapp.net/external/_b_aFTEGArY6gsGEqrxBruIG87rGoOKpLyhlAQaFf54/http/gifimage.net/wp-content/uploads/2017/06/anime-hug-gif-16.gif'];

      var gifler = gif[Math.floor(Math.random() * gif.length)];
  }
    
    if (message.react('😍')) {
    const op = new Discord.RichEmbed()
    .setDescription(`<@${message.author.id}>` + ` <@${user.id}>'e sarıldı <3`)
    .setColor('RANDOM')
    .setImage(gifler)
    return message.channel.send(op)
    }
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'sarıl',
  description: 'sarıl',
  kategori:'eğlence',
  usage: 'sarıl'
};