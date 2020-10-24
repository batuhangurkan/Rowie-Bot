const Discord = require("discord.js");
const bot = new Discord.Client();
const ffmpeg = require("ffmpeg");
const ayarlar = "./ayarlar.json";
const prefix = ayarlar.prefix;
var joyturk = "http://17733.live.streamtheworld.com/JOY_TURK_SC"; //1
var slowtr  = "http://17773.live.streamtheworld.com/JOY_TURK2AAC_SC?type=.mp3"; //2
var fenomen = "http://fenomen.listenfenomen.com/fenomen/128/icecast.audio"; //3
var metro   = "http://17773.live.streamtheworld.com/METRO_FM_SC"; //4
var number1 = "https://n10101m.mediatriple.net/videoonlylive/mtkgeuihrlfwlive/u_stream_5c9e30cf8d28e_1/playlist.m3u8"; //5
var power   = "http://powerfm.listenpowerapp.com/powerfm/mpeg/icecast.audio"; //6
var rocken = "http://ezstream.mbcradio.net:8081/ezrock.mp3"; //7
var Nostalji = "https://17703.live.streamtheworld.com/RETROTURK_SC"; //8
/*9*/var arkaplan =  "http://rsh.hoerradar.de/rsh-relax-mp3-hq?sABC=5r90n7n0%230%2321249sr8or0520pr7o1n4o7p357o1pqo%23&amsparams=playerid:;skey:1586538400";
var klasik = "http://mediaserv30.live-streams.nl:8088/"; //10
var islami = "http://37.247.98.8/stream/33/?/;"; //11
var rap = "http://95.173.188.166:9984/;"; //12
var haber = "http://ntvrdsc.radyotvonline.com/;"; //13
var spor = "http://ntvsporsc.radyotvonline.com/;"; //14
var Polis = "https://m.egm.gov.tr:8093//;?type=http&nocache=1"; //15
var Jazz = "https://listen.powerapp.com.tr/powersmoothjazz/mpeg/icecast.audio?/;"; //16
var HipHop = "https://listen.powerapp.com.tr/powerrbhiphop/mpeg/icecast.audio?/;"; //17
var Arabesk = "https://radyodinle1.turkhosted.com/yayin?uri=37.247.98.7:80/;&tkn=vsLHkcrnLjZIRmKCuY0qZg&tms=1586578296" //18
exports.run = function (bot, message, args) {
		let mesaj = args.slice(0).join(' ');
if(!mesaj) {
	message.reply("Lütfen Herhangi Bir Radyo Numarası Seçiniz.\n\n__Radyo Kanalları__\n\n**[1] - JoyTürk**\n**[2] - SlowTürk**\n**[3] - Fenomen FM**\n**[4] - Metro**\n**[5] - Number1**\n**[6] - PowerTürk**\n**[7] - İngilizce Rock**\n**[8] - Nostalji**\n**[9] - Arka plan**\n**[10] - Klasik**\n**[11] - İslami**\n**[12] - Rap**\n**[13]- Haber**\n**[14] - Spor**\n**[15] - Polis**\n**[16] - Jazz**\n**[17] - HipHop**\n**[18] - Arabesk**\n\n\nÖrnek = **" + "&radyo**\nVe Ardından Sayı\nÖrnek = **" + "&radyo 2**\nbitirmek için &radyo bitir yazınız")
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
   
    if (mesaj === "3") {
        if (message.member.voiceChannel.join()
        .then(connection => {
            const dispatcher = connection.playStream(fenomen);
            return message.channel.send("**Fenomen** FM Oynatılıyor.");
        }));
        return;
    };

    if(mesaj === "4") {
        if (message.member.voiceChannel.join()
        .then(connection => {
            const dispatcher = connection.playStream(metro);
            return message.channel.send("**Metro** FM Oynatılıyor.");
        }));
        return;
    };
   
    if(mesaj === "5") {
        if (message.member.voiceChannel.join()
        .then(connection => {
            const dispatcher = connection.playStream(number1);
            return message.channel.send("**Number1** FM Oynatılıyor.");
        }));
        return;
    };    
  
    if(mesaj === "6") {
        if (message.member.voiceChannel.join()
        .then(connection => {
            const dispatcher = connection.playStream(power);
            return message.channel.send("**PowerTürk** FM Oynatılıyor.");
        }));
        return;
    } 
	
if (mesaj === "7") {
        if (message.member.voiceChannel.join()
        .then(connection => {
            const dispatcher = connection.playStream(rocken);
            return message.channel.send("İngilizce Rock Oynatılıyor.");
        }));

    };

  if (mesaj === "8") {
        if (message.member.voiceChannel.join()
        .then(connection => {
            const dispatcher = connection.playStream(Nostalji);
            return message.channel.send("Nostalji Radyo Oynatılıyor.");
        }));

    };

  if (mesaj === "9") {
        if (message.member.voiceChannel.join()
        .then(connection => {
            const dispatcher = connection.playStream(arkaplan);
            return message.channel.send("Arka planda durmalık radyo Oynatılıyor.");
        }));

    };
  
  if (mesaj === "10") {
        if (message.member.voiceChannel.join()
        .then(connection => {
            const dispatcher = connection.playStream(klasik);
            return message.channel.send("Klasik Müzik radyo Oynatılıyor.");
        }));

    };

  if (mesaj === "11") {
        if (message.member.voiceChannel.join()
        .then(connection => {
            const dispatcher = connection.playStream(islami);
            return message.channel.send("İslami radyo Oynatılıyor.");
        }));

    };

  if (mesaj === "12") {
        if (message.member.voiceChannel.join()
        .then(connection => {
            const dispatcher = connection.playStream(rap);
            return message.channel.send("Rap Müzik radyo Oynatılıyor.");
        }));

    };

  if (mesaj === "13") {
        if (message.member.voiceChannel.join()
        .then(connection => {
            const dispatcher = connection.playStream(haber);
            return message.channel.send("Haber radyo Oynatılıyor.");
        }));

    };

  if (mesaj === "14") {
        if (message.member.voiceChannel.join()
        .then(connection => {
            const dispatcher = connection.playStream(spor);
            return message.channel.send("Spor radyo Oynatılıyor.");
        }));

    };

  if (mesaj === "15") {
        if (message.member.voiceChannel.join()
        .then(connection => {
            const dispatcher = connection.playStream(Polis);
            return message.channel.send("Polis radyo Oynatılıyor.");
        }));

    };

  if (mesaj === "16") {
        if (message.member.voiceChannel.join()
        .then(connection => {
            const dispatcher = connection.playStream(Jazz);
            return message.channel.send("Jazz radyo Oynatılıyor.");
        }));

    };

    if (mesaj === "17") {
        if (message.member.voiceChannel.join()
        .then(connection => {
            const dispatcher = connection.playStream(HipHop);
            return message.channel.send("HipHop radyo Oynatılıyor.");
        }));

    };
  
   if (mesaj === "18") {
        if (message.member.voiceChannel.join()
        .then(connection => {
            const dispatcher = connection.playStream(Arabesk);
            return message.channel.send("Arabesk radyo Oynatılıyor.");
        }));

    };

  
	if (mesaj === "bitir") {
							const voiceChannel = message.member.voiceChannel;

			voiceChannel.leave()
	}

}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["radyo"],
    permLevel: 0
};
exports.help = {
    name: "radyo",
    category:'müzik',
    description: "Belirtilen Radyo istasyonunu bulunduğu kanalda paylaşır.",
    usage: "radyo <isim>"
};