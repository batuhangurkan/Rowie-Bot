const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
const snekfetch = require('snekfetch');
 
exports.run = async (client, message, args) => {
    try {
        const query = args.join(" ")
        const { body } = await snekfetch
            .get('https://developer.mozilla.org/tr/search.json')
            .query({
                q: query,
                locale: 'tr',
                highlight: false
            });
        if (!body.documents.length) return message.channel.send('Hiçbir sonuç bulunamadı.');
        const data = body.documents[0];
        const embed = new Discord.RichEmbed()
            embed.setColor(0x066FAD)
            embed.setAuthor('Mozilla Developer', 'https://i.imgur.com/DFGXabG.png', 'https://developer.mozilla.org/')
            embed.setURL(data.url)
            embed.setTitle(data.title)
            embed.setDescription(data.excerpt);
        return message.channel.send(embed);
    } catch (err) {
        return message.channel.send(`Hata - Hata mesajı: \`${err.message}\`. tekrar deneyiniz.!`);
    }
}
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["devmozilla","mozilladev","developermozilla","developermozilla","mdn"],
  permLevel: 0
};
 
exports.help = {
  name: 'mozilla',
  description: 'Mozilla nın geliştirici sitesinden arama yaparsınız.',
  usage: 'mozilla <aranacak kelime>'
};
//XiR