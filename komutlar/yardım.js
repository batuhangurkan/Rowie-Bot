const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db");
var prefix = ayarlar.prefix;
exports.run = (client, message, args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
    const embedyardim = new Discord.RichEmbed()
    .setColor('#00eaff')
    .setAuthor(`${client.user.username} `, client.user.avatarURL) 
      .setDescription('**!yardım** ile yardım alabilirsiniz.\n örnek komut kullanımı: **!küfür-engel aç**.\nbotu davet etmek için **!davet**')
      .addField('** Komutlar (32)**', `Herkesin Kullanabileceği Standart Komutlar. \n` +  '`botbilgi`, `ping`, `başvuru`, `lyrics`, `istatistik`, `döviz`, `roller`, `rrenk`, `sunucubilgi`, `yapımcım`, `yaz`, `yetkililer`, `website`, `talep`, `davet`, `sor` , `songörülme`, `kısalt(link kısaltır)`, `şifre`, `havadurumu`, `öneri`, `avatar`, `bitcoin`, `çekiliş`, `seslimesaj`, `screenshot`, `resimyükle`, `ailemiz`, `leaderboard`, `afk`, `seviye`, `seviyeyardım`, `yetkilerim`')
      .addField('** Eğlence (30)**',   `Herkes İçin Kullanılabilecek Eğlence Komutları. \n` + '`animeavatar`, `aşkımı-ölç`, `ateşet`, `randomhabbo`, `resimçiz`, `tokyo-ghoul`, `sinirli`, `kedi`, `köpek`, `berserk`, `mcskin`, `öp`, `sarıl`, `efkarölçer`, `emojiyaz`, `hesapla`, `yazı-banner`, `clyde`, `csgokasa`, `dclogo`, `bjkefekt`, `gsefekt`,  `kanna`, `sonic`, `balıktut`, `8ball`, `hackle`, `meme`, `düello`, `muzum`, `ph`')
      .addField('** Bilgi (17)**',`Herkes İçin Kullanılıcak Bilgi Alma Komutları. \n` +  '`spotify`, `lolbilgi`, `instagram`, `youtubebilgi`, `steamfiyat`, `twitch`, `vikipedi`, `npm`, `nasa`, `discordbotlist`, `yılbaşı`, `diziara`, `woodie`, `google`, `corona`, `twitter`, `gifara`')
      .addField('** Moderasyon (31)**',`Yetkililer İçin Moderasyon Komutları Bölümü . \n` +  '`küfür-engel`, `reklam-tara`, `kick`,`mute`,`sil(gelişmiş)`, `temizle`, `votekick`, `kilit(kanal kilitler)`, `pin(sabitleme)`, `duyuru`, `ban`, `unban`, `anket`, `rol-ver`, `sunucupanel`, `banlananlar`, `ses-kanal-aç`, `yavaşmod`, `ıd`, `davetlerim`, `davet-oluştur`, `davet-sil`, `davet-sıfırla`, `davet-kanal`, `davet-kanal-sıfırla`, `davet-ekle`, `kanal-koruma`, `kanal-koruma-sıfırla`, `ever-engel`, `reklamfiltresi`, `hazır-sunucu`, `panel`')
      .addField('** NSFW Komutları (2)**',`+18 İçeriktir. Sadece NSFW Kanalında Bu Komutlar Çalışır. \n` +  '`nsfw`, `nsfw-gif`')
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