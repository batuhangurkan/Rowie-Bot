const Discord = require('discord.js');  
const snekfetch = require('node-fetch');  
const ayarlar = require('../ayarlar.json');  
const db = require("quick.db")
exports.run = async(client, message, args) => {
//let p yazan yerleri siz kendinize göre yapınız bende prefix ayarlama var ondan böyle siz silebilirsiniz bu birşey değil
  let p = db.fetch(`prefix_${message.guild.id}`)
  let prefix;
  if (p == null) prefix = "!"
  else prefix = p
   
 let yazı = args.slice(0).join(' ');  
   if (yazı.length < 1) return message.reply(`Korona araması yapmak için birşey yazmalısın \n ${prefix}cov ülke türkiye \n ${prefix}cov global \n Türkiye yerine başka ülke yazabilrisiniz`);  
  
if (args[0] == 'global') {  
    const text = snekfetch.get("https://thevirustracker.com/free-api?global=stats");  
    const body = text.body;  

    let embed = new Discord.MessageEmbed()  
      .setColor('#ff1111')  
    .setTitle('Corona Virüs')  
      .setURL('https://thevirustracker.com/')  
      .setDescription('Global Corona İstatistikleri')  
    .setThumbnail('https://dfcby4322olzt.cloudfront.net/wp-content/uploads/2020/03/1800x1200_coronavirus_1.jpg')  
    .addField('Toplam vaka sayısı:\u200B', body.results[0].total_cases, true)  
    .addField('İyileşen:\u200B', body.results[0].total_recovered, true)    
    .addField('enfekte:\u200B', body.results[0].total_active_cases, true)  
    .addField('ölümler:\u200B', body.results[0].total_deaths, true)  
    .addField('Bugün yeni vakalar:\u200B', body.results[0].total_new_cases_today, true)  
    .addField('Bugün yeni ölümler:\u200B', body.results[0].total_new_deaths_today, true)  
    .addField('Ciddi Vakalar:\u200B', body.results[0].total_serious_cases, true)  
    .addField('Genel Durum:\u200B', body.stat, true)
    .setImage('https://cdn.startupi.com.br/wp-content/uploads/2018/09/startup-global.jpg')  
    .setTimestamp()  
    .setFooter('Corona Virüs', 'https://cdn.discordapp.com/avatars/674265324081643520/4f2f51902bd7604ed1c1cfb52913524b.png?size=2048');
message.channel.send(embed)  
}
  if (args[0] == 'ülke') {  
 let a = args[1].toLowerCase()  
  .replace('türkiye', 'TR')   
  .replace('çin', 'CN')  
  .replace('amerika', 'US')  
  .replace('japonya', 'JP')  
  .replace('azerbaycan', 'AZ')  
  .replace('italya', 'IT')  
  .replace('kuzey kore', 'KP')  
  .replace('güney kore', 'KR')  
  .replace('fransa', 'FR')  
  .replace('almanya', 'DE')  
  .replace('rusya', 'RU')  
  .replace('nepal', 'NP')  
  .replace('iran', 'IR')  
  .replace('ırak', 'IQ')  
  .replace('yunanistan', 'GR')  
  .replace('cezayir', 'DZ')  
  .replace('belçika', 'BE')  
  .replace('bosna hersek', 'BA')  
  .replace('brezilya', 'BR')  
  .replace('bulgaristan', 'BG')  
  .replace('danimarka', 'DK')  
  .replace('dominik', 'DM')  
  .replace('ermenistan', 'AM')  
  .replace('hindistan', 'IN')  
  .replace('ingiltere', 'GB')  
  
    const text = snekfetch.get(`https://thevirustracker.com/free-api?countryTotal=${a}`);  
    const body = text.body;  
  let ülk = body.countrydata[0].info.title  

    let embed = new Discord.MessageEmbed()  
    .setColor('#ff1111')  
    .setTitle('COVID-19')  
    .setDescription(`**COVID-19** - **${ülk}**`)  
    .setThumbnail(`https://www.countryflags.io/${a}/shiny/64.png`)  
    .addField('Toplam vaka sayısı:', body.countrydata[0].total_cases, true)  
    .addField('İyileşen:', body.countrydata[0].total_recovered, true)  
    .addField('Enfekte:', body.countrydata[0].total_active_cases, true)  
    .addField('Ölümler:', body.countrydata[0].total_deaths, true)  
    .addField('Bugün yeni vakalar:', body.countrydata[0].total_new_cases_today, true)  
    .addField('Bugün yeni ölümler:', body.countrydata[0].total_new_deaths_today, true)  
    .addField('Ciddi Vakalar:', body.countrydata[0].total_serious_cases, true)  
    .setTimestamp()  
    .setFooter('COVID-19', client.user.avatarURL());  
    
    message.channel.send(embed);  
      
  }
}
exports.conf = {
enabled: true,
guildOnly: false,
aliases: [],
permLevel: 0,
kategori: 'yapımcı',
};

exports.help = {
name: 'korona',
description: 'Korona Apisi',
usage: 'korona ülke veya global'
};