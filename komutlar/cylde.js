const Discord = require("discord.js");
const client = new Discord.Client()
const { get } = require("superagent");
module.exports.run = async (bot, message, args) => {
    try {
        if(!args[0]){
message.channel.send('? **UYARI**\n`Yazı giriniz Türkçe karakter kullanmayınız Örnek: **ı** yerine **i** giriniz.!`')
return;
}
        let url = `https://nekobot.xyz/api/imagegen?type=clyde&text=${args.join(" ")}`
        get(url).then(res => {
            const embed = new Discord.RichEmbed()
            .setColor("0xFFB6C1")
            .setAuthor("Clyde diyorki..")
            .setImage(res.body.message)
            setTimeout(() => {
                return message.channel.send(embed);
            }, 200);
        }); 
}catch(err) {
        console.log(err)    
    }
}
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["cl"],
  permLevel: 0
};

module.exports.help = {
  name: 'clyde',
  description: 'clyde ye yazı yazdırırsınız',
  kategori:'eğlence',
  usage: 'clyde <yazı>'
};
//XiR