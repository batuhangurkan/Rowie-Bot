const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
const db = require("quick.db");
module.exports.run = async (client,message,args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
var sahip = message.guild.members.get("267604752764764160")
if (message.member !== sahip)return message.channel.send("**Hey, `" + message.author.username + "` Sahibimin komutunu kullanamazsın.!**");

    try {
        if (!/^(https?:\/\/)((([-a-z0-9]{1,})?(-?)+[-a-z0-9]{1,})(\.))+([a-z]{1,63})\/((([a-z0-9._\-~#%])+\/)+)?([a-z0-9._\-~#%]+)\.(jpg|jpeg|gif|png|bmp)$/i.test(args.join(' '))) {

          return message.channel.send("Geçersiz Link.");
        }
    
        await client.user.setAvatar(args.join(' '));

        let embed = new Discord.RichEmbed()
        .setDescription(`${client.user.username} Avatar Değiştirildi`)
        .setImage(args.join(' '));
        
        message.channel.send(embed);
      }
      catch (e) {
        console.error(e);
      }

}

module.exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ["bavatar","avatarbot"],
   permLevel: 0
 };

 module.exports.help = {
   name: 'botavatar',
   description: 'Botun avatarını değiştirir.',
   usage: 'botavatar'
 };
//XiR
