const Discord = require("discord.js");
const bot = new Discord.Client();
const ffmpeg = require("ffmpeg");
const ayarlar = "./ayarlar.json";
const prefix = ayarlar.prefix;



var fenomen = "http://fenomen.listenfenomen.com/fenomen/128/icecast.audio";
var metro   = "http://17773.live.streamtheworld.com/METRO_FM_SC";
var number1 = "http://nr1digitalsc.radyotvonline.com/stream/264/";
var power   = "http://powerfm.listenpowerapp.com/powerfm/mpeg/icecast.audio";
var slowtr  = "https://radyo.dogannet.tv/slowturk";
var joyturk = "http://17733.live.streamtheworld.com/JOY_TURK_SC";






exports.run = function (bot, message, args) {
		let mesaj = args.slice(0).join(' ');
if(!mesaj) {
	message.reply("Lütfen Herhangi Bir Radyo Numarası Seçiniz.\n\n__Radyo Kanalları__\n\n**[1] - JoyTürk**\n**[2] - SlowTürk**\n**[3] - Fenomen FM**\n**[4] - Metro**\n**[5] - Number1**\n**[6] - PowerTürk**\n\n\nÖrnek = **" + prefix + "radyo**\nVe Ardından Sayı\nÖrnek = **" + prefix + "radyo 2**\nCodAre Mustafa Arda Gelişmiş Türk Radyo Sistemi")
}		
    if (!message.member.voiceChannel) return message.reply("Radyo Komutunu Kullanabilmek İçin Lütfen Sesli Bir Kanala Giriş Yapınız.");

		    if (mesaj === "1") {
        if (message.member.voiceChannel.join()
        .then(connection => {
            const dispatcher = connection.playStream(joyturk);
            return message.channel.send("**JoyTürk** FM Oynatılıyor.");
        }));
        return;
    };
	
	    if (mesaj === "2") {
        if (message.member.voiceChannel.join()
        .then(connection => {
            const dispatcher = connection.playStream(slowtr);
            return message.channel.send("**SlowTürk** FM Oynatılıyor.");
        }));
        return;
    };
    // 2 Fenomen
    if (mesaj === "3") {
        if (message.member.voiceChannel.join()
        .then(connection => {
            const dispatcher = connection.playStream(fenomen);
            return message.channel.send("**Fenomen** FM Oynatılıyor.");
        }));
        return;
    };
    // 6 Metro
    if(mesaj === "4") {
        if (message.member.voiceChannel.join()
        .then(connection => {
            const dispatcher = connection.playStream(metro);
            return message.channel.send("**Metro** FM Oynatılıyor.");
        }));
        return;
    };
    // 8 Number1
    if(mesaj === "5") {
        if (message.member.voiceChannel.join()
        .then(connection => {
            const dispatcher = connection.playStream(number1);
            return message.channel.send("**Number1** FM Oynatılıyor.");
        }));
        return;
    };    
    // 14
    if(mesaj === "6") {
        if (message.member.voiceChannel.join()
        .then(connection => {
            const dispatcher = connection.playStream(power);
            return message.channel.send("**PowerTürk** FM Oynatılıyor.");
        }));
        return;
    } 
	
	if (mesaj === "bitir") {
							const voiceChannel = message.member.voiceChannel;

			voiceChannel.leave()
	}
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};
exports.help = {
    name: "radyo",
    description: "Belirtilen Radyo istasyonunu bulunduğu kanalda paylaşır.",
    usage: "radyo <name>"
};