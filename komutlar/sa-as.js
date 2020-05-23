const db = require('quick.db')
const Discord = require('discord.js')
 
 
exports.run = async (bot, message, args) => {
  if (!args[0]) return message.channel.send(`Aç yada kapat yazmalısın!! Örnek: **!sa-as aç**`)
  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(' Bu komutu kullanmak için \`MESAJLARI_YÖNET\` yetkisine sahip olmalısın!')
 
  if (args[0] == 'aç') {
    db.set(`ssaass_${message.guild.id}`, 'acik').then(i => {
      message.channel.send(`Artık bot Sa diyince As diyecek. Kapatmak için "\`!sa-as kapat\`" yazmalısın.`)
    })
  }
  if (args[0] == 'kapat') {
    db.set(`ssaass_${message.guild.id}`, 'kapali').then(i => {
      message.channel.send(`Artık biri sa diyince cevap vermicek.`)
    })
  }
 
}
//codare
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sa-as-sistemi'],
  permLevel: 0,
  kategori: "Ayarlar"
};
 
exports.help = {
  name: 'sa-as',
  description: 'Sa As ayarlarsın.',
  usage: 'sa-as'
};