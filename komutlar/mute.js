const Discord = require("discord.js")
const ms = require("ms")
const db = require("quick.db");
module.exports.run = async (bot, message, args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')

    if (!message.member.hasPermissions ('MANAGE_MESSAGES')) return message.channel.send("Yapmak İçin Mesajları Yönet Yetkisine Sahip Olmalısın.")
    const mod = message.author;
    let guild = message.guild
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!user) return message.channel.sendEmbed(new Discord.RichEmbed().setColor('RANDOM').setAuthor("Hata").setDescription(`Kullanıcı Bulunamadı`))
    let modlog = guild.channels.find('name', 'mute-log');
   if (!modlog) return message.reply('`ceza-takip` kanalını bulamıyorum.');
    let reason = message.content.split(" ").slice(2).join(" ");
    if (!reason) return message.channel.sendEmbed(new Discord.RichEmbed().setColor('RANDOM').setAuthor("Hata").setDescription(`Mute sebebini yazmalısın!`))
    let muterole = message.guild.roles.find(x => x.name === 'Muted');
    if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: 'Muted',
                color: '#000000',
                permission: [] 
            });
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTION: false,
                    CONNECT: false
                });
            });
        } catch(e) {
            console.log(e.message);
        }
    }
  


     await (user.addRole(muterole.id));
    const muteembed = new Discord.RichEmbed()
            .setAuthor('Eylem: Susturma')
            .addField('Kullanıcı', `<@${user.id}>`)
            .addField('Sebep', `${reason}`)
            .addField('Yetkili', `${mod}`)
            .setColor('RANDOM')
  return guild.channels.get(modlog.id).send(muteembed);
}


exports.conf = {
    enables: true,
   guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: "mute",
    description: "Etiketlenen Kişinin Mutesini Geri Alır",
  kategori:'moderasyon',
    usage:  "unmute [kullanıcı] [sebep]",
}