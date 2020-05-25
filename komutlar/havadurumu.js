const Discord = require('discord.js');
const weather = require('weather-js');
const db = require("quick.db");
exports.run = (client, message, args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
  weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
      if (err) message.channel.send(err);
      if (result === undefined || result.length === 0) {
          message.channel.sendEmbed(new Discord.RichEmbed().setDescription('Lütfen bir yer gir.').setColor('RANDOM'));
          return;
      }
      var current = result[0].current;
      var location = result[0].location;
      const embed = new Discord.RichEmbed()
          .setDescription(`**${current.skytext}**`)
          .setAuthor(`${current.observationpoint} için hava durumu`)
          .setThumbnail(current.imageUrl)
          .setColor(0x00AE86)
          .addField('● Zaman Dilimi',`UTC${location.timezone}`, true)
          .addField('● Derece Türü',location.degreetype, true)
          .addField('● Sıcaklık',`${current.temperature} Derece`, true)
          .addField('● Hava', `${current.feelslike}`, true)
          .addField('● Rüzgar',current.winddisplay, true)
          .addField('● Nem', `${current.humidity}%`, true)
          message.channel.send({embed});
  })
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['coronadurumu', 'YEDEK KOMUT2'],
  permLevel: "0"
};

exports.help = {
  name: "havadurumu",
  description: "hava durumunu gösterir",
  kategori:'bilgi',
  usage: "havadurumu"
};