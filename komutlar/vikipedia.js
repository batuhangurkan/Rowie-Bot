const Discord = require("discord.js");
const request = require('node-superfetch');
const db = require("quick.db");
module.exports.run = async (bot, msg, args) => {if(db.fetch(`bakim`)) return msg.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
    try {
        var query = args.join(" ");
        if(!query) msg.channel.sendEmbed(new Discord.RichEmbed().setTitle(":x: HATA").setDescription("Arama yapmam için arayacağım şeyi yazmanız gerek").setColor("RED"))
        var  { body } = await request
        .get('https://tr.wikipedia.org/w/api.php')
        .query({
            action: 'query',
            prop: 'extracts|pageimages',
            format: 'json',
            titles: query,
            exintro: '',
            explaintext: '',
            pithumbsize: 150,
            redirects: '',
            formatversion: 2
        })

       var data = body.query.pages[0];
			if (data.missing) return msg.channel.sendEmbed(new Discord.RichEmbed().setTitle(":x: HATA").setDescription("Sonuç bulunamadı."))
			var embed = new Discord.RichEmbed()
				.setTitle(data.title)
				.setAuthor("Wikipedia", "https://i.postimg.cc/xTyhqQ8z/xir-vikipedia.png", "https://www.wikipedia.org/")
				.setThumbnail(data.thumbnail ? data.thumbnail.source : null)
				.setURL(`https://tr.wikipedia.org/wiki/${encodeURIComponent(query).replace(/\)/g, "%29")}`)
                .setDescription(data.extract.replace(/\n/g, '\n\n'))
                .setColor("WHİTE");
                msg.channel.send(embed)
    } catch (error) {
        msg.channel.sendEmbed(new Discord.RichEmbed().setTitle(":x: HATA").setDescription(error).setColor("RED"))
    }
    
}
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["viki","vikipedia","wikipedia","wiki","vikipedi"],
  permLevel: 0
};

module.exports.help = {
  name: 'vikipedia',
  description: 'Wikipedia sitesinde arama yaparsınız',
  usage: 'vikipedi'
};
//XiR