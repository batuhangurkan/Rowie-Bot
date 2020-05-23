const Discord = require('discord.js');
 const db = require("quick.db");
exports.run = function(client, message) {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
    const embed = new Discord.RichEmbed()
        .setDescription("**WOODIE**")
        .setImage("https://vignette.wikia.nocookie.net/dont-starve-game/images/2/23/Woodie.png/revision/latest/scale-to-width-down/350?cb=20140330212814")
        .setThumbnail("https://vignette.wikia.nocookie.net/dont-starve-game/images/2/23/Woodie.png/revision/latest/scale-to-width-down/350?cb=20140330212814")
        .setColor(0x00AE86)
        .addField("Lakabı", "The Lumberjack (Oduncu)", true)
        .addField("Yetenekleri", `
        *Çok güzel bir baltası var
   *Korkunç bir sırrı var (Werebeaver)
   `, true)
   .addField("Motto", `That's nice tree, eh? (güzel ağaç, ha?)`, true)
   .addField("selam", "haha naber")
   
   message.channel.send(embed)
};
exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [],
  permLevel: 0 
};
exports.help = {
  name: 'woodie', 
  description: 'Woodie the Lumberjack hakkında bilgi verir',
  usage: 'woodie'
};
