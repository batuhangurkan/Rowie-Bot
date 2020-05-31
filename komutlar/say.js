const Discord = require('discord.js');
exports.run = async (client, message, args) => {
    let tag = "TAGINIZI BURAYA YAZIN" 
    const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
    const fc = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField("Sunucudaki üye sayısı", message.guild.memberCount)
        .addField("Çevrimiçi üye sayısı", message.guild.members.filter(m => !m.user.bot && m.user.presence.status !== "offline").size)
        .addField("Seslideki üye sayısı", count)
        .addField("Tagdaki üye sayısı", message.guild.members.filter(m => m.user.username.includes(tag)).size) // EĞER TAG YAZMADYISANIZ BURAYI VE YUKARIDAKİ TAGINIZI URAYA YAZIN SATIRINI SİLİN
        .setFooter(`${message.author.tag} tarafından istendi`, message.author.avatarURL)
    message.channel.send(fc);
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['say'],
    permLevel: 0
};
exports.help = {
    name: 'say',
  kategori:'genel',
    description: 'Say',
    usage: 'say'
};
