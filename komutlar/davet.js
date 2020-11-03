const Discord = require('discord.js');
const db = require("quick.db");
const ayarlar = require('../ayarlar.json');




exports.run = (client, message, args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
    const embed = new Discord.RichEmbed()
        
        .setTitle(`${client.user.username} DAVET SİSTEMİ `)
        .setDescription(`📥**Botun Davet Linki İçin** [TIKLA](https://discord.com/api/oauth2/authorize?client_id=591250472652898315&permissions=8&scope=bot) \n🔶**Destek Sunucusu İçin** [TIKLA](https://discord.gg/kvrcqcR6qy)`)
        .setThumbnail(client.user.avatarURL)
        .setFooter(`${message.author.username} Başarıyla ${ayarlar.prefix}davet Sistemi Kullandı!`, message.author.avatarURL)
    .setColor(`RANDOM`)
    return message.channel.sendEmbed(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'davet',
  description: '',
  kategori:'genel',
  usage: 'davet'
};