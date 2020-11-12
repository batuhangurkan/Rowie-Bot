const Discord = require('discord.js');

exports.run = (client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Yetersiz Yetki");
    let kullanici = args[0];
    if (!kullanici) return message.channel.send("Bir kullanıcı ID girmen gerek")
    message.guild.fetchBans()
        .then(bans => {
            if (!bans.has(kullanici)) {
                return message.channel.send(`Bu kullanıcı banlanmamış.`)
            }
        })
    message.guild.fetchBan(kullanici).then(({ user, reason }) => {
        message.channel.send(`${user.tag} adlı kullanıcının ban nedeni: **${reason}**`)

    })
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [''],
    permLevel: 0
};

exports.help = {
    name: 'ban-sorgu',
    description: '',
    usage: ''
};