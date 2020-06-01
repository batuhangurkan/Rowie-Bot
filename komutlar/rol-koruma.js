const db = require("quick.db");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "PREFIX";

if (!args[0]) {
const embed = new Discord.RichEmbed()
.setColor("RANDOM")
.setTitle("Rol Koruma sistemi!")
.setDescription(
"Hatalı kullanım örnek: ${prefix}rol-koruma aç & kapat"
);

message.channel.send(embed);
return;
}
let rol = await db.fetch(`rolk_${message.guild.id}`);
if (args[0] == "aç") {
if (rol) {
const embed = new Discord.RichEmbed()
.setColor("BLACK")
.setTitle("Rol Koruma sistemi")
.setDescription("Zaten Rol Koruma Sistemi Aktif");

message.channel.send(embed);
return;
} else {
db.set(`rolk_${message.guild.id}`, "acik");
const embed = new Discord.RichEmbed()
.setColor("BLACK")
.setTitle("Rol Koruma sistemi!")
.setDescription("Rol Koruma Sistemi Aktif Silinen Rolleri Tekrar Açacam Ve Size Bildiricem");

message.channel.send(embed);
}
} else if (args[0] == "kapat") {
db.delete(`rolk_${message.guild.id}`);
const embed = new Discord.RichEmbed()
.setColor("BLACK")
.setTitle("Rol Koruma sistemi")
.setDescription("Rol Koruma Sistemi Kapandı");

message.channel.send(embed);
}
};
exports.conf = {
enabled: true,
guildOnly: true,
aliases: [],
permLevel: 3
};

exports.help = {
name: "rol-koruma",
  kategori:'moderasyon',
description: "Rol koruma",
usage: "rol-koruma by frenzy code"
}; 