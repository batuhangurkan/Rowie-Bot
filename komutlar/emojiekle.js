const Discord = require('discord.js');
exports.run = (client, msg, args) => {
 if(!msg.member.hasPermission("MANAGE_EMOJIS")) return msg.channel.send(":no_entry: Bu komutu kullanabilmek için `Emojileri yönet` yetkisine sahip olmalısınız")
  let isim = args[0];
  if(!isim) {
    msg.channel.send("Emojinin ismini belirtmedin.")
  } else {
    let emote = args[1];
    if(!emote && msg.attachments.size > 0) {
      var Attachment = msg.attachments.array()
      msg.channel.send(Attachment[0].url)
      msg.guild.createEmoji(Attachment[0].url, isim)
      .then(emote => msg.channel.send("Emoji oluşturuldu: " + emote))
      .catch(err => msg.channel.send("Bir hata var!"))
    }
  }
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['addemoji', 'emojioluştur'],
    permLevel: 0
}
exports.help = {
    name: 'emojiekle',
  kategori:'moderasyon',
    description: 'Sunucuya emoji eklersiniz',
    usage: 'emojiekle <link> <isim>',
}
