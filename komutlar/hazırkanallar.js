
const Discord = require('discord.js');
const db = require("quick.db");

exports.run = (client, message, args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
    message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Komut giriişi').setDescription('Gerekli Dosaylar Kurulsunmu?.').setFooter('Bu eylemi onaylıyorsan "Evet" yazman yeterlidir.Bu eylem 30 saniye içinde sona erecek'))
.then(() => {
message.channel.awaitMessages(response => response.content === 'evet', {
max: 1,
time: 30000,
errors: ['time'],
})
.then((collected) => {
        message.guild.createChannel(`mod-log`, 'text');
        message.guild.createChannel(`ban-kanalı`, 'text');
        message.guild.createChannel(`kick-kanalı`, 'text');
        message.guild.createChannel(`mute-log`, 'text');
        message.guild.createChannel(`başvuru`, 'text');
        message.guild.createChannel(`⚠kurallar⚠`, 'text');
        message.guild.createChannel(`duyuru`, 'text');
        message.guild.createChannel(`bot-komut`, 'text');

        message.channel.send(`Gerekli Kanalları Oluşturdum.`);
    });
});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'hazır-kanallar',
  description: 'Bot İçin gerekli kanlları kurar.',
  kategori:'moderasyon',
  usage: '!hazır-kanallar'
};