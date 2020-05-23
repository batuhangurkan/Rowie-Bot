const Discord = require("discord.js");
const client = new Discord.Client();
const moment = require("moment");
const db = require("quick.db");
require("moment-duration-format");
const ayarlar = require("../ayarlar.json");

exports.run = (client, message) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
  const duration = moment
    .duration(client.uptime)
    .format(" D [gün], H [saat], m [dakika], s [saniye]");
  const istatistikozel = new Discord.RichEmbed()
    .setColor(0x36393f)
    .setDescription("Gults Bot İstatistik")
    .addField(` Bot Sahipleri:`, `<@267604752764764160>`, true)
    .addField("Shard:", "1/1", true)
    .addField(
      "Bellek Kullanımı:",
      `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
      true
    )
    .addField("Sunucu Sayısı:", `${client.guilds.size.toLocaleString()}`, true)
    .addField("Kullanıcı Sayısı:", `${client.users.size}`, true)
    .addField(
      "Toplam Kullanıcı Sayısı:",
      `${client.guilds
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString()}`,
      true
    )
    .addField("Kanal Sayısı:", `${client.channels.size.toLocaleString()}`, true)
    .addField(`Ne Kadar Süredir Aktif:`, `${duration}`, true)
    .addField("Ping:", `${client.ping}`, true)
    .addField("Discord.js Sürümü:", `${Discord.version}`, true)
    .addField(
      `Davet Et`,
      `[Tıkla](https://discordapp.com/oauth2/authorize?client_id=591250472652898315&scope=bot&permissions=805314622)`,
      true
    );
  message.channel.sendEmbed(istatistikozel);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [
    "istatistik",
    "i",
    "istatistikler",
    "botbilgi",
    "bottbilgi",
    "hakkında",
    "bot hakkında",
    "bothakkında"
  ],
  kategori: "Bot",
  permLevel: 0
};

exports.help = {
  name: "botbilgi",
  description: "Bot ile ilgili bilgi verir.",
  usage: "botbilgi"
};
