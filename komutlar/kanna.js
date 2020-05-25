const Discord = require("discord.js");
const { get } = require("superagent");
const db = require("quick.db");
module.exports.run = async (bot, message, args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
    try {
        if(!args[0]){
message.channel.send('? **UYARI**\n`Yazı giriniz Türkçe karakter kullanmayınız Örnek: **ı** yerine **i** giriniz.!`')
return;
}
        let url = `https://nekobot.xyz/api/imagegen?type=kannagen&text=${args.join(" ")}`
        get(url).then(res => {
            const embed = new Discord.RichEmbed()
            .setColor("0xFFB6C1")
            .setAuthor("Kanna diyorki..")
            .setImage(res.body.message)
            setTimeout(() => {
                return message.channel.send(embed);
            }, 100);
        });
    } catch(err) {
        console.log(err)    
    }
}
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kanna"],
  permLevel: 0
};

module.exports.help = {
  name: 'kanna',
  description: 'anime karakterinin posterine yazı yazarsınız',
  kategori:'eğlence',
  usage: 'kanna <yazı>'
};