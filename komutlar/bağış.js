const Discord = require('discord.js')

exports.run = async (client,message,args) => {
        const embed = new Discord.RichEmbed()
                .setDescription(`Bağış Komutu`)
                .setDescription(`İninal Barkodumuz:`)
                .setTimestamp()
        message.channel.send({embed})
}

exports.conf = {
    enabled: true, 
    guildOnly: true, 
    aliases: ['bağışyap','bağış'], 
    permLevel: 0,
    kategori: 'kullanıcı' 
}

exports.help = {
    komut: 'bağış', 
  kategori:'genel',
    aciklama: 'Bu bir bağış komuttur.', 
    kullanim: 'bağış'
}