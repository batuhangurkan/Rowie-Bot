const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db");
var prefix = ayarlar.prefix;
exports.run = (client, message, args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
    const embedyardim = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setAuthor(`${client.user.username} `, client.user.avatarURL) 
      .setDescription('**!yardım** ile yardım alabilirsiniz.\n örnek komut kullanımı: **!küfür-engel aç**.\nbotu davet etmek için **!davet**')
      .addField('** Komutlar (23)**', `Herkesin Kullanabileceği Standart Komutlar. \n` +  '`botbilgi`, `ping`, `başvuru`, `lyrics`, `döviz`, `roller`, `rrenk`, `sunucubilgi`, `yapımcım`, `yaz`, `yetkililer`,`davet`,`şifre`, `havadurumu`, `öneri`, `avatar`, `bitcoin`, `seslimesaj`, `ailemiz`, `yetkilerim`, `afk`, `seviye`, `seviyeyardım`')
      .addField('** Eğlence (27)**',   `Herkes İçin Kullanılabilecek Eğlence Komutları. \n` + '`animeavatar`, `aşkımı-ölç`, `ateşet`, `randomhabbo`, `sinirli`, `kedi`, `köpek`, `berserk`, `mcskin`, `öp`, `sarıl`, `efkarölçer`, `emojiyaz`, `hesapla`, `yazı-banner`, `clyde`, `csgokasa`, `bjkefekt`, `gsefekt`,  `kanna`, `8ball`, `muzum`, `ph`')
      .addField('** Bilgi (16)**',`Herkes İçin Kullanılıcak Bilgi Alma Komutları. \n` +  '`spotify`, `lolbilgi`, `instagram`, `youtubebilgi`, `steamfiyat`, `twitch`, `vikipedi`, `npm`, `discordbotlist`, `yılbaşı`, `diziara`, `woodie`, `google`, `corona`, `twitter`, `gifara`')
      .addField('** Moderasyon (19)**',`Yetkililer İçin Moderasyon Komutları Bölümü . \n` +  '`küfür-engel`, `reklam-engelle`, `kick`,`mute`,`sil(gelişmiş)`, `temizle`, `votekick`, `kilit(kanal kilitler)`, `duyuru`, `ban`, `unban`, `anket`, `banlananlar`, `yavaşmod`, `ıd`, `reklam-kick`, `hazır-kanallar`, `panel`, `forceban`, `softban`, `tempmute`, `hgbb-ayarla`, `resimli-hgbb`')
      .addField('** NSFW Komutları (4)**',`+18 İçeriktir. Sadece NSFW Kanalında Bu Komutlar Çalışır. \n` +  '`nsfw`, `nsfw-gif`, `hentai`, `pussy`')
      .addField('** Bot Sahibine Özel Komutlar (7)**',`Bot sahibinin kullanabiliceği komutlar. \n` +  '`dnd`, `idle`, `load`, `unload`, `eval`, `reboot`, `bakım` ')
    
     
    .setFooter(`© ${client.user.username} ` , client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embedyardim).catch()
    
//////`${client.user.username}`
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["h", "halp", "help", 'y', 'yadrım'],
    permLevel: 0
};

exports.help = {
    name: 'yardım',
      category: 'Yardım',
      description: 'Yardım kategorilerini gösteir.',
}; 