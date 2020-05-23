const Discord = require('discord.js');
const db = require("quick.db");
exports.run = (client, message, args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
  let reason = args.slice(1).join(' ');
  let guild = message.guild
  let terfiler = guild.channels.find('name', 'yetki-başvurusu');
  if (!terfiler) return message.reply('`yetki-başvurusu` kanalını bulamıyorum.');
  let user = message.mentions.users.first();
  if (reason.length < 1) return message.reply('Ne Kazandirirsiniz,Istediniz Yetki,Kac Saat Aktif Olacaginiz,Adiniz,Yasiniz ve Kendinizi Etiketleyin.');
  if (message.mentions.users.size < 1) return message.reply('Isminizi Etiketleyin.').catch(console.error);
  const embed = new Discord.RichEmbed()
    .setColor(0xD97634)
    .setThumbnail("")
    .setTimestamp()
    .addField('Durum:', 'Bekleniyor')
    .addField('Gonderen Kisi:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Bilgiler', reason);
    
    return guild.channels.get(terfiler.id).sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['basvuru'],
  permLevel: 0
};

exports.help = {
  name: 'başvuru',
  description: 'Kullanıcıyı terfi ettirir.',
  usage: 'başvuru [kullanıcı]'
};