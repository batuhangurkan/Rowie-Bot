const Discord = require("discord.js")
const db = require("quick.db");
const Canvas = require('canvas')
    , Image = Canvas.Image
    , Font = Canvas.Font
    , path = require('path');
const snekfetch = require('snekfetch');
const request = require('node-superfetch');
module.exports = async member => {  
  let paket = await db.fetch(`pakets_${member.id}`)
  let memberChannel = await db.fetch(`hgKanal_${member.guild.id}`)
  
  const canvas = Canvas.createCanvas(360, 250);
	const ctx = canvas.getContext('2d');
  
  const background = await Canvas.loadImage('https://cdn.glitch.com/69a6f8b5-f87d-478b-bb86-ce2cffe09e86%2Floxy%C3%87%C4%B1k%C4%B1%C5%9F.png?1551376545565');
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
  
  const attachment = new Discord.Attachment(canvas.toBuffer(), 'LOXYsLeftTheChat.png');
  if (paket === 'platinum-paket') {
    member.guild.channels.get(memberChannel).send(attachment)
    member.guild.channels.get(memberChannel).send(`ğŸ“¢ğŸ’  Sunucudan bir **Platinum Ãœye** ayrÄ±ldÄ±! \`${member.user.tag}\` gÃ¶rÃ¼ÅŸÃ¼rÃ¼z!`)
  } else {
  member.guild.channels.get(memberChannel).send(attachment)
  member.guild.channels.get(memberChannel).send(`GÃ¶rÃ¼ÅŸÃ¼rÃ¼z, ${member} ğŸ‘‹`);
  if (member.user.bot) return member.guild.channels.get(memberChannel).send(`ğŸ¤– Bu bir bot, ${member.user.tag}`)
  }
}
