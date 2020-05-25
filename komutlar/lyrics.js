const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  
    args.song = args.join(' ');

const lyric = require('../ek/lyrics')
  
  let yanıt = await lyric(`/song/${args.song}`);

  if (yanıt.error) {
    const embed = new Discord.RichEmbed()
    .setColor(0x36393E)
    .setTitle('Bulunamadı.')
    .setDescription(`**${args.song}** adında lyrics bulunamadı. Doğru şarkıyı aradığına eminsen arama terimine şarkı sahibinide ekle ve yeniden dene.`)
    return await message.channel.send(embed);
  }
const bmended = new Discord.RichEmbed()
.setColor(0x36393E)
.setAuthor(yanıt.artist.name, yanıt.artist.image)
.setTitle(yanıt.name)
.setDescription(yanıt.lyrics.length > 2048
               ? `${yanıt.lyrics.substring(0,2045)}...`
               : yanıt.lyrics)
.setThumbnail(yanıt.image)
  await message.channel.send(bmended);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0  
};

exports.help = {
  name: 'lyrics',
  description: 'Belirtilen şarkının sözlerini atar.',
  kategori:'genel',
  usage: 'lyrics [ŞARKI] [ARTIST]',
};

///////////////