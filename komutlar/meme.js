const Discord = require('discord.js')
const randomPuppy = require('random-puppy')
const colors = require('../lib/colors.json')
const db = require("quick.db");
exports.run = async (client, message, args, level) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
  const subReddits = ['dankmeme', 'meme', 'memes', 'spicy_memes', 'me_irl']
  const random = subReddits[Math.floor(Math.random() * subReddits.length)]

  const img = await randomPuppy(random)
  const embed = new Discord.RichEmbed()
    .setColor(colors.default)
    .setImage(img)

  message.channel.send(embed)
}

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'meme',
  kategori:'eğlence',
  description: 'Searches for the dankest of memes in the dankest of subreddits.',
  usage: 'meme'
}
