const Discord = require('discord.js');
exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send(`:x: Yetersiz Yetki!`)
  let frenzy_isim = args.slice(1).join(' ');
  let frenzy_k = message.mentions.users.first();
  if(!frenzy_k) return message.reply(`Kullanıcı Etiketle`)
  if(!frenzy_isim) return message.reply(`İsim Gir!`)
  if(frenzy_isim.length > 32) return message.reply(`İsimler 32 Karekteri Aşamaz!`)
  message.reply(`:white_check_mark: Başarılı \`${frenzy_k.tag}\` Kişinin Yeni İsmi \`${frenzy_isim}\` Oldu`)
message.guild.members.get(frenzy_k.id).setNickname(frenzy_isim)
}
exports.conf = {
  enabled: true,
guildOnly: false,
   aliases: ['newnick', 'isimdeğiş'],
permLevel: 0
}
exports.help = {
    kategori:'genel',
  name: 'yenisim'
}
