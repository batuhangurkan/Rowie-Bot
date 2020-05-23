const db = require("quick.db");
exports.run = function(bot, msg, args) {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
    if (args.length === 0) return msg.delete()

    let text = args.join(' ').toLowerCase().split('')

    let message = ''
    for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') message += text[i]
        else message = `${message} :regional_indicator_${text[i]}:`
    }

    msg.channel.send(message)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['eyaz', 'emoji-yaz'],
    permLevel: 0
};

exports.help = {
    name: 'emojiyaz',
    description: 'Emoji ile yazar.',
    usage: 'emojiyaz'
};