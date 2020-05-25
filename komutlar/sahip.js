const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (bot, message, args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
    let serverembed = new Discord.RichEmbed()
    .setDescription("**:chicken: Sahip komutları**")
    .setColor("#15f153")
    .addField("!eval", "Kod dener")
    .addField("!load", "Yeni bir komut yükler")
    .addField("!reboot", "Botu yeniden başlatır")
    .addField("!reload", "Bir komutu yeniden başlatır")
    .addField("!unload", "Bir komutu devre dışı bırakır")

    message.channel.send(serverembed);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sahipler'],
  permLevel: 0
};

exports.help = {
  name: 'sahip',
  description: 'Bütün sahip komutlarını verir.',
  kategori:'yapımcı',
  usage: 'sahip'
};
