const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
exports.run = async (client, message, args) => {
  let prefix =
    (await require("quick.db").fetch(`prefix_${message.guild.id}`)) ||
    ayarlar.prefix;
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.reply(
      "Bu komutu kullanabilmek için `Yönetici` iznine sahip olmalısın!"
    );
  let panel = await db.fetch(`sunucupanel_${message.guild.id}`);
  let rekoronline = await db.fetch(`panelrekor_${message.guild.id}`);

  if (panel)
    return message.channel.send(
      `Bu sunucuda panel zaten ayarlanmış! Devredışı bırakmak için;  \`${prefix}statskapat\``
    );

  message.channel
    .send(
      new Discord.RichEmbed()
        .setColor("AQUA")
        .setTitle("📊 Rowie Sıralama")
        .setDescription("LeaderBoard Ayarlansın mı ?")
        .setFooter('Onaylıyorsan 15 saniye içerisinde "evet" yazmalısın.')
    )
    .then(() => {
      message.channel
        .awaitMessages(response => response.content === "evet", {
          max: 1,
          time: 15000,
          errors: ["time"]
        })
        .then(collected => {
          db.set(`sunucupanel_${message.guild.id}`, message.guild.id);
          try {
            let role = message.guild.roles.find("name", "@everyone");
            message.guild.createChannel(`📊 Rowie Sıralama`, "category", [
              { id: message.guild.id, deny: ["CONNECT"] }
            ]);
            message.guild
              .createChannel(
                `Toplam Üye • ${message.guild.members.size}`,
                "voice"
              )
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === `📊 Rowie Sıralama`
                  )
                )
              )
              .then(c => {
                c.overwritePermissions(role, {
                  CONNECT: false
                });
              });

            message.guild
              .createChannel(
                `Aktif Üye • ${
                  message.guild.members.filter(
                    off => off.presence.status !== "offline"
                  ).size
                }`,
                "voice"
              )
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === `📊 Rowie Sıralama`
                  )
                )
              )
              .then(c => {
                c.overwritePermissions(role, {
                  CONNECT: false
                });
              });

            message.guild
              .createChannel(
                `Botlar • ${
                  message.guild.members.filter(m => m.user.bot).size
                }`,
                "voice"
              )
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === `📊 Rowie Sıralama`
                  )
                )
              )
              .then(c => {
                c.overwritePermissions(role, {
                  CONNECT: false
                });
              });

            message.guild
              .createChannel(
                `Rekor Aktiflik • ${
                  message.guild.members.filter(
                    off => off.presence.status !== "offline"
                  ).size
                }`,
                "voice"
              )
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === `📊 Rowie Sıralama`
                  )
                )
              )
              .then(c => {
                c.overwritePermissions(role, {
                  CONNECT: false
                });
              });
            message.guild
              .createChannel(
                `Seste • ${
                  message.guild.members.filter(a => a.voiceChannel).size
                }`,
                "voice"
              )
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === `📊 Rowie Sıralama`
                  )
                )
              )
              .then(c => {
                c.overwritePermissions(role, {
                  CONNECT: false
                });
              });

            db.set(
              `panelrekor_${message.guild.id}`,
              message.guild.members.filter(
                off => off.presence.status !== "offline"
              ).size
            );

            message.channel.send(
              `Sunucu panel için gerekli kanallar oluşturulup, ayarlamalar yapıldı!  \`(Oda isimlerini değiştirmeyin, çalışmaz!)\``
            );
          } catch (e) {
            console.log(e.stack);
          }
        });
    });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sunucupanel"],
  permLevel: 3
};

exports.help = {
  name: "kurulum",
  description:
    "Sunucu İstatistiklerini Gösteren Panel Kurar Ve Sürekli Olarak Günceller.",
  usage: "sunucupanel",
  kategori: "yetkili"
};
