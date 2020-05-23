const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
 const db = require("quick.db");
var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
    const embed = new Discord.RichEmbed()
        .setColor(0x00ffff)
        .setTitle("🔔 Sahibimin Hesapları!")
        .setThumbnail("https://cdn.pbrd.co/images/HRdm5QI.jpg")
        .addField("**Discord:**", `<@267604752764764160>`)
    

    return message.channel.sendEmbed(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['yapımcım','sahibim'],
    permLevel: 0
};

exports.help = {
    name: 'yapımcım',
    description: 'Botun Yapımcısını Gösterir',
    usage: 'yapımcım'
};
