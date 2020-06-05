const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
const snekfetch = require('snekfetch');

exports.run = async (client, message, args) => {
  try {
        const query = args.join(" ")
        if (query < 1) return message.channel.send("Aramam için kelime girmen gerek")
        const fetch = snekfetch
            .get('https://api.nytimes.com/svc/search/v2/articlesearch.json')
            .query({
                'api-key': "aca2AkFZ22ewAgKRGCEAkLpuQlXwlk0K",
                sort: 'newest'
            });
        if (query) fetch.query({ q: query });
        const { body } = await fetch;
        if (!body.response.docs.length) return message.say('Hiçbir sonuç bulunamadı.');
        const data = body.response.docs[Math.floor(Math.random() * body.response.docs.length)];
        const embed = new Discord.RichEmbed()
            embed.setColor(0x00A2E8)
            embed.setAuthor('New York Times', 'https://i.imgur.com/ZbuTWwO.png', 'https://www.nytimes.com/')
            embed.addField('Yayınlanma tarihi', new Date(data.pub_date).toDateString(), true)
            embed.setURL(data.web_url)
            embed.setTitle(data.headline.main)
            embed.setDescription(data.snippet);
            embed.addField(`Detaylar`,data.lead_paragraph)
      
        return message.channel.send(embed);
    } catch (err) {
        return;
    }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["nyt","haberler","yabancıhaberler"],
  permLevel: 0
};

exports.help = {
  name: 'newyorktimes',
  description: 'New York Times da haberlere bakarsınız',
  usage: 'newyorktimes <aranacak kelime>'
};
//XiR