const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")

exports.run = async (client, message, args) => {
 let user = message.mentions.users.first() || message.author;

  if (
    user.presence.game !== null &&
    user.presence.game.type == "2" &&
    user.presence.game.name === "Spotify" &&
    user.presence.game.assets !== null
  ) {
    let Title = user.presence.game.details;
    let Author = user.presence.game.state;
    let Album = user.presence.game.assets.largeText;
    let Link = `https://open.spotify.com/track/${user.presence.game.syncID}`;
    let Image = `https://i.scdn.co/image/${user.presence.game.assets.largeImage.slice(
      8
    )}`;

    const embed = new Discord.RichEmbed()
      .setAuthor(
        "Spotify Durum",
        "https://i.ibb.co/3Cq3PVH/2JDJX8SQ.png"
      )
      .setColor("#1DB954")
      .setThumbnail(Image)
      .addField("Kullanıcı", `**[${user.tag}](https://spotify.com/)**`)
      .addField("Şarkı Adı", `**[${Title}](${Link})**`)
      .addField("Şarkı Albümü", `**[${Album}](${Link})**`)
      .addField("Şarkıcı", `**[${Author}](${Link})**`)
      .addField(
        "Spotify Dinliyor",
        `**[${Title} - ${Album} - ${Author}](${Link})**`
      )
      .setFooter(
        `Kullanıcı: ${message.author.tag}`,
        message.author.displayAvatarURL
      )
      .setTimestamp();
    return message.channel.send(embed);
  } else {
    const em = new Discord.RichEmbed();
    return message.channel.send(
      em
        .setDescription("Kullanıcı Spotify dinlemiyor!")
        .setAuthor(
          "Spotify Hata)",
          "https://i.ibb.co/3Cq3PVH/2JDJX8SQ.png"
        )
        .setColor("#1DB954")
    );
  }
  }


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["spoti"],
  permLevel: 0
};

exports.help = {
  name: 'spotify',
  description: 'Spotify şarkı bilgisini gönderir',
  usage: 'spotify <kullanıcı>'
};
//XiR