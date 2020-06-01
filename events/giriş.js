const Discord = require("discord.js")
const db = require("quick.db");
const Canvas = require('canvas')
    , Image = Canvas.Image
    , Font = Canvas.Font
    , path = require('path');
const snekfetch = require('snekfetch');
const request = require('node-superfetch');
Canvas.registerFont('./warsawgothicext.otf', { family: 'Warsaw' })
module.exports = async member => {
    var randomMsg = ["savaş otobüsüne katıldı.",
                    "partiye katıldı.",
                    "oyun başlattı.",
                    "drop geliyor, dropa koşun.",
                    "nişan aldı ve ateeeş.",
                    "vuruldu yardım edin.",
                    "midi smokeluyorum.",
                    "longda bir adam var.",
                    "adamı düşürdüm lootlayın adamı.",
                    "t base afk.",
                    "adam hile ya.",      
                    ];
    var randomMsg_integer = randomMsg[Math.floor((Math.random() * randomMsg.length))]
  let msj = await db.fetch(`memberGiris_${member.guild.id}`)
  if (!msj) msj = `{uye}, ${randomMsg_integer}`
  let paket = await db.fetch(`pakets_${member.id}`)
  let memberChannel = await db.fetch(`hgKanal_${member.guild.id}`)
  
  const canvas = Canvas.createCanvas(360, 250);
  const ctx = canvas.getContext('2d');
  
  const background = await Canvas.loadImage('https://cdn.glitch.com/69a6f8b5-f87d-478b-bb86-ce2cffe09e86%2FloxyGiri%C5%9F.png?1551376545491');
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
  ctx.strokeStyle = '#74037b';
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = `#D3D3D3`;
  ctx.font = `35px "Warsaw"`;
  ctx.textAlign = "center";
  ctx.fillText(`${member.user.username.toUpperCase()}`, 180, 220);
  
  let avatarURL = member.user.avatarURL || member.user.defaultAvatarURL
  const { body } = await request.get(avatarURL);
  const avatar = await Canvas.loadImage(body);
  
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill()
  ctx.lineWidth = 4;
  ctx.arc(125 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
  ctx.clip();
  ctx.drawImage(avatar, 125, 55, 110, 110);
  
  const attachment = new Discord.Attachment(canvas.toBuffer(), 'LOXYsWelcome.png');
  if (paket === 'platinum-paket') {
    member.guild.channels.get(memberChannel).send(attachment)
    member.guild.channels.get(memberChannel).send(`📢💠 Sunucuda bir **Platinum Üye** belirdi. \`${member.user.tag}\` hoşgeldin!`)
  } else {
  member.guild.channels.get(memberChannel).send(attachment)
  member.guild.channels.get(memberChannel).send(msj.replace('{uye}', member).replace('{sunucu}', member.guild.name))
  if (member.user.bot) return member.guild.channels.get(memberChannel).send(`🤖 Bu bir bot, ${member.user.tag}`)
  }
}
