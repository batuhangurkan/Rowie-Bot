const Discord = require("discord.js");
const cheerio = require('cheerio');
const request = require('request');
const chalk = require('chalk');
const db = require("quick.db");
exports.run = async (client, message, args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
	let kullaniciara = args[0];

		if(!kullaniciara) {
			return message.channel.send('Lütfen geçerli bir Twitter kullanıcı adı girin')
		} else {
			request(`https://twitter.com/${kullaniciara}`, async (err, response, html) => {
				if(err) {
					return console.log(err)
				} 
				else if(response.statusCode == 404) {

					return message.channel.send('hata! geçersiz kullanıcı adı')
				} 
				else if(!err) {

					const $ = cheerio.load(html);

					const arkaplan = $('.ProfileCanopy-headerBg img').attr('src')
					let headerData = await arkaplan

					const avatar = $('.ProfileAvatar-image').attr('src')
					let avatarData = await avatar

					const bio = $('.ProfileHeaderCard-bio.u-dir').text()
					let bioData = await bio

					const website = $('.ProfileHeaderCard-urlText.u-dir').text()
					let websiteLink = await website

					const tweetler = $('[data-nav="tweets"] .ProfileNav-value')
					let tweetsData = await tweetler.data('count')

					const favoriler = $('[data-nav="favorites"] .ProfileNav-value').text()
					let likes = await favoriler
            
					const takipler = $('[data-nav="following"] .ProfileNav-value')
					let followingData = await takipler.data('count')

					const takipciler = $('[data-nav="followers"] .ProfileNav-value')
					let followersData = await takipciler.data('count')

					let kullanici = `https://twitter.com/${kullaniciara}`

					let logo = 'https://i.hizliresim.com/AOonRB.png'

					let twitterEmbed = new Discord.RichEmbed()
						.setColor('#00aced')
						.setAuthor(kullaniciara, logo, kullanici)
						.setTitle(`${kullaniciara} Twitter Bilgileri`)
						.setURL(`https://twitter.com/${kullaniciara}`)
						.setDescription(bioData)
						.setThumbnail(avatarData)
						.setImage(headerData)
						.addField('Takip Edilen:', `${followingData}`, true)
						.addField('Takipçiler:', `${followersData}`, true)
						.addField('Tweetler:', `${tweetsData}`,true)
						.addField('Beğeni:', `${likes}`, true)
						if(website !== undefined || 'undefined') {
							twitterEmbed.setFooter(websiteLink)
						}
					await message.channel.send('aranıyor....').then((msg) => {
						msg.edit(twitterEmbed)
					})
					// console.log(response.statusCode)
			};
		});
	};
  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["tw","twitterbilgi","twitterinfo","twitteruser"],
  permLevel: 0
};

exports.help = {
  name: 'twitter',
  description: 'Twitter kullanıcı bilgi komutu',
  kategori:'bilgi',
  usage: 'twitter <kullanıcı adı>'
};