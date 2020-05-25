const Discord = require("discord.js");
const db = require("quick.db");
exports.run = (client, message) => {
  if (db.fetch(`bakim`))
    return message.channel.send(
      "Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz"
    );
  let csgopng =
    "https://cdn.discordapp.com/attachments/447829045376319500/516564269584744448/csgo.png";
  var kasadancikanlar = [
    "Glock-18 'Fade' (**Factory New**) \nPrice:**298.88$**",
    "M4A4 Poseidon (**Factory New**) \nPrice:**216.11$**",
    "AK-47 Fire Serpent (**Factory New**) \nPrice:**622.62$**",
    "M4A4 Howl (**Factory New**) \nPrice:**1713.9$**",
    "M4A1-S Knight (**Factory New**) \nPrice:**272.69$**",
    "M4A1-S Hot Rod (**Factory New**) \nPrice:**60.88$**",
    "AWP Medusa (**Factory New**) \nPrice:**1582.05$**",
    "AWP Dragon Lore (**Factory New**) \nPrice:**1813.93$**",
    "Bayonet 'Slaugther' (**Factory New**) \nPrice:**230.6$**",
    "M9 Bayonet 'Slaughter' (**Factory New**) \nPrice:**321.3$**",
    "Karambit 'Case Hardened' (**Factory New**) \nPrice:**450.54$**",
    "M9 Bayonet 'Marble Fade' (**Factory New**) \nPrice:**413.2$**",
    "Bayonet 'Marble Fade' (**Factory New**) \nPrice:**288.19$**",
    "M9 Bayonet 'Bright Water' (**Factory New**) \nPrice:**150.5$**",
    "Karambit 'Lore' (**Factory New**) \nPrice:**1262.28$**",
    "Gut Knife 'Gamma Doppler' (**Factory New**) \nPrice:**110.56$**",
    "Gut Knife 'Freehand' (**Factory New**) \nPrice:**73.97$**",
    "Glock-18 'Fade' (**Minimal Wear**) \nPrice:**295.61$**",
    "M4A4 Poseidon (**Minimal Wear**) \nPrice:**198.88$**",
    "M4A4 Poseidon (**Field-Tested**) \nPrice:**172.92$**",
    "AK-47 Fire Serpent (**Minimal Wear**) \nPrice:**252.21$**",
    "AK-47 Fire Serpent (**Field-Tested**) \nPrice:**183.56$**",
    "AK-47 Fire Serpent (**Well-Worn**) \nPrice:**170.69$**",
    "AK-47 Fire Serpent (**Battle-Scared**) \nPrice:**104.64$**",
    "M4A4 Howl (**Minimal Wear**) \nPrice:**1335.36$**",
    "M4A4 Howl (**Field-Tested**) \nPrice:**801.08$**",
    "M4A4 Howl (**Well-Worn**) \nPrice:**880$**",
    "M4A1-S Knight (**Minimal Wear**) \nPrice:**330.01$**",
    "M4A1-S Hot Rod (**Minimal Wear**) \nPrice:**77.73$**",
    "AWP Medusa (**Minimal Wear**) \nPrice:**798$**",
    "AWP Medusa (**Field-Tested**) \nPrice:**677.15$**",
    "AWP Medusa (**Well-Worn**) \nPrice:**592.69$**",
    "AWP Medusa (**Battle-Scarred**) \nPrice:**580.01$**",
    "AWP Dragon Lore (**Minimal Wear**) \nPrice:**1608.97$**",
    "AWP Dragon Lore (**Field-Tested**) \nPrice:**1043.44$**",
    "AWP Dragon Lore (**Well-Worn**) \nPrice:**1030.83$**",
    "AWP Dragon Lore (**Battle-Scarred**) \nPrice:**915.29$**",
    "Bayonet 'Slaughter' (**Minimal Wear**) \nPrice:**187.48$**",
    "Bayonet 'Slaughter' (**Field-Tested**) \nPrice:**140.1$**",
    "M9 Bayonet 'Slaughter' (**Minimal Wear**) \nPrice:**234.07$**",
    "M9 Bayonet 'Slaughter' (**Field-Tested**) \nPrice:**190.26	$**",
    "Karambit 'Case Hardened' (**Minimal Wear**) \nPrice:**257.58$**",
    "Karambit 'Case Hardened' (**Field-Tested**) \nPrice:**228.7	$**",
    "Karambit 'Case Hardened' (**Well-Worn**) \nPrice:**195.68	$**",
    "Karambit 'Case Hardened' (**Battle-Scarred**) \nPrice:**182.71$**",
    "M9 Bayonet 'Marble Fade' (**Minimal Wear**) \nPrice:**498.15$**",
    "Bayonet 'Marble Fade' (**Minimal Wear**) \nPrice:**297.6$**",
    "M9 Bayonet 'Bright Water' (**Minimal Wear**) \nPrice**136.4$**",
    "M9 Bayonet 'Bright Water' (**Field-Tested**) \nPrice**115.63	$**",
    "M9 Bayonet 'Bright Water' (**Well-Worn**) \nPrice**102.13$**",
    "M9 Bayonet 'Bright Water' (**Battle-Scarred**) \nPrice**101.83$**",
    "Karambit 'Lore' (**Minimal Wear**) \nPrice:**748.02$**",
    "Karambit 'Lore' (**Field-Tested**) \nPrice:**347.65$**",
    "Karambit 'Lore' (**Well-Worn**) \nPrice:**348.81$**",
    "Karambit 'Lore' (**Battle-Scarred**) \nPrice:**244.97$**",
    "Gut Knife 'Gamma Doppler' (**Minimal Wear**) \nPrice:**125$**",
    "Gut Knife 'Freehand' (**Minimal Wear**) \nPrice:**68.82$**",
    "Gut Knife 'Freehand' (**Field-Tested**) \nPrice:**60.46$**",
    "Gut Knife 'Freehand' (**Well-Worn**) \nPrice:**64.84	$**",
    "Gut Knife 'Freehand' (**Battle-Scarred**) \nPrice:**52$**"
  ];
  var kasadancikanlar =
    kasadancikanlar[Math.floor(Math.random(1) * kasadancikanlar.length)];
  const embed = new Discord.RichEmbed()
    .setImage("https://cdn.wallpapersafari.com/40/16/8rTMh6.jpg")
    .setAuthor("Bot", csgopng)
    .setDescription(`${kasadancikanlar}`)
    .setFooter(
      `Kasayı açan (${message.author.username}) | Kasa Fiyatı: 80$ | Kasadan çıkan bütün ürünler sizde kalmaz sadece eğlence için yapılmış bir komutdur`
    )
    .setColor("RANDOM");
  return message.channel.sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["csgokasa"],
  permLevel: 0
};

exports.help = {
  name: "csgokasa",
  description: "CS:GO kasa açma simülasyonu",
  kategori:'eğlence',
  usage: "csgokasa"
};
