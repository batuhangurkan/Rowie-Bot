const Discord = require('discord.js');
const request = require('node-superfetch');
const db = require('quick.db');
const { stripIndents } = require('common-tags');
exports.run = async (client, msg, args) => {
    try {
                const sorted = msg.guild.members.filter(u => !u.user.bot).array().sort((a, b) => { return (db.fetch(`seviye_${b.user.id + msg.guild.id}`) ? db.fetch(`seviye_${b.user.id + msg.guild.id}`) : 0) - (db.fetch(`seviye_${a.user.id + msg.guild.id}`) ? db.fetch(`seviye_${a.user.id + msg.guild.id}`) : 0) });
                const top10 = sorted.splice(0, 10)
                const mappedXp = top10.filter(o => !o.bot).map(s => db.fetch(`puancik_${s.user.id + msg.guild.id}`))
                const mappedLevel = top10.filter(o => !o.bot).map(s => db.fetch(`seviye_${s.user.id + msg.guild.id}`) || 0)
                const mappedName = top10.filter(o => !o.bot).map(s => s.user.tag);
                const mappedID = top10.filter(o => !o.bot).map(s => s.user.id);
   let sayi = 1
   const map = top10.map(s => `[${sayi++}]: ${s.user.tag}\n # Seviye: ${db.fetch(`seviye_${s.user.id + msg.guild.id}`) || 0} | XP: ${db.fetch(`puancik_${s.user.id + msg.guild.id}`) || 0}`.replace(msg.author.tag, `> ${msg.author.tag}`)).join('\n\n')
  msg.channel.send(`**${msg.guild.name} - Seviye Liderlik Tablosu**`)
                msg.channel.send(stripIndents`
\`\`\`markdown
${map}
\`\`\`
   `)
    } catch (err) {
      msg.channel.send('hata çıktı;' + err)
}
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["leaderboard", "leadership"],
  permLevel: 0 
};
exports.help = {
  name: 'seviye-liderlik',
  description: 'Seviye sisteminin sunucudaki liderlik tablosunu gösterir.',
  kategori:'bilgi',
  usage: 'seviye-liderlik'
};