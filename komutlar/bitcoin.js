const snekfetch = require("snekfetch");
const db = require("quick.db");
exports.run = async (bot, message, args) => {
    snekfetch.get("https://blockchain.info/ticker").then((body) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
        message.channel.send({
            embed: {
                title: "Bitcoin Değer",
                description: "Değerlerin her biri, farklı ülkelerde değişecek olan bir Bitcoin'in değeridir.",
                color: 3066993,
                fields: Object.keys(body.body).map((c) => {
                    return {
                        name: c,
                        value: "**Fiyat**: " + body.body[c].symbol + body.body[c].buy + "\n**Satış Değeri**: " + body.body[c].symbol + body.body[c].sell,
                        inline: true
                    }
                })
            }
        })
    }).catch((error) => {
        message.channel.send({
            embed: {
                title: "HATA!",
                color: 0xE50000,
                description: "Bitcoin fiyatlarını alırken beklenmeyen bir hata oluştu."
            }
        })
        console.error("Bitcoin Bilgisi alınamad", error.message)
        
    })
    
}
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["bc"],
  permLevel: 0
};
module.exports.help = {
  name: 'bitcoin',
  description: 'Ülkelerin bitcoin değerlerini gösterir',
  kategori:'bilgi',
  usage: 'bitcoin'
};