

const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const prefix = ayarlar.prefix;
exports.run = (client, message, args) => {
 
  if (message.channel.type == "dm") return;
  if (message.channel.type !== "text") return;

  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message
      .reply(
        `Bu komutu kullanabilmek için **YÖNETİCİ** yetkisine sahip olmalısın!`
      )
      .then(m => m.delete(10000));

  message.delete();

  let question = args.join(" ");

  let user = message.author.username;

  if (!question)
    return message.channel.sendEmbed(
      new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField("__Doğru Kullanım__", `${prefix}oylama **mesaj**`)
    );

  message.channel.send("@everyone - @here")
  .then(m => m.delete(100));
  
  message.channel
    .sendEmbed(
      new Discord.RichEmbed()

        .setColor("RANDOM")
        .setThumbnail(message.author.avatarURL)
        .setTimestamp()
        .setFooter("Oylama Komutu", message.author.avatarURL)

        .addField(`__OYLAMA__`, `**${question}**`)
    )
    .then(function(message) {
      message.react("👍");

      message.react("👎");
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["oylama"],
  permLevel: 0,
  kategori: "Yetkili"
};

exports.help = {
  name: "oylama",
  description: "Oylama yapmanızı sağlar.",
  usage: ".oylama <oylamaismi>"
};