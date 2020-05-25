const fetch = require('snekfetch');
const humanizeduration = require("humanize-duration");
const Discord = require('discord.js');
const db = require("quick.db");
exports.run = async (bot, message, args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
    if (args.length > 0) {
        fetch.get("https://skimdb.npmjs.com/registry/" + args[0].toLowerCase()).then((body) => {
            message.channel.send({
                embed: {
						title: "NPM Modül Bilgileri",
						color: 3066993,
						fields: [
							{
								name: "İsmi",
								value: body.body.name,
								inline: true
                            },
                            {
								name: "Açıklama",
								value: body.body.description,
								inline: true
                            },
							{
								name: "Yapımcısı",
								value: body.body.author.name,
								inline: true
							},
							{
								name: "Sürüm",
								value: body.body["dist-tags"].latest,
								inline: true
							},
							{
								name: "GitHub",
								value: ((body.body.repository) ? body.body.repository.url.replace("git+", "").replace(".git", "").replace("git://", "https://").replace("git@github.com:", "https://github.com/") : "Githubda bulunamadı.!"),
								inline: true
							},
							{
								name: "Destek",
								value: body.body.maintainers.map((m) => m.name).join(", "),
								inline: true
							},
							{
								name: "Son güncelleme",
								value: humanizeduration(Date.now() - new Date(body.body.time[body.body["dist-tags"].latest]).getTime(), {
									round: true,
									largest: 2
								}),
								inline: true
                            }
						]
					}
            })
        }).catch((error) => {
            if (error.status === 404) return message.channel.send({
                embed: {
                    title: "HATA!",
                    color: 0xE50000,
                    description: "Bu npm paketini alırken bir hata oluştu"
                }
            })
            console.error("Npm modülünü bulamadım", error.message);
            message.reply("NPM Modülü **" + args[0] + "** bulunamadı") 
        })
    } else {
        message.channel.send({
				embed: {
					title: "HATA!",
					color: 0xE50000,
					description: "Eksik `<isim>` argümanı."
				}
			});
    }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["npm"],
  permLevel: 0
};

exports.help = {
  name: 'npm',
  description: 'Npm modülü hakkında bilgi verir.',
  kategori:'bilgi',
  usage: 'npm '
};
