const Discord = module.require('discord.js');
const ayarlar = require('../ayarlar.json')
const prefix = ayarlar.prefix
const client = new Discord.Client();
module.exports.run = async (client, message, args) => {
  
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send('Bu komutu kullanabilmek için `Sunucuyu Yönet` yetkisi gerekmekte.')
  
       let kanal = message.guild.channels.get(args[0]);
       
       if(!kanal) {
         message.channel.send('Kanal Çekilişi Yapmak İçin Kanal İdsini Giriniz. Doğru kullanım **!sesliçekiliş <sesli kanal id>**')
       } 
        if(kanal) {
          const embed = new Discord.RichEmbed()
          .setAuthor(message.guild.name, message.guild.iconURL)
          .setColor('RANDOM')
          .setDescription("Çekilişi Kazanan: " + kanal.members.random().user ? kanal.members.random().user : "Kanalda Kimse Yok")
          .setTimestamp()
           .setFooter(`${client.user.tag} Çekiliş Sistemi`)
          message.channel.send(embed)
        }
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};
exports.help = {
  kategori:'moderasyon',
  name: 'sesliçekiliş'
};
