const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
var ayarlar = require('../ayarlar.json');

const aç = ['aç', 'open']
const kapat = ['kapat', 'close']
let spamEngel = JSON.parse(fs.readFileSync("./ayarlar/spamEngel.json", "utf8"));

 exports.run = (client, message, args) => {
   
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply(`Bu komutu kullanabilmek için **Kanalları Yönet** iznine sahip olmalısın!`);

   if(!args[0]) return message.channel.send("aç yada kapat yazmalısın!")
   
  if(aç.includes(args[0])){
    
    message.channel.send("Spam engel başarıyla açıldı")
    
    db.set(`spamEngel_${message.guild.id}`, "açık")
    
  }
   
     if(kapat.includes(args[0])){
    
    message.channel.send("Spam Engel başarıyla kapatıldı")
    
    db.set(`spamEngel_${message.guild.id}`, "kapalı")
    
  }
          };

       
         
  

    exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ['']
      };

      exports.help = {
        name: 'anti-spam',
        kategori:'moderasyon',
        description: 'anti-spam-ayarla',
        usage: 'anti'
      };