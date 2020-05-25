const Discord = require('discord.js');
const db = require("quick.db");
exports.run = (client, message, args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setDescription(`:x: Bu komut özel mesajlarda kullanıma kapatılmıştır.`)
  return message.author.send(ozelmesajuyari); }
//eğer bir bot yollamış ise mesajı
if (message.author.bot === true) {
  return;
}

  if (!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return  message.channel.send(new Discord.RichEmbed()
.setDescription(`:x: | Bu komutu kullanmak için gerekli yetkiniz yok.`)
.setColor("RED"));
	let duyuru = args.slice(0).join(' ');
	if (duyuru.length < 1) return message.channel.send(new Discord.RichEmbed()
    .setDescription(':x: | Lütfen duyuru metnini yazınız.')
    .setColor('RED'))
	const mesaj2 = new Discord.RichEmbed()
    .setColor("RED")
    .addField(':mega: | Yeni Duyuru:', `**»** ${duyuru}`)
	.setFooter(`Yetkili: ${message.author.username}`)
  message.channel.send(mesaj2);
  message.delete()
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['duyuru', 'duyuru yap'],
  permLevel: 3
};

exports.help = {
  name: 'duyuru',
  description: 'İstediğiniz şeyi bota yazdırır.',
  kategori:'moderasyon',
  usage: 'duyuru [duyuru]'
};
