const Discord = module.require('discord.js');
var request = require('request');
var cheerio = require('cheerio');
const db = require("quick.db");
function getStatData(location, $) {

    var selector = $('.stats-stat .value').eq(location).text();

    var stat_array = $.parseHTML(selector);

    var stat = 0;

    if (stat_array == null || stat_array.lengh == 0) {
        return -1;

    } else {
        stat = stat_array[0].data;
    }

    return stat;
}

exports.run = async (bot, message, args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')

    var UR_L = "http://csgo.tracker.network/profile/" + args[0];

    if (!args[0]) {
        return message.channel.send(":x: Lütfen geçerli bir STEAMID64 veya özel URL girin");
    }

    request(UR_L, function(err, resp, body) {

        $ = cheerio.load(body);

        var KD = getStatData(0, $);
        if (KD == -1) {
            message.channel.send(":x: Geçersiz, profilinizin gizli olmadığından ve geçerli bir STEAMID64 veya Özel URL girdiğinizden emin olun!");
            return;
        }

        var WIN = getStatData(1, $);
        var HS = getStatData(4, $);
        var MONEY = getStatData(5, $);
        var SCORE = getStatData(6, $);
        var KILLS = getStatData(7, $);
        var DEATHS = getStatData(8, $);
        var MVP = getStatData(9, $);
        var BS = getStatData(13, $);
        var BD = getStatData(14, $);
        var HR = getStatData(15, $);

        var STAT = new Discord.RichEmbed()

            .setTitle("__***CSGO İstatistikleri***__")
            .setURL(UR_L)
            .setColor("0x#FF0000")
            .addField("Toplam KD", KD, true)
            .addField("Win", `${WIN}%`, true)
            .addField("Toplam Rehine Kaydedildi", HR, true)
            .addField("Toplam para", MONEY, true)
            .addField("Toplam Skor", SCORE, true)
            .addField("Toplam ölümler", KILLS, true)
            .addField("Toplam ölümler", DEATHS, true)
            .addField("MVP", MVP, true)
            .addField("Toplam Bomba Seti", BS, true)
            .addField("Toplam Bombalar Defused", BD, true)
            .addField("Toplam Headshots", HS, true);


        message.channel.send(STAT);

    })
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'csgo',
  description: 'CSGO İstatistikler',
  usage: 'csgo'
};