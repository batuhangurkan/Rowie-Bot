const Discord = require("discord.js");
const db = require("quick.db");
exports.run = async (bot, message, args, color, prefix) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
    if (message.author.id !== '267604752764764160' && message.author.id !== '267604752764764160') return;
    try {
        let codein = args.join(" ");
        let code = eval(codein);

        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let embed = new Discord.RichEmbed()
        .setAuthor('Kod Deneme:')
        .setColor('RANDOM')
        .addField(':inbox_tray: Giriş:', `\`\`\`js\n${codein}\`\`\``)
        .addField(':outbox_tray: Çıkış', `\`\`\`js\n${code}\n\`\`\``)
        message.channel.send(embed)
    } catch(e) {
        message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kod-test'],
  permLevel: 0
};

exports.help = {
  name: 'eval',
  description: 'Botun Davet Linkini Gösterir',
  usage: 'eval'
};