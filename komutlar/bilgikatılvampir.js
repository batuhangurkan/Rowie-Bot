const Discord = require('discord.js');
const db = require('quick.db');
const talkedRecently = new Set();

exports.run = (client, message, args) => {
  message.delete();
  if (talkedRecently.has(message.author.id)) {
           return message.channel.send("`10` Dakikada da Bir Ben Geldim Çağrısı Yapabilirsiniz - " + message.author);
    } else {

           // the user can type the command ... your command code goes here :)

        // Adds the user to the set so that they can't talk for a minute
        talkedRecently.add(message.author.id);
        setTimeout(() => {
        message.delete();
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 600000);// Şuan 5 Saniyedir Değiştirebilirsiniz.
    }  
  const roller = ["Köylü", "Çiftci", "Oduncu", "İmam", "Seyyar", "Gezgin", "Gazeteci", "Mimar", "Gezgin", "Aşçı", "Dansçı", "Bankacı", "Barmen"]
  const rolata = roller[Math.floor(Math.random()*roller.length)];
  
  const embed = new Discord.RichEmbed()
     .setColor('RANDOM')
    .setDescription(`
 <@${message.author.id}> ${rolata}
`,true)
        .setFooter(`Vampir Köylü Oyunu..`)
    let vkkimne = message.guild.channels.find(`name`, "🧛ᴠᴋ-ᴋɪᴍ-ɴᴇ"); 
    vkkimne.send(embed)
    message.author.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'vampirkatıl',
  description: 'Vampir Köylü Katılma.',
  usage: 'vampirkatıl'
};