const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (bot, message, args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')

    let replies = ["https://media.giphy.com/media/ce1GYoBZBMbkO9SUjq/giphy.gif", "https://media.giphy.com/media/BNgXhny4MvIeOG5fzG/giphy.gif", "https://media.giphy.com/media/pVwsBrZyxOlfa/giphy.gif", "https://media.giphy.com/media/13cdA48uycje5G/giphy.gif", "https://media.giphy.com/media/2uyoGXXvRhpLMZSPQf/giphy.gif", "https://media.giphy.com/media/10K79RHwcm23M4/giphy.gif", "https://media.giphy.com/media/jlVObChD6Fb5C/giphy.gif"];

    let result = Math.floor((Math.random() * replies.length));

    let gifembed = new Discord.RichEmbed()
        .setTitle("Anime Gifiniz <a:heart:553341691822866442>")
        .setColor("#FF69B4")
        .setFooter(`Gifiniz Elinizde!`, message.author.avatarURL)
        .setImage(replies[result]);

    message.channel.send(gifembed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['tokyo-ghoul','tokyog'],
  permLevel: 0
};

exports.help = {
  name: 'tokyo-ghoul',
  description: 'Rastgele anime tokyo gifi atar.',
  kategori:'eğlence',
  usage: 'tokyo-ghoul'
}; 