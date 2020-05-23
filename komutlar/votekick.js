const Discord  = module.require('discord.js');
const db = require("quick.db");
const agree    = "✅";
const disagree = "❎";

module.exports.run = async (bot, message, args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')
const user = message.mentions.users.first();
  const modlog = message.guild.channels.find('name', 'kick-kanalı');
  if (!modlog) return message.reply('Maalesef kick-kanalı Adlı Kanalını bulamıyorum');
  if (message.mentions.users.size === 0){
    return message.reply(":x: " + "| Lütfen Bir Sonraki  Kick Bir Kullanıcı Bahset");
  }

  let kickmember = message.guild.member(message.mentions.users.first());
  if(!kickmember){
    message.reply(":x: " + "| Bu Kullanıcı Geçerli Görmüyor!");
  }

  if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")){
    return message.reply(":x: " + "| ihtiyacım var\"KICK_MEMBERS\" izin!").catch(console.error);
  }

  let msg = await message.channel.send("Şimdi oyla! (10 saniye)");
  await msg.react(agree);
  await msg.react(disagree);

  const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 10000});
  msg.delete();

  var NO_Count = reactions.get(disagree).count;
  var YES_Count = reactions.get(agree);

  if(YES_Count == undefined){
    var YES_Count = 1;
  }else{
    var YES_Count = reactions.get(agree).count;
  }

  var sumsum = new Discord.RichEmbed()
  
            .addField("Oylama Tamamlandı:", "----------------------------------------\n" +
                                          "toplam oy (Hayır): " + `${NO_Count-1}\n` +
                                          "toplam oy (Evet): " + `${YES_Count-1}\n` +
                                          "----------------------------------------\n" +
                                          "NOTE: Tekme atmak için gerekli oylar (3+)\n" +
                                          "----------------------------------------", true)

            .setColor("0x#FF0000")

  await message.channel.send({embed: sumsum});

  if(YES_Count >= 4 && YES_Count > NO_Count){

    kickmember.kick().then(member => {
      message.reply(`${member.user.username} başarıyla tekmelendi`)
    })
  }else{

    message.channel.send("\n" + "Yeterli Oy Alınmadı.");
  }

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'votekick',
  description: 'wasted.',
  usage: 'wasted'
  };
