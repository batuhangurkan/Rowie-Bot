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
            .addField(`Results`,response.data.result)
						.addField(`Lokasyon Bilgisi`,response.data.lokasyon)
            .addField(`Koordinat`,response.data.coordinates)
            .addField(`Açıklama`,response.data.title)
            .addField(`mag`,response.data.mag)
            .addField(`lng`,response.data.lng)
            .addField(`lat`,response.data.lat)
						.setTimestamp();

					message.channel.send(exampleEmbed);
				})
				.catch((error) => {
					console.log(error);
				});
		}
		else {
			axios.get(`https://api.orhanaydogdu.com.tr/deprem/live.php?limit=1${args[0]}`)
				.then((response) => {
					const exampleEmbed = new Discord.RichEmbed()
						.setColor('RED')
						.setTitle(`${args[0]} - Deprem Bilgileri`)
						.addField(`Results`,response.data.result, true)
						.addField(`Lokasyon Bilgisi`,response.data.lokasyon, true)
            .addField(`Koordinat`,response.data.coordinates, true)
            .addField(`Açıklama`,response.data.title, true)
            .addField(`mag`,response.data.mag, true)
            .addField(`lng`,response.data.lng, true)
            .addField(`lat`,response.data.lat, true)
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
  aliases: ["corona", "covid", "covid19", "covıd", "virüs", "coronavirüs"],
  permLevel: 0
};

exports.help = {
  name: 'korona',
  description: 'Ülkelerdeki COVID-19 vakalarını inceyelebilirsiniz',
  usage: 'korona <ülke>'
};
//XiR Dev. Team