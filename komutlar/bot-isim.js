const Discord = require('discord.js');
const db = require('quick.db')
const moment = require('moment')
exports.run = async(client, message, args) => { 
  
  if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Bot ismini değiştirmek için yeterli yetkiye sahip değilsin.");  
  

  let DarkCode = args.slice(1).join(' ');

  if(!DarkCode ) return message.reply('Botun değiştirilecek ismini belirtmelisin.')
  
  if(DarkCode === client.user.username ) message.reply('Belirttiğiniz isim bot ismiyle aynı.')
  
  message.guild.members.get(client.user.id).setNickname(DarkCode )
  
  
  message.channel.send(':tada: Botun ismi,**'+message.guild.name+'** Sunucusunda **'+DarkCode +'** olarak güncellendi.')
  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ['bot-ismi'], 
  permLevel: 0
};

exports.help = {
  name: 'bot-isim',
  kategori:'moderasyon',
  description: 'taslak', 
  usage: 'bot-isim'
};