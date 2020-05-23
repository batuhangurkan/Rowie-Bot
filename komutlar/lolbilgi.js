const Discord = require('discord.js')
const opggScrape = require('opgg-scrape');
const db = require("quick.db");
exports.run = async (client,message, args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
const bölge = args[0]
const isim = args.slice(1).join(' ')
if(!bölge) return message.channel.send(`${message.author} Bölge girmediniz.`)
if(!isim) return message.channel.send(`${message.author} isim girmediniz`)
opggScrape.getStats(`${isim}`, {region: `${bölge}`, refresh: false}).then(stats => {
console.log(stats);
const rank = (stats.rank =='Challenger' ? 'Challenger' :stats.rank =='Grandmaster' ? 'Büyük usta' :stats.rank =='Master' ? 'Usta' :stats.rank =='Diamond 1' ? 'Elmas 2' : stats.rank =='Diamond 2' ? 'Elmas 2' : stats.rank == 'Diamond 3' ? 'Elmas 3' :stats.rank =='Diamond 4' ? 'Elmas 4' :stats.rank =='Platinum 1' ? 'Platin 1' :stats.rank =='Platinum 2' ? 'Platin 2' :stats.rank =='Platinum 3' ? 'Platin 3' :stats.rank =='Platinum 4' ? 'Platin 4' :stats.rank =='Gold 1' ? 'Altın 1' :stats.rank =='Gold 2' ? 'Altın 2' :stats.rank =='Gold 3' ? 'Altın 3' :stats.rank =='Gold 4' ? 'Altın 4' :stats.rank =='Silver 1' ? 'Gümüş 1' :stats.rank =='Silver 2' ? 'Gümüş 2' :stats.rank =='Silver 3' ? 'Gümüş 3' :stats.rank =='Silver 4' ? 'Gümüş 4' :stats.rank =='Bronze 1' ? 'Bakır 1' :stats.rank =='Bronze 2' ? 'Bakır 2' :stats.rank =='Bronze 3' ? 'Bakır 3' :stats.rank =='Bronze 4' ? 'Bakır 4' :stats.rank =='Iron 1' ? 'Demir 1' :stats.rank =='Iron 2' ? 'Demir 2' :stats.rank =='Iron 3' ? 'Demir 3' :stats.rank =='Iron 4' ? 'Demir 4' : stats.rank == 'Unranked' ? 'Ranksız' : 'Yok')
const lp = (stats.rankedLP == 'none' ? 'Bilinmiyor' : stats.rankedLP)
const rankedlp1 = (stats.rankedLP == 'none' ? '0' : stats.rankedLP)
const kill = stats.KDA.kills
const deaths = stats.KDA.deaths
const assists = stats.KDA.assists
const kdaR = stats.KDARatio
const kill1 = (kill == 'NaN' ? 'Bilinmiyor' : kill)
const deaths1 = (deaths == 'NaN' ? 'Bilinmiyor' : deaths)
const assists1 = (assists == 'NaN' ? 'Bilinmiyor' : assists)
const kdaR1 = (kdaR == '' ? 'Bilinmiyor' : kdaR)
var thumbnail;
if(stats.rank == 'Challenger') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624145916017770517/Season_2019_-_Challenger_1.png'
if(stats.rank == 'Grandmaster') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624148104593276929/Season_2019_-_Grandmaster_1.png'
if(stats.rank == 'Master') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624148104593276929/Season_2019_-_Grandmaster_1.png'
if(stats.rank == 'Diamond 1') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624145573360173066/Season_2019_-_Diamond_1.png'
if(stats.rank == 'Diamond 2') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624145919708889088/Season_2019_-_Diamond_2.png'
if(stats.rank == 'Diamond 3') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624145921608908810/Season_2019_-_Diamond_3.png'
if(stats.rank == 'Diamond 4') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624145922229796864/Season_2019_-_Diamond_4.png'
if(stats.rank == 'Platinum 1') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624148620161187844/Season_2019_-_Platinum_1.png'
if(stats.rank == 'Platinum 2') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624148621050380288/Season_2019_-_Platinum_2.png'
if(stats.rank == 'Platinum 3') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624148622728101888/Season_2019_-_Platinum_3.png'
if(stats.rank == 'Platinum 4') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624148623508373524/Season_2019_-_Platinum_4.png'
if(stats.rank == 'Gold 1') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624149438226759680/Season_2019_-_Gold_1.png'
if(stats.rank == 'Gold 2') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624149439665143818/Season_2019_-_Gold_2.png'
if(stats.rank == 'Gold 3') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624149440953057280/Season_2019_-_Gold_3.png'
if(stats.rank == 'Gold 4') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624149441749975040/Season_2019_-_Gold_4.png'
if(stats.rank == 'Silver 1') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624150016331743232/Season_2019_-_Silver_1.png'
if(stats.rank == 'Silver 2') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624150017543897098/Season_2019_-_Silver_2.png'
if(stats.rank == 'Silver 3') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624150018109997067/Season_2019_-_Silver_3.png'
if(stats.rank == 'Silver 4') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624150018802057257/Season_2019_-_Silver_4.png'
if(stats.rank == 'Bronze 1') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624150667086528512/Season_2019_-_Bronze_1.png'
if(stats.rank == 'Bronze 2') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624150667925258250/Season_2019_-_Bronze_2.png'
if(stats.rank == 'Bronze 3') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624150668969508865/Season_2019_-_Bronze_3.png'
if(stats.rank == 'Bronze 4') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624150670983036938/Season_2019_-_Bronze_4.png'
if(stats.rank == 'Iron 1') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624151245896024069/Season_2019_-_Iron_1.png'
if(stats.rank == 'Iron 2') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624151247439659008/Season_2019_-_Iron_2.png'
if(stats.rank == 'Iron 3') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624151248022667284/Season_2019_-_Iron_3.png'
if(stats.rank == 'Iron 4') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624151248697819136/Season_2019_-_Iron_4.png'
if(stats.rank == 'Unranked') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624156509101752320/Season_2019_-_Unranked.png'
let pages = [
`\n Leveli : ${stats.level} \n\n Rankı : ${rank} \n\n Mevcut lp : ${rankedlp1}`,
`\nToplam kill oranı : ${kill1} \n\n Toplam asist oranı : ${assists1} \n\n Toplam ölüm oranı : ${deaths1} \n\n KDA : ${kdaR1}`
];
let page = 1;
const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setAuthor(`${stats.name} lol bilgileri`)
.setThumbnail(thumbnail)
.setFooter(`Sayfa ${page} / ${pages.length}` , stats.avatarURL)
.setDescription(pages[page-1])
message.channel.send(embed).then(msg => {
msg.react('⬅')
.then(r => {
msg.react('➡')
//Filter
const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;
const backwards = msg.createReactionCollector(backwardsFilter, { time: 100000 });
const forwards = msg.createReactionCollector(forwardsFilter, { time: 100000 });
forwards.on('collect', r => {
if(page === pages.length) return;
page++;
embed.setDescription(pages[page-1]);
embed.setColor('RANDOM')
embed.setThumbnail(thumbnail)
embed.setFooter(`Sayfa ${page} / ${pages.length}`,stats.avatarURL)
msg.edit(embed)
})
backwards.on('collect', r => {
if(page === 1) return;
page--;
embed.setColor('RANDOM')
embed.setThumbnail(thumbnail)
embed.setDescription(pages[page-1]);
embed.setFooter(`Sayfa ${page} / ${pages.length}`,stats.avatarURL)
msg.edit(embed)
})
})
})
});
};
exports.conf = {
    enabled: true, 
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'lolbilgi',
    description: 'Lol hesabı hakkında bilgi verir.',
    usage: 'lolbilgi (bölge) (nick)',
  };
