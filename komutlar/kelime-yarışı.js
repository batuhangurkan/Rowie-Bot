const Discord = require('discord.js');
const { stripIndents } = require('common-tags');
const { randomRange, verify } = require('../util/Util.js');
let oyndurum = new Set();
//KELİMELERİ BURAYA EKLEYİNİZ.
var kelimeler = ['sd', 's', 'sal', 'sevmek', 'sarılmak', 'sinir', 'ağla', 'oyun', 'duman', 'parti', 'araba'];
//KELİMELERİ BURAYA EKLEYİNİZ.

exports.run = async (client, message, args) => {
  
	let opponent = message.mentions.users.first()
	if (!opponent) return message.reply("Oynamak istediğin kişiyi etiketlemelisin!")
  
  if (opponent.bot) return message.reply('Botlar ile kelime oyunu oynayamazsın!');
  if (opponent.id === message.author.id) return message.reply('Kendin ile kelime oyunu oynayamazsın!');
		if (oyndurum.has(message.channel.id)) return message.reply('Kanal başına sadece bir kelime oyunu meydana gelebilir.');
		try {
			if (!opponent.bot) {
        await message.channel.send(`${opponent}, kelime oyunu isteği geldi. İsteği kabul ediyor musun? (\`evet\` veya \`hayır\` olarak cevap veriniz.)`);
				const verification = await verify(message.channel, opponent);
				if (!verification) {
					this.fighting.delete(message.channel.id);
					return message.channel.send(`Düello kabul edilmedi...`);
				}
			}
      
   message.channel.send('Kelime, yükleniyor!').then(message => {
     oyndurum.add(message.channel.id)
      var kelime = kelimeler[Math.floor(Math.random() * kelimeler.length)];
      message.edit(`Hey hemen \`${kelime}\` demen lazım!`);
     
     const filter = res => {
			const value = res.content.toLowerCase();
			return res.author.id === message.author.id | opponent.id && (kelime.includes(value));
		};
     
     
     message.channel.awaitMessages(filter, {
          max: 1,
          time: 100000
        })
       .then((collected) => {
            const embed = new Discord.RichEmbed()
            .setDescription(`:tada: Tebrikler, Kazanannn: ${collected.first().author}`)
            .setColor("green")
            message.channel.send(embed)
            oyndurum.delete(message.channel.id)
          })
          .catch(function(){
            message.channel.send('Size verilen süre doldu');
            oyndurum.delete(message.channel.id)
          });
   })
		} catch (err) {
			oyndurum.delete(message.channel.id);
			console.log(err)
		}
  }

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ['1vs1', '1v1', 'savaş'],
  permLevel: `Yetki gerekmiyor.`
};

exports.help = {
  name: 'oyunus',
  category: "eğlence",
  description: 'İstediğiniz bir kişi ile düello atarsınız!',
  usage: 'düello <@kullanıcı>'
};