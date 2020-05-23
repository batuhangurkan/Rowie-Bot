const Discord = require("discord.js");
const request = require("request")
const db = require("quick.db");
exports.run = async (client, message, args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
  let ilkkelime = args[0];
  let ikincikelime = args[1];
  if(!ilkkelime)
  if(!ikincikelime) 
    {
      message.channel.send("Lütfen yazmam için 2 tane sözcük giriniz.")
    }

    {
 
          
          {
            let embed = new Discord.RichEmbed()
            .setTitle(`İstediğiniz Şeyi Yazdım`) 
            .setColor("#ff0000")
            .setImage(`https://api.alexflipnote.dev/pornhub?text=${ilkkelime}&text2=${ikincikelime}`)
            message.channel.send(embed)
          }
      
    }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["pornhubyazı","ph"],
  permLevel: 0
};
exports.help = {
  name: "pornhub"
};