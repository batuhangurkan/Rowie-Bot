const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")

exports.run = async (client, message, args) => {
let bicon = client.user.displayAvatarURL;
let member = message.mentions.members.first();
if(!member) member = message.member;
let name = member.nickname;
if(!name) name = member.user.username; 
  
let yes = ":green_square:";
let nope = ":red_square:";

let ADMINISTRATOR = message.guild.member(member).hasPermission("ADMINISTRATOR") ? `${yes}` : `${nope}`
let VIEW_AUDIT_LOG = message.guild.member(member).hasPermission("VIEW_AUDIT_LOG") ? `${yes}` : `${nope}`
let MANAGE_SERVER = message.guild.member(member).hasPermission("MANAGE_GUILD") ? `${yes}` : `${nope}`
let MANAGE_ROLES = message.guild.member(member).hasPermission("MANAGE_ROLES") ? `${yes}` : `${nope}`
let MANAGE_CHANNELS = message.guild.member(member).hasPermission("MANAGE_CHANNELS") ? `${yes}` : `${nope}`
let KICK_MEMBERS = message.guild.member(member).hasPermission("KICK_MEMBERS") ? `${yes}` : `${nope}`
let BAN_MEMBERS = message.guild.member(member).hasPermission("BAN_MEMBERS") ? `${yes}` : `${nope}`
let CREATE_INSTANT_INVITE = message.guild.member(member).hasPermission("CREATE_INSTANT_INVITE") ? `${yes}` : `${nope}`
let CHANGE_NICKNAME = message.guild.member(member).hasPermission("CHANGE_NICKNAME") ? `${yes}` : `${nope}`
let MANAGE_NICKNAMES = message.guild.member(member).hasPermission("MANAGE_NICKNAMES") ? `${yes}` : `${nope}`
let MANAGE_EMOJIS = message.guild.member(member).hasPermission("MANAGE_EMOJIS") ? `${yes}` : `${nope}`
let SEND_MESSAGES = message.guild.member(member).hasPermission("SEND_MESSAGES") ? `${yes}` : `${nope}`
let SEND_TTS_MESSAGES = message.guild.member(member).hasPermission("SEND_TTS_MESSAGES") ? `${yes}` : `${nope}`
let MANAGE_WEBHOOKS = message.guild.member(member).hasPermission("MANAGE_WEBHOOKS") ? `${yes}` : `${nope}`
let MANAGE_MESSAGES = message.guild.member(member).hasPermission("MANAGE_MESSAGES") ? `${yes}` : `${nope}`
let MENTION_EVERYONE = message.guild.member(member).hasPermission("MENTION_EVERYONE") ? `${yes}` : `${nope}`
let USE_EXTERNAL_EMOJIS = message.guild.member(member).hasPermission("USE_EXTERNAL_EMOJIS") ? `${yes}` : `${nope}`
let ADD_REACTIONS = message.guild.member(member).hasPermission("ADD_REACTIONS") ? `${yes}` : `${nope}`
let CONNECT = message.guild.member(member).hasPermission("CONNECT") ? `${yes}` : `${nope}`
let SPEAK = message.guild.member(member).hasPermission("SPEAK") ? `${yes}` : `${nope}`
let MUTE_MEMBERS = message.guild.member(member).hasPermission("MUTE_MEMBERS") ? `${yes}` : `${nope}`
let DEAFEN_MEMBERS = message.guild.member(member).hasPermission("DEAFEN_MEMBERS") ? `${yes}` : `${nope}`
let MOVE_MEMBERS = message.guild.member(member).hasPermission("MOVE_MEMBERS") ? `${yes}` : `${nope}`
  
  


  let pages = [`
Merhaba ${message.author.username}
Sunucudaki izinlerinizi sayfa değiştirerek bakabilirsiniz.
:green_square: Yetkinizin olduğunu gösterir.
:red_square: Yetkinizin olmadığını gösterir.

⏩ - İleri Git
🔴 - Kapatmak için
⏪ - Geri Dön
`, `
**__🔊 Ses İzinleri __**
Bağlan
${CONNECT}
Konuş
${SPEAK}
Üyeleri Sustur
${MUTE_MEMBERS}
Üyeleri Sağırlaştır
${DEAFEN_MEMBERS}
Üyeleri Taşı
${MOVE_MEMBERS}
`,`
**__📍 Yazı İzinleri __**
Mesajları Yönet
${MANAGE_MESSAGES}
Tüm Rollerden Bahset(everyone)
${MENTION_EVERYONE}
Mesaj Gönder
${SEND_MESSAGES}
Sesli Mesaj Gönder
${SEND_TTS_MESSAGES}
Harici Emojiler Kullan
${USE_EXTERNAL_EMOJIS}
Tepki Ekle
${ADD_REACTIONS}
`,`
**__🔧 Yönetici İzinleri __**
Yönetici
${ADMINISTRATOR}
Denetim Kaydını Görüntüle
${VIEW_AUDIT_LOG}
Sunucuyu Yönet
${MANAGE_SERVER}
Rolleri Yönet
${MANAGE_ROLES}
Kanalları Yönet
${MANAGE_CHANNELS}
Kullanıcıları At
${KICK_MEMBERS}
Kullanıcıları Yasakla
${BAN_MEMBERS}
Davet Oluştur
${CREATE_INSTANT_INVITE}
Kullanıcı Adı Değiştir
${CHANGE_NICKNAME}
Kullanıcı Adlarını Yönet
${MANAGE_NICKNAMES}
Emojileri Yönet
${MANAGE_EMOJIS}
Webhookları Yönet
${MANAGE_WEBHOOKS}
`]
  
let page = 1;
  
  const embed = new Discord.RichEmbed() 
    .setThumbnail(message.author.displayAvatarURL)
    .setColor(0xff2f2f) 
    .setAuthor(`${name} Sunucudaki Yetkileriniz`, message.author.displayAvatarURL)
    .setFooter(`Sayfa ${page} - ${pages.length} | ${client.user.username} `)
    .setDescription(pages[page-1])
    .setTimestamp()
 
  message.channel.send(embed).then(msg => {
   
    msg.react('⏪').then( r => {
          msg.react(`🔴`).then( r => { 
      msg.react('⏩')
     
      const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
      const delFilter = (reaction, user) => reaction.emoji.name === `🔴` && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;
     
      const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 }); 
      const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 });
      const dels = msg.createReactionCollector(delFilter, { time:100000 });

      
      backwards.on('collect', r => { 
        if (page === 1) return; 
        page--;
       embed.setAuthor(`${name} Yetkileriniz`, message.author.displayAvatarURL)
        embed.setDescription(pages[page-1])
        embed.setThumbnail(message.author.displayAvatarURL)
        embed.setFooter(`Sayfa ${page} - ${pages.length} | ${client.user.username} `)
        embed.setTimestamp();
        msg.edit(embed) 
      })
     
      forwards.on('collect', r => {
        if (page === pages.length) return; 
        page++;
        embed.setAuthor(`${name} Yetkileriniz`, message.author.displayAvatarURL)
        embed.setThumbnail(message.author.displayAvatarURL)
        embed.setDescription(pages[page-1]);
        embed.setFooter(`Sayfa ${page} - ${pages.length} | ${client.user.username} `)
        embed.setTimestamp();
        msg.edit(embed) 
   
    })
          dels.on('collect', r => {
          msg.delete(1000)
        })
  }) 
 
})
  
})
message.delete().catch(O_o=>{});
    
}
    

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["izinlerim"],
  permLevel: 0
};

exports.help = {
  name: 'yetkilerim',
  description: 'TesT Komutudur',
  usage: 'yetkilerim'
};
//XiR