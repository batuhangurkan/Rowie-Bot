const Discord = require('discord.js')
const db = require("quick.db");
exports.run = (client, message, args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
  let user = message.mentions.users.first();
  if(!user) return message.channel.send('Öpüceğin birisini etiketlemelisin')
  if (user.id === message.author.id) return message.reply('Kendini öpemezsin! ');

    
  if ( message.react('😍')) {
      var gif = [
      'https://media.giphy.com/media/l2SpQaZIPgpdwBTI4/giphy.gif', 'https://media.giphy.com/media/3oz8xIZrAhijabg69a/giphy.gif', 'https://media.giphy.com/media/Ij1cbMbIWDKDK/giphy.gif', 'https://media.giphy.com/media/l2JegJ1EAA2NIxEWY/giphy.gif', 'https://media.giphy.com/media/3o6ozHbQHZzDTxRjsA/giphy.gif', 'https://media.giphy.com/media/3o7TKqhF898sKm6opy/giphy.gif', 'https://media.giphy.com/media/3o72F3zlbWvP4kJp4c/giphy.gif', 'https://media.giphy.com/media/j1l1QRW2YMAec/giphy.gif', 'https://media.giphy.com/media/Tg63mUZMIFZGE/giphy.gif', 'https://images-ext-1.discordapp.net/external/JupcoZ9URe0yP9NfGYNUrzPF1uc4-YcHMZNSuggd3R4/https/media.giphy.com/media/KH1CTZtw1iP3W/giphy.gif', 'https://images-ext-2.discordapp.net/external/a7_ew-TdpOqettkX4cbFWWrBNikre9mMx-emwilsXgA/https/media.giphy.com/media/nyGFcsP0kAobm/giphy.gif', 'https://images-ext-2.discordapp.net/external/Qqd0nsaOu0lLP_yUb4GWQlHfwZnqjihjLN8mpIdoRVk/https/media.giphy.com/media/10auZsno9vVHwc/giphy.gif', 'https://images-ext-1.discordapp.net/external/J8nMQa1I5QBdh_SCIGIHWoCjZJQy9XqhQMKBjJSKbW0/https/media.giphy.com/media/QweWddrIQxlfi/giphy.gif', 'https://images-ext-1.discordapp.net/external/zSLTSJM1WZ_iic7YLR80ygFK7F3MbDKMj6aXgvIABXM/https/media.giphy.com/media/kU586ictpGb0Q/giphy.gif'];

      var gifler = gif[Math.floor(Math.random() * gif.length)];
  }
    
    if (message.react('😍')) {
    const op = new Discord.RichEmbed()
    .setDescription(`<@${message.author.id}>` + ` <@${user.id}>'ı öptü <3`)
    .setColor('RANDOM')
    .setImage(gifler)
    return message.channel.send(op)
    }
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'öp',
  description: 'kiss',
  usage: 'öp'
};