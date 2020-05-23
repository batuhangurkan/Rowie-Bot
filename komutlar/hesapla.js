const Discord = require('discord.js');
const math = require('math-expression-evaluator')
const db = require("quick.db");
const stripIndents = require('common-tags').stripIndents



exports.run = function(client, message, args) {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
    var soru = args.join(' ');
    
    if(!soru) return message.reply('Bir işlem belirtin. **Doğru Kullanım**: !hesapla <işlem>')
    else { let cevap;
        try {
            cevap = math.eval(soru)
        } catch(err) {
            message.channel.send('Hatalı işlem: **' + err)
        }

        const embed = new Discord.RichEmbed()
        .addField('Soru', soru)
        .addField('Cevap', cevap)

        message.channel.send(embed)
    }


};  

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'hesapla', 
  description: 'Matematik İçin Lazım Olacak.',
  usage: 'hesapla <işlem>'
};