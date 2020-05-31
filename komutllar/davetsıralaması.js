const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let invites = await message.guild.fetchInvites().catch(error => {
        return message.channel.send('Davetleri GÖremiyorum');
    });

    invites = invites.array();

    let possibleinvites = [];
    invites.forEach(function(invites) {
        possibleinvites.push(`${invites.inviter.username} ||  ${invites.uses}`)
    })

    const embed = new Discord.RichEmbed()
        .addField('DAVET Sıralaması', `\`\`\`${possibleinvites.join('\n')}\`\`\``)
        .setTimestamp();
    message.channel.send(embed);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["top10", "davet-sıra"],
  permLevel: 0

};

exports.help = {
  name: 'davet-sıralaması',
  kategori:'moderasyon',
  description: 'Sunucunuza en çok kullanıcı getirenleri sıralar.',
  usage: 'davet-sıralaması',
 
};