const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
const axios = require('axios');
const db = require("quick.db");
exports.run = async (client, message, args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')

if (!args.length) {
			axios.get('https://api.orhanaydogdu.com.tr/deprem/live.php')
				.then((response) => {
					const exampleEmbed = new Discord.RichEmbed()
						.setColor("BLUE")
						.setTitle('Türkiye Deprem Bilgileri')
            .addField(`Status`,response.data.status)
            .addField(`Result`,response.data.result)
						.setTimestamp();

					message.channel.send(exampleEmbed);
				})
				.catch((error) => {
					console.log(error);
				});
		}
		else {
			axios.get(`https://api.orhanaydogdu.com.tr/deprem/live.php?limit=1`)
				.then((response) => {
					const exampleEmbed = new Discord.RichEmbed()
						.setColor('RED')
						.setTitle(`${args[0]} - Deprem Bilgileri`)
						.addField(`Status`,response.data.status)
            .addField(`Result`,response.data.result)
            .addField(`mag`,response.data.mag)
            .addField(`lng`,response.data.lng)
            .addField(`lat`,response.data.lat)
          	.addField(`Lokasyon Bilgisi`,response.data.lokasyon)
            .addField(`Büyüklük`,response.data.depth)
            .addField(`Koordinat`,response.data.coordinates)
            .addField(`Açıklama`,response.data.title)
						.setTimestamp();
          console.log(response)
					message.channel.send(exampleEmbed);
				})
				.catch((error) => {
          message.channel.send(':x: Hata \n Lütfen ülke girerken global olarak giriniz. Örnek: Turkey veya turkey şeklinde girebilirsiniz.')
					console.log(error);
				});
		}
}
    

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["deprem"],
  permLevel: 0
};

exports.help = {
  name: 'deprem',
  description: 'Ülkelerdeki COVID-19 vakalarını inceyelebilirsiniz',
  usage: 'deprem'
};
//XiR Dev. Team