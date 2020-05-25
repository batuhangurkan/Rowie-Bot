const Discord = require('discord.js')
const client = new Discord.Client({})
const DBL = require('dblapi.js')
const ayarlar = require("../ayarlar.json")
const dbl = new DBL("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5MTI1MDQ3MjY1Mjg5ODMxNSIsImJvdCI6dHJ1ZSwiaWF0IjoxNTg3Mjk3OTIyfQ.-M1sEU6dL7hcH7H6zm4wNlt7Ht3QIs1RjZJ38pPu52s", client)
const moment = require('moment')
require('moment-duration-format')
moment.locale('tr')
const db = require("quick.db");

exports.run = async (client, message, args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
  let botI = message.mentions.users.size > 0 ? message.mentions.users.first().bot ? message.mentions.users.first() : client.user : client.users.get(args[0]) ? client.users.get(args[0]).bot ? client.users.get(args[0]) : client.user : client.user
if(!args[0]) return message.channel.send("Bot Belirtmediniz ıd veya etiket kullanabilirsiniz")
  dbl.getBot(botI.id).then(dbots => {

    var dblxir = `https://discordbots.org/api/widget/${botI.id}.png?usernamecolor=D49818&topcolor=000000&middlecolor=1a1d23&datacolor=D49818`;
    var criado = moment(botI.createdAt).format('DD-MM-YYYY HH:mm')
    var embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setTimestamp(new Date())
      .setFooter(message.author.username, message.author.displayAvatarURL)
      .setThumbnail(botI.displayAvatarURL)
      .setAuthor(botI.username, botI.displayAvatarURL)
      .addField(':desktop: Discord Bot List:', `**[Buraya Tıkla](https://discordbots.org/bot/${botI.id})**`, true)
      .addField(':paperclip: Destek Sunucusu:', dbots.support ? `**[Buraya Tıkla](https://discord.gg/${dbots.support})**` : "Destek Sunucusu eklenmemiş.!", true)
      .addField(':pushpin: Prefix:', dbots.prefix, true)
      .addField(':up: Oy:', dbots.points, true)
      .addField(':bar_chart: Sunucu Sayısı:', `${dbots.server_count || "Ey Üşengeç, insan bi sunucu sayısını gösterecek birşey ekler püh"}`, true)
      .addField(':tools: Sahibi:', `<@${(dbots.owners.join('>, <@'))}>`, true)
      .addField(':books: Kitaplık Türü:', dbots.lib, true)
      .addField(':calendar: Yapım Tarihi:', criado, true)
      .addField(':ballot_box_with_check: Sertifika:', `${dbots.certifiedBot ? "Sertifikalı" : "Sertifikasız"}`, true)
      .addField(':map: Website:', `${dbots.website || "Eklenmemiş"}`, true)
      .addField(':dividers: Github:', `${dbots.github || "Eklenmemiş"}`, true)
      .addField(':pushpin: Etiketler:', `${dbots.tags}`, false)
      .addField(':pencil: Açıklama:', dbots.shortdesc, false)
      .attachFile({attachment: dblxir, name: `dblxir.png`})
      .setImage('attachment://dblxir.png')
      
    message.channel.send(embed)
  })
.catch(err => {
      message.channel.send(`:x: **${botI.username}** Discord Bots List sitesinde bulunmamaktadır`)
    })

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["discordbot","discordbotlist","botbilgi","botlist"],
  permLevel: 0
};

exports.help = {
  name: 'dbl',
  description: 'Discord Botları hakkında bilgi verir',
  kategori:'bilgi',
  usage: 'dbl'
};
//XiR Dev. Team - MeliL