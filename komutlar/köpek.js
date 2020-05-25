const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (bot, message, args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')

    let replies = ["https://media.giphy.com/media/aCqb9YW7QclN3rtto5/giphy.gif", "https://media.giphy.com/media/4Zo41lhzKt6iZ8xff9/giphy.gif", "https://media.giphy.com/media/QvBoMEcQ7DQXK/giphy.gif", "https://media.giphy.com/media/Y4pAQv58ETJgRwoLxj/giphy.gif", "https://media.giphy.com/media/f4HpCDvF84oh2/giphy.gif", "https://media.giphy.com/media/bbshzgyFQDqPHXBo4c/giphy.gif", "https://media.giphy.com/media/kiBcwEXegBTACmVOnE/giphy.gif", "https://media.giphy.com/media/1xOOQSMJ9X4UykElSk/giphy.gif", "https://media.giphy.com/media/SB5fjrUhAeLte/giphy.gif", "https://media.giphy.com/media/9rtpurjbqiqZXbBBet/giphy.gif", "https://media.giphy.com/media/11tLJ4XVXqWHSg/giphy.gif"];

    let result = Math.floor((Math.random() * replies.length));

    let gifembed = new Discord.RichEmbed()
        .setTitle("Köpeğiniz;")
        .setColor("#FF69B4")
        .setFooter(`Köpüşün ${message.author.tag} `, message.author.avatarURL)
        .setImage(replies[result]);

    message.channel.send(gifembed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'köpek',
  description: 'Rastgele köpek gif atar.',
  kategori:'eğlence',
  usage: 'köpek'
};