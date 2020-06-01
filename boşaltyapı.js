const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const ms = require("ms");

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});

client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

////////////////////////////////////////////////////////////////////////

client.on('message', async message => {
  let ke = await db.fetch(`kufur_${message.guild.id}`)
  
  if (ke === "kapali" || ke === undefined || ke === null){
    return;
  } else if (ke === "acik") {
    let küfür = ["amk", "aq", "sikerim", "AMK", "AQ", "Amk", "Aq", "orospu çocuğu", "OROSPU","Ananı Sikerim", "ananı sikerim","Amına koduğum", "Ananı sikiyim", "Amına koyim","Götünü sikiyim", "MK", "götünü sikiyim", "s2ş", "Sikiş","S2Ş"]
    if (küfür.some(word => message.content.includes(word))){
        if (!message.member.hasPermission("BAN_MEMBERS")) {
        message.delete();
        message.channel.send("Küfür etmek yasak!")
        message.guild.owner.send("Sunucunuzda bir kişi küfür etti. \nKullanıcı: "+ message.author.tag +" \nMesaj: **"+ message +"** ")
      }
    }
  }
})

////////////////////////////////////////////

client.on("guildMemberAdd", async(member) => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
  if(sunucupaneli) {
    let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
    let toplamuye = member.guild.channels.find(x =>(x.name).startsWith("Toplam Üye •"))
    let toplamaktif = member.guild.channels.find(x =>(x.name).startsWith("Aktif Üye •"))
    let botlar = member.guild.channels.find(x =>(x.name).startsWith("Botlar •"))
    let rekoraktif = member.guild.channels.find(x =>(x.name).startsWith("Rekor Aktiflik •"))
    
    if(member.guild.members.filter(off => off.presence.status !== 'offline').size > rekoronline) {
      db.set(`panelrekor_${member.guild.id}`, member.guild.members.filter(off => off.presence.status !== 'offline').size)
    }
    try{
      toplamuye.setName(`Toplam Üye • ${member.guild.members.size}`)
      toplamaktif.setName(`Aktif Üye • ${member.guild.members.filter(off => off.presence.status !== 'offline').size}`)
      botlar.setName(`Botlar • ${member.guild.members.filter(m => m.user.bot).size}`)
      rekoraktif.setName(`Rekor Aktiflik • ${rekoronline}`)
   } catch(e) { }
  }
})
client.on("guildMemberRemove", async(member) => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
  if(sunucupaneli) {
    let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
    let toplamuye = member.guild.channels.find(x =>(x.name).startsWith("Toplam Üye •"))
    let toplamaktif = member.guild.channels.find(x =>(x.name).startsWith("Aktif Üye •"))
    let botlar = member.guild.channels.find(x =>(x.name).startsWith("Botlar •"))
    let rekoraktif = member.guild.channels.
    find(x =>(x.name).startsWith("Rekor Aktiflik •"))
    
    if(member.guild.members.filter(off => off.presence.status !== 'offline').size > rekoronline) {
      db.set(`panelrekor_${member.guild.id}`, member.guild.members.filter(off => off.presence.status !== 'offline').size)
    }
    try{
      toplamuye.setName(`Toplam Üye • ${member.guild.members.size}`)
      toplamaktif.setName(`Aktif Üye • ${member.guild.members.filter(off => off.presence.status !== 'offline').size}`)
      botlar.setName(`Botlar • ${member.guild.members.filter(m => m.user.bot).size}`)
      rekoraktif.setName(`Rekor Aktiflik • ${rekoronline}`)
   } catch(e) { }
  }
})

//////////////////////////////////////////////////

client.on("message" , async msg => {
  if(msg.content.startsWith(ayarlar.prefix+"afk")) return;
 
  let afk = msg.mentions.users.first()
 
  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
 
  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
   if(msg.content.includes(kisi3)){
 
       msg.reply(`Etiketlediğiniz Kişi Afk \n Sebep : ${sebep}`)
   }
 }
  if(msg.author.id === kisi){
 
       msg.reply(`Afk'lıktan Çıktınız`)
  db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
  db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
  db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
   msg.member.setNickname(isim)
   
 }
 
});

////////////////////////////////////////////////

client.on("message", async msg => {
 
 
  const i = await db.fetch(`ssaass_${msg.guild.id}`);
    if (i == 'acik') {
      if (msg.content.toLowerCase() == 'sa' || msg.content.toLowerCase() == 'selam' || msg.content.toLowerCase() == 'selamun aleyküm' || msg.content.toLowerCase() == 'Selam' ) {
          try {
 
                  return msg.reply('**Aleyküm Selam, Hoşgeldin :)** ')
          } catch(err) {
            console.log(err);
          }
      }
    }
    else if (i == 'kapali') {
   
    }
    if (!i) return;
 
    });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("guildCreate", guild => {
    const eklendim = new Discord.RichEmbed()
        .setColor('YELLOW')
        .setThumbnail(client.user.avatarURL)
        .setTitle("Gults Bot Bir Moderasyon Botudur.!")
        .setImage("")
        .setDescription(`**Gults** sunucunuza başarıyla eklendi. :white_check_mark: Botumuzun\n özelliklerini öğrenmek için !yardım yazabilirsiniz.\n`)
        .addField(`:busts_in_silhouette: ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} kullanıcıya hizmet vermekteyim`)
    .addField(`:dizzy: ${client.guilds.size} Sunucuda Bulunmaktayım`)
        .setTimestamp()
    guild.owner.send(eklendim)
});

////////////////////////////////////////////////////////

client.on("message", async msg => {
  const db = require('quick.db');
  
  if (msg.channel.type === "dm") return;
  if(msg.author.bot) return;  
  
  if (msg.content.length > 1) {
    
    db.add(`puancik_${msg.author.id + msg.guild.id}`, 2)//mesaj yazınca xp veriyor
    db.add(`xpsira_${msg.author.id + msg.guild.id}`, 2)//doğru bir sıralama sistemi için var

};

  if (db.fetch(`puancik_${msg.author.id + msg.guild.id}`) > 150) {//150 xp de 1 seviye veriyor
    
    db.add(`seviye_${msg.author.id + msg.guild.id}`, 1)//seviye verildi
    

    
    db.delete(`puancik_${msg.author.id + msg.guild.id}`)//xp silindi
    
  };
 
  if (db.has(`roll_${msg.guild.id}`) === true) {//rol 
  if (db.has(`rollss_${msg.guild.id}`) === true) {//rol seviye
    
 var r = db.fetch(`roll_${msg.guild.id}`)//rolü bul
 var s = db.fetch(`rollss_${msg.guild.id}`)//seviyeyi bul
  
  if (db.fetch(`seviye_${msg.author.id + msg.guild.id}`) == s) {
    if (msg.member.roles.has(msg.guild.roles.get(r).id) === false) {
    msg.channel.send(`**<@${msg.author.id}> başarıyla ${db.fetch(`seviye_${msg.author.id + msg.guild.id}`) - 1 || 0} seviyeyi geçtin!**`)
    msg.member.addRole(msg.guild.roles.get(r).id)
    }
  };

}};
  
});
//////////////////////////////////////////////////////////

client.on("message", async m => {  
  
  if (m.content.toLowerCase() === `<@!${client.user.id}>`) {

    const rembed = new Discord.RichEmbed()
    .setTitle(`Botun Prefixi: ** ${ayarlar.prefix} **`)
    .setColor("RANDOM")
    .setFooter('Gults Bot Yapımı Batuhan Gürkana Aittir. !yardım İle Tüm Komutlara Ulaşabilirsiniz.! ', client.user.avatarURL)
m.channel.send(rembed).then(msg => msg.delete(180000))

}

});

/////////////////////////////////////////////////////////////////////

    client.on("message", async msg => {
    if (msg.channel.type === "dm") return;
      if(msg.author.bot) return;  
        if (msg.content.length > 4) {
         if (db.fetch(`capslock_${msg.guild.id}`)) {
           let caps = msg.content.toUpperCase()
           if (msg.content == caps) {
             if (!msg.member.hasPermission("ADMINISTRATOR")) {
               if (!msg.mentions.users.first()) {
                 msg.delete()
                 return msg.channel.send(`✋ ${msg.author}, Bu sunucuda, büyük harf kullanımı engellenmekte!`).then(m => m.delete(5000))
     }
       }
     }
   }
  }
});

//////////////////////////////////////////////////////////

//BOT ENGEL,anti-baskın yada anti-raid
client.on("guildMemberAdd", async member => {// Yapımı Tamamen CodAre'den '~'Resađ Seferov✨#0809 a aitdir
let kanal = await db.fetch(`antiraidK_${member.guild.id}`)== "anti-raid-aç"
  if (!kanal) return;  
  var cod = member.guild.owner
  if (member.user.bot === true) {
     if (db.fetch(`botizin_${member.guild.id}.${member.id}`) == "aktif") {
    let are = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setThumbnail(member.user.avatarURL)
      .setDescription(`**${member.user.tag}** (${member.id}) adlı bota bir yetkili verdi eğer kaldırmak istiyorsanız **${prefix}bot-izni kaldır botun_id**.`);
    cod.send(are);//CodAre✨
     } else {
       let izinverilmemişbot = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setThumbnail(member.user.avatarURL)
      .setDescription("**" + member.user.tag +"**" + " (" + member.id+ ") " + "adlı bot sunucuya eklendi ve banladım eğer izin vermek istiyorsanız **" + prefix + "bot-izni ver botun_id**")
       member.ban();// Eğer sunucudan atmak istiyorsanız ban kısmını kick yapın
       cod.send(izinverilmemişbot)
}
  }
});

//////////////////////////////////////////////////////////////////////////////////////////

client.on('guildMemberAdd', async(member) => {
 let mute = member.guild.roles.find(r => r.name === "Muted");
let mutelimi = db.fetch(`muteli_${member.guild.id + member.id}`)
let süre = db.fetch(`süre_${member.id + member.guild.id}`)
if (!mutelimi) return;
if (mutelimi) {
member.addRole(mute.id)
 
member.send("Muteliyken Sunucudan Çıktığın için Yeniden Mutelendin!")
 setTimeout(function(){
    // msg.channel.send(`<@${user.id}> Muten açıldı.`)
db.delete(`muteli_${member.guild.id + member.id}`)
    member.send(`<@${member.id}> Muten açıldı.`)
    member.removeRole(mute.id);
  }, ms(süre));
}
})

////////////////////////////////////////////////


setInterval(() => {
client.channels.get("712797474686894152").send('Bu Sunucuda Küfür Etmek ve Reklam Paylaşımı Yapmak Yasaktır!')
}, 27720000) // BURAYA SÜREYİ YAZINIZ 1 SANİYE 1000 MİLİSANİYEDİR!

//////////////////////////////////////////////////

client.on("guildMemberAdd", async member => {
let frenzy_c = client.channels.get("716667825451958284"); 
frenzy_c.setName(`Son Üye : ${member.user.username}`)
})

//////////////////////////////

client.on('message', async message => {
let aktif = await db.fetch(`reklamEngelFrenzy_${message.channel.id}`)
if (!aktif) return 
let reklamlar = ["discord.app", "discord.gg" ,"discordapp","discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", ".cf", ".me", ".in"]
let kelimeler = message.content.slice(" ").split(/ +/g)
if (reklamlar.some(word => message.content.toLowerCase().includes(word))) {
if (message.member.hasPermission("BAN_MEMBERS")) return;
message.delete()
message.reply('Reklamları engelliyorum!').then(msg => msg.delete(7000)) 
}
});
//Frenzy Code
client.on("messageUpdate", async (oldMsg, newMsg) => {
let aktif = await db.fetch(`reklamEngelFrenzy_${oldMsg.channel.id}`)
if(!aktif) return
let reklamlar = ["discord.app", "discord.gg","discordapp","discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", ".cf", ".me", ".in"]
let kelimeler = newMsg.content.slice(" ").split(/ +/g)
if (reklamlar.some(word => newMsg.content.toLowerCase().includes(word))) {
if (newMsg.member.hasPermission("BAN_MEMBERS")) return;
newMsg.delete()
oldMsg.reply('Reklamları engelliyorum!').then(msg => msg.delete(7000)) 
}
});

//////////////////////////////////////////////

client.on("message", async message => {
    let uyarisayisi = await db.fetch(`reklamuyari_${message.author.id}_${message.guild.id}`);
    let reklamkick = await db.fetch(`reklamkick_${message.guild.id}`)
    let kullanici = message.member;
    if (reklamkick == 'kapali') return;
    if (reklamkick == 'acik') {
        const reklam = ["discord.app", "discord.gg", "invite", "discordapp", "discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az",];
        if (reklam.some(word => message.content.toLowerCase().includes(word))) {
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                message.delete();
                db.add(`reklamuyari_${message.author.id}_${message.guild.id}`, 1)
                if (uyarisayisi === null) {
             
                  message.channel.send(`<@${message.author.id}>  Reklam Kick Sistemine Yakalandın! Reklam Yapmaya Devam Edersen \`Atılma ve Banlanma\` İhtimalin Var! (1/5)`)
              .then(msg => msg.delete(5000)) 
}
                if (uyarisayisi === 1) {
           
                      message.channel.send(`<@${message.author.id}>  Reklam Kick Sistemine Yakalandın! Reklam Yapmaya Devam Edersen \`Atılma ve Banlanma\` İhtimalin Var! (2/5)`)
                 .then(msg => msg.delete(5000)) 
                }
              
              if (uyarisayisi === 2) {
           
                      message.channel.send(`<@${message.author.id}>  Reklam Kick Sistemine Yakalandın! Reklam Yapmaya Devam Edersen \`Atılma ve Banlanma\` İhtimalin Var! (3/5)`)
               .then(msg => msg.delete(5000))   
              }
              
              if (uyarisayisi === 3) {
           
                      message.channel.send(`<@${message.author.id}> Reklam Kick Sistemine Yakalandın! Reklam Yapmaya Devam Edersen \`Atılma ve Banlanma\` İhtimalin Var! (4/5)`)
               .then(msg => msg.delete(5000))   
              }
              
                if (uyarisayisi === 4) {
                    message.delete();
                    await kullanici.kick({
                        reason: `REKLAM`,
                    })
           
                       message.channel.send(`<@${message.author.id}> 5 Defa Reklam Yaptığı İçin Sunucudan Attım! Bir Daha Yaparsa **Banlanıcak.**`)
         .then(msg => msg.delete(60000))     
                }
                if (uyarisayisi === 5) {
                    message.delete();
                    await kullanici.ban({
                        reason: `REKLAM`,
                    })
                    db.delete(`reklamuyari_${message.author.id}_${message.guild.id}`)
                
                       message.channel.send(`<@${message.author.id}> Reklam Yaptığı İçin Önce **Atıldı.** Fakat Tekrardan Gelip Reklam Yaptığı İçin **Banladım.**`)
                .then(msg => msg.delete(60000)) 
                  
}
}
}
}
});

/////////////////////////////////////////////////////////

client.on("guildMemberAdd", async member => {
let frenzy_ibrahim = await db.fetch(`Frenzy?Code?OtorolRol_${member.guild.id}`) 
let frenzykanal = await db.fetch(`Frenzy?Code?OtorolKanal_${member.guild.id}`)
if(!frenzy_ibrahim || !frenzykanal) return
member.addRole(frenzy_ibrahim)
client.channels.get(frenzykanal).send(`Otomatik rol verildi. Hoşgeldin ${member.user.username}!`)
});
//Frenzy Code

///////////////////////////////////////////////////////////////

client.on("guildMemberAdd", async member => {
let frenzysayı = await db.fetch(`FrenzyCode+SayaçSayı_${member.guild.id}`)  
let frenzykanal = await db.fetch(`FrenzyCode+SayaçKanal_${member.guild.id}`)  
if(!frenzysayı || !frenzykanal) return
let sonuç = frenzysayı - member.guild.memberCount
client.channels.get(frenzykanal).send(`${member}, katıldı! **${frenzysayı}** kişiye ulaşmak için **${sonuç}** kişi kaldı.`)
})
client.on("guildMemberRemove", async member => {
let frenzysayı = await db.fetch(`FrenzyCode+SayaçSayı_${member.guild.id}`)  
let frenzykanal = await db.fetch(`FrenzyCode+SayaçKanal_${member.guild.id}`)  
if(!frenzysayı || !frenzykanal) return
let sonuç = frenzysayı - member.guild.memberCount
  
client.channels.get(frenzykanal).send(`${member}, ayrıldı! **${frenzysayı}** kişiye ulaşmak için **${sonuç}** kişi kaldı.`)
return
})

////////////////////////////////////////

client.on('guildMemberAdd', async member => {
  let fc = await db.fetch(`FrenzyResimsizHGBB_${member.guild.id}`)
  let frenzychannel = client.channels.get(fc)
  if(!frenzychannel) return
  frenzychannel.send(`${member} Kullanıcısı Sunucuya Katıldı! **HOŞGELDİN**!`)
})
client.on('guildMemberRemove', async member => {
  let fc = await db.fetch(`FrenzyResimsizHGBB_${member.guild.id}`)
  let frenzychannel = client.channels.get(fc)
  if(!frenzychannel) return
  frenzychannel.send(`${member.user.username} Kullanıcısı Sunucudan Ayrıldı! **GÖRÜŞMEK ÜZERE**!`)
})

//////////////////////////////////////////////////////////////

client.on('messageDelete', msg => {
  let asd = JSON.parse(fs.readFileSync("./jsonlar/snipe.json", "utf8"));
               asd[msg.guild.id] = {
                mesaj: msg.content,
                isim: msg.author.username + "#" + msg.author.discriminator
              };
            
            fs.writeFile("./jsonlar/snipe.json", JSON.stringify(asd), (err) => {
              //console.log(err)
            })
                
            asd[msg.guild.id].mesaj = msg.content 
})

//////////////////////////////////////////////

client.on("message", async message => {
    if(!message.guild) return
    if (message.member.hasPermission('MANAGE_GUILD')) return;
    if (message.mentions.users.size >= 4) {
      message.delete();
      message.channel.send(`Hey ${message.author}, Lütfen Sürekli Etiket Atma`)
        message.author.send(`Hey Dostum, Lütfen Sürekli Etiket Atma`)
      }
})

/////////////////////////////////////////////////////

client.on('guildMemberAdd', member => {
  let codes = client.channels.get('716800915763363841')
  if(!codes) return
  let kullanıcı = client.users.get(member.id)
  const kurulus = new Date().getTime()- kullanıcı.createdAt.getTime();
  let frenzy;
  if (kurulus < 1296000000) frenzy = 'Güvenilir Değil!'
  if (kurulus > 1296000000) frenzy = 'Güvenilir!'
  codes.send(`${member} Kullanıcısı Katıldı!
**Güvenirlik Durumu** : *${frenzy}*`)
})

/////////////////// kanal yaratıldı silindi.////////////////////////////
client.on('channelCreate', channel => {
  const knl = client.channels.get('699220477608198174')
          
  knl.send(`Yeni bir kanal oluşturuldu! \n\n***Kanal adı:***${channel.name}`)
          
          })

client.on('channelDelete', channel => {
  const knl = client.channels.get('699220477608198174')
          
  knl.send(`Bir kanal silindi \n\n***Kanal adı:***${channel.name}`)
          
          })

/////////////////////////////////////////


client.on("roleDelete", async(role , channel , message , guild) => {
let rolkoruma = await db.fetch(`rolk_${role.guild.id}`);
if (rolkoruma == "acik") {
role.guild.createRole({name: role.name, color: role.color, permissions: role.permissions}) 
role.guild.owner.send(` **${role.name}** Adlı Rol Silindi Ve Ben Rolü Tekrar Oluşturdum ✅:`)


}
}) 

////////////////////////////////////////////////

client.on('message', msg => {

if(client.ping > 2500) {

let bölgeler = ['singapore', 'eu-central', 'india', 'us-central', 'london',
'eu-west', 'amsterdam', 'brazil', 'us-west', 'hongkong', 
'us-south', 'southafrica', 'us-east', 'sydney', 'frankfurt',
'russia']
let yenibölge = bölgeler[Math.floor(Math.random() * bölgeler.length)]
let sChannel = msg.guild.channels.find(c => c.name === "ddos-system")

sChannel.send(`Sunucu Ddos Saldırısına Uğruyor Olabilir. Senin İçin \nSunucu Bölgesini Değiştirdim \n __**${yenibölge}**__ :tik: __**Sunucu Pingimiz**__ :`+ client.ping)
msg.guild.setRegion(yenibölge)
.then(g => console.log(" bölge:" + g.region))
.then(g => msg.channel.send("bölge **"+ g.region + " olarak değişti")) 
.catch(console.error);
}});

////////////////////////////////////////////////////

const antispam = require("discord-anti-spam-tr");

antispam(client, {
uyarmaSınırı: 4, 
banlamaSınırı: 7, 
aralık: 1000, 
uyarmaMesajı: "Spamı Durdur Yoksa Mutelerim.", 
rolMesajı: "Spam için yasaklandı, başka biri var mı?",
maxSpamUyarı: 8,
maxSpamBan: 12, 
zaman: 7,
rolİsimi: "Spam-Muted"
});

//////////////////////////////////////////