const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (bot, message, args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')

    let replies = ["https://media.giphy.com/media/p4w0AMZJa2EtG/giphy.gif", "https://media.giphy.com/media/OfNcqqDc9Aj8k/giphy.gif", "https://media.giphy.com/media/QfjKnESCZtixi/giphy.gif", "https://media.giphy.com/media/7iijl1KFJFduw/giphy.gif", "https://media.giphy.com/media/NNVrFKZF3s61W/giphy.gif", "https://media.giphy.com/media/lXd5WPKX2F26c/giphy.gif",];

    let result = Math.floor((Math.random() * replies.length));

    let gifembed = new Discord.RichEmbed()
        .setTitle("Guts;")
        .setColor("#FF69B4")
        .setFooter(`Guts ${message.author.tag} `, message.author.avatarURL)
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
  name: 'berserk',
  description: 'Rastgele kedi gif atar.',
  usage: 'gif'
};