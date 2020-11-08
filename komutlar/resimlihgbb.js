const Discord = require('discord.js')
const fs = require('fs');
var ayarlar = require('../ayarlar.json');
let kanal = JSON.parse(fs.readFileSync("././jsonlar/gc.json", "utf8"));

exports.run = async (client, message, args) => {
if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
  let channel = message.mentions.channels.first()
  
    if (!channel) {
        const embed = new Discord.RichEmbed()
        .setColor("RED")
          .setTitle(`Yanlış Kullanım!`)
          .addField(`Doğru Kullanım`, `${ayarlar.prefix}giriş-çıkış-ayarla <#kanal>`)
        message.channel.send({embed})
        return
    }

    if(!kanal[message.guild.id]){
        kanal[message.guild.id] = {
            gkanal: channel.id
        };
    }
  
    fs.writeFile("././jsonlar/gc.json", JSON.stringify(kanal), (err) => {
        console.log(err)
    })
  
    const embed = new Discord.RichEmbed()
    .setDescription(`» Giriş Çıkış kanalı başarıyla ${channel} olarak ayarlandı!`)
    .setColor("GREEN")
    message.channel.send({embed})
  

}
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['giriş-çıkış-belirle',"girişçıkış","hoşgeldin","hoşgeldin-ayarla"],
    permLevel: 0
}

exports.help = {
    name: 'giriş-çıkış-ayarla',
    description: 'Giriş çıkış kanalını ayarlar.',
    usage: 'giriş-çıkış-ayarla <#kanal>'
}
//XiR