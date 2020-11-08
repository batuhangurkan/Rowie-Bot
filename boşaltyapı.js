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
process.setMaxListeners(0);

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 28000);

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
let wictor = await db.fetch(`küfürEngelFrenzy_${message.channel.id}`)
if (!wictor) return 
if(!message.guild) return;
let küfürler = require('./küfürler.json')
let kelimeler = message.content.slice(" ").split(/ +/g)
if(küfürler.some(kufur => kelimeler.some(kelime => kelime === kufur))) {
if (message.member.hasPermission("MANAGE_MESSAGES")) return;
message.delete()
message.reply('Bu Kanalda küfürleri engelliyorum!').then(msg => msg.delete(5000)) 
}
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
let wictor = await db.fetch(`küfürEngelFrenzy_${oldMsg.channel.id}`)
if (!wictor) return 
if(!newMsg.guild) return;
let küfürler = require('./küfürler.json')
let kelimeler = newMsg.content.slice(" ").split(/ +/g)
if(küfürler.some(kufur => kelimeler.some(kelime => kelime === kufur))) {
if (newMsg.member.hasPermission("MANAGE_MESSAGES")) return;
newMsg.delete()
oldMsg.reply('Mesajını Düzenlemen Bir Şey Değiştirmez!').then(msg => msg.delete(5000)) 
}
});


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


client.on("message", async m => {  
  
  if (m.content.toLowerCase() === `<@!${client.user.id}>`) {

    const rembed = new Discord.RichEmbed()
    .setTitle(`Botun Prefixi: ** ${ayarlar.prefix} **`)
    .setColor("RANDOM")
    .setFooter('Rowie Bot Yapımı Batuhan Gürkana Aittir. !yardım İle Tüm Komutlara Ulaşabilirsiniz.! ', client.user.avatarURL)
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
client.channels.get("").send('Bu Sunucuda Küfür Etmek ve Reklam Paylaşımı Yapmak Yasaktır!')
}, 27720000) // BURAYA SÜREYİ YAZINIZ 1 SANİYE 1000 MİLİSANİYEDİR!

//////////////////////////////////////////////////

client.on('guildMemberAdd', async(member) => {
if(member.guild.id != '') return
const kanal = `Son Üye • ${member.user.username}`
let channel = client.channels.get("") 
channel.setName(kanal);
});

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

/////////////////////////////////////////////////////


client.on("roleDelete", async(role , channel , message , guild) => {
let rolkoruma = await db.fetch(`rolk_${role.guild.id}`);
if (rolkoruma == "acik") {
role.guild.createRole({name: role.name, color: role.color, permissions: role.permissions}) 
role.guild.owner.send(` **${role.name}** Adlı Rol Silindi Ve Ben Rolü Tekrar Oluşturdum ✅:`)


}
}) 

////////////////////////////////////////////////////
const antispam = require("discord-anti-spam-tr");
client.on("message", msg => {
  const spamEngel = db.get(`spamEngel_${msg.guild.id}`)

  if(spamEngel == "açık"){

let spamEngel = JSON.parse(fs.readFileSync("./ayarlar/spamEngel.json", "utf8"));
//istediğiniz yere ekleyin bot.js de

antispam(client, {
  uyarmaSınırı: 3, //Uyarılmadan önce aralıkta gönderilmesine izin verilen maksimum mesaj miktarı.
  banlamaSınırı: 5, //Yasaklanmadan önce aralıkta gönderilmesine izin verilen maksimum ileti miktar.
  aralık: 10000, // ms kullanıcılarda zaman miktarı, yasaklanmadan önce aralık değişkeninin maksimumunu gönderebilir.
  // Uyarı mesajı, kullanıcıya hızlı gideceklerini belirten kullanıcıya gönderilir..
   //Yasak mesaj, yasaklanmış kullanıcıyı ,Banlar
  maxSpamUyarı: 7,//Bir kullanıcının uyarılmadan önce bir zaman dilimi içinde gönderebileceği maksimum kopya sayısı
  maxSpamBan: 20, //Bir kullanıcının yasaklanmadan önce bir zaman diliminde gönderebildiği maksimum kopya sayısı
  zaman: 7, // Spamdan sonraki zaman
  rolİsimi: "spam-susturulmuş" // Spam Atan Kullanıcılar Verilecek Röl
})
};
    }
)

//////////////////////////////////////////////////

client.login(`NTkxMjUwNDcyNjUyODk4MzE1.XQuC6Q.0kdXMQcHM0UZmvk_x3maRs4JAkQ`)
  .then(function() {
    console.log('[Token-Log] Token doğru bir şekilde çalışıyor.')
  }, function(err) {
    console.log("[ERROR] Token'de bir hata oluştu: " + err)
        setInterval(function() {
       process.exit(0)
        }, 20000);
        })



////////////////////////////////////////////////
client.on('guildMemberAdd', async member => {// chimp ♡'d#0110
require('quick.db').set(`giriş.${member.guild.id}.${member.id}`, member.guild.memberCount)  
})// codare

///////////////////////////////////////////////////////
client.on('guildCreate', guild => {

    let bigz = guild.channels.filter(c => c.type === "text").random()
    bigz.send("Bu bot Scr.éw#0001 tarafından kodlanmıştır. Botun web sitesi http://rowiebot.ml komutlara erişmek için !yardım kullanın. Herhangi bir hata durumunda destek sunucumuza gelip botun hatalarını bildirebilirsiniz. Destek Sunucumuz: https://discord.gg/kvrcqcR6qy");
});

///////////////////////////////////////////////////////////////////////



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
//DEVTR
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

client.on("voiceStateUpdate", async(member) => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
  if(sunucupaneli) {
    let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
    let toplamuye = member.guild.channels.find(x =>(x.name).startsWith("Toplam Üye •"))
    let toplamaktif = member.guild.channels.find(x =>(x.name).startsWith("Aktif Üye •"))
    let botlar = member.guild.channels.find(x =>(x.name).startsWith("Botlar •"))
    let rekoraktif = member.guild.channels.find(x =>(x.name).startsWith("Rekor Aktiflik •"))
    let seste = member.guild.channels.find(x =>(x.name).startsWith("Seste •"))
    
    if(member.guild.members.filter(off => off.presence.status !== 'offline').size > rekoronline) {
      db.set(`panelrekor_${member.guild.id}`, member.guild.members.filter(off => off.presence.status !== 'offline').size)
    }
    try{
      toplamuye.setName(`Toplam Üye • ${member.guild.members.size}`)
      toplamaktif.setName(`Aktif Üye • ${member.guild.members.filter(off => off.presence.status !== 'offline').size}`)
      botlar.setName(`Botlar • ${member.guild.members.filter(m => m.user.bot).size}`)
      rekoraktif.setName(`Rekor Aktiflik • ${rekoronline}`)
      seste.setName(`Seste • ${member.guild.members.filter(a => a.voiceChannel).size}`)
   } catch(e) { }
  }
})
client.on("guildBanAdd", async(member) => {
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



client.login(ayarlar.token);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let lastEarthQuake = { 
    "timestamp": 1604510249
};

//lastEarthQuake.json

client.on('ready', () =>{

  let voiceChannel = client.channels.get('772436613263130655');
  setInterval(() =>{
    request(`https://api.orhanaydogdu.com.tr/deprem/live.php?limit=1`, function(error,response,body){
      let deprem = JSON.parse(body);
      if(deprem.result[0].timestamp !== db.get('eqtimestamp')){
        db.set('eqtimestamp', deprem.result[0].timestamp);
        voiceChannel.sendEmbed(new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`${client.user.username} `, client.user.avatarURL) 
        .setTitle(`Deprem | ${deprem.result[0].title}`)
        .addField("Boylam(E):", `${deprem.result[0].lng}` , true)
        .addField("Enlem(N):", `${deprem.result[0].lat}` , true)
        .addField("Büyüklük:", `${deprem.result[0].mag}` , true)
        .addField("Lokasyon:", `${deprem.result[0].lokasyon}` , false)
        .addField("Derinlik:", `${deprem.result[0].depth}` , true)                    
        .setFooter(`Tarih/Saat: ${deprem.result[0].date}`));
        
        
    }
      
  
    });
    
  }, 6000)
 });


///////////////////////////////////////////////////////////////////////////

client.on("guildCreate", guild => {
  let log = client.channels.get("775049033743728651");
  const embed = new Discord.RichEmbed()
    .setAuthor("Yeni bir sunucuya eklendim!")
    .setThumbnail(
      guild.iconURL ||
        "https://media.giphy.com/media/J20kKsn88hYAkpPtHB/giphy.gif"
    )
    .setColor("GREEN")
         .addField("» Sunucu İsmi:", `**${guild.name}**`)
    .addField("» Sunucu ID:", `\`\`\`${guild.id}\`\`\``)
    .addField(
      "Sunucu Bilgisi:",
      `**Sunucu Sahibi: \`${guild.owner}\`\nSunucu Bölgesi: \`${guild.region}\`\nÜye Sayısı: \`${guild.members.size}\`\nKanal Sayısı: \`${guild.channels.size}\`**`
    )
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL);
  log.send(embed);
});
client.on("guildDelete", guild => {
  let log = client.channels.get("775049033743728651");
  const embed = new Discord.RichEmbed()
    .setAuthor("Bir sunucudan atıldım -_-")
    .setThumbnail(
      guild.iconURL ||
        "https://media.giphy.com/media/J20kKsn88hYAkpPtHB/giphy.gif"
    )
    .setColor("RED")
       .addField("» Sunucu İsmi:", `**${guild.name}**`)
    .addField("» Sunucu ID:", `\`\`\`${guild.id}\`\`\``)
    .addField(
      "Sunucu Bilgisi:",
      `**Sunucu Sahibi: \`${guild.owner}\`\nSunucu Bölgesi: \`${guild.region}\`\nÜye Sayısı: \`${guild.members.size}\`\nKanal Sayısı: \`${guild.channels.size}\`**`
    )
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL);
  log.send(embed);
});
 

////////////////////////////////////////////////////////////////////////////

client.on('channelCreate', channel => {
  const c = channel.guild.channels.find('name', 'mod-log');
  if (!c) return;
    let embed = new Discord.RichEmbed()
                    .addField(`Kanal oluşturuldu`, `> İsmi: \`${channel.name}\`\n> Türü: **${channel.type}**\n> ID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)

    c.send(`Yeni bi kanal oluşturuldu`,{embed})
});

client.on('channelDelete', channel => {
  const c = channel.guild.channels.find('name', 'mod-log');
  if (!c) return;
    let embed = new Discord.RichEmbed()
                    .addField(`Kanal silindi`, `> İsmi: \`${channel.name}\`\n> Türü: **${channel.type}**\n> ID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)

    c.send(`Bir kanal silindi`,{embed})
});

client.on('channelUpdate', (oldChannel, newChannel) => { 
  const c = newChannel.guild.channels.find('name', 'mod-log');
  if (!c) return;

    let str = '';

    if(oldChannel.name != newChannel.name)
        str+=`> İsim: \`${oldChannel.name}\` **->** \`${newChannel.name}\`\n`;

    

    let embed = new Discord.RichEmbed()
                    .addField(`Kanal güncellendi`, `${str}> ID: ${oldChannel.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${oldChannel.client.user.username}#${oldChannel.client.user.discriminator}`, oldChannel.client.user.avatarURL)

    c.send(`${oldChannel.name} kanalı güncellendi`,{embed})
});

client.on('emojiCreate', emoji => {
  const c = emoji.guild.channels.find('name', 'mod-log');
  if (!c) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Emoji oluşturuldu`, `> İsmi: \`${emoji.name}\`\n> GIF?: **${emoji.animated}**\n> ID: ${emoji.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)

    c.send(`Bir emoji oluşturuldu`,{embed})
    });
client.on('emojiDelete', emoji => {
  const c = emoji.guild.channels.find('name', 'mod-log');
  if (!c) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Emoji silindi`, `> İsmi: \`${emoji.name}\`\n> GIF? : **${emoji.animated}**\n> ID: ${emoji.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)

    c.send(`Bir emoji silindi`,{embed})
    });
client.on('emojiUpdate', (oldEmoji, newEmoji) => {
  const c = newEmoji.guild.channels.find('name', 'mod-log');
  if (!c) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Emoji güncellendi`, `> Eski ismi: \`${oldEmoji.name}\`\n> Yeni ismi: \`${newEmoji.name}\`\n> ID: ${oldEmoji.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${newEmoji.client.user.username}#${newEmoji.client.user.discriminator}`, newEmoji.client.user.avatarURL)

    c.send(`Bir emoji güncellendi`,{embed})
    });

client.on('guildBanAdd', async (guild, user) => {    
    const channel = guild.channels.find('name', 'mod-log');
  if (!channel) return;
  
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())

    let embed = new Discord.RichEmbed()
                    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
                    .addField(`Kullanıcı banlandı`, `> İsmi: \`${user.username}\`\n> ID: **${user.id}**\nSebep: **${entry.reason || 'Girilmedi'}**`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${entry.executor.username}#${entry.executor.discriminator} tarafından`, entry.executor.avatarURL)

    channel.send(`**${user.username}#${user.discriminator}** kullanıcısı, **${entry.executor.username}#${entry.executor.discriminator}** tarafından banlandı`,{embed})
});

client.on('guildBanRemove', async (guild, user) => {    
    const channel = guild.channels.find('name', 'mod-log');
  if (!channel) return;
  
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())

    let embed = new Discord.RichEmbed()
                    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
                    .addField(`Kullanıcının banı açıldı`, `> İsmi: \`${user.username}\`\n> ID: **${user.id}**\n`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${entry.executor.username}#${entry.executor.discriminator} tarafından`, entry.executor.avatarURL)

    channel.send(`**${user.username}#${user.discriminator}** kullanıcısının, **${entry.executor.username}#${entry.executor.discriminator}** tarafından kaldırıldı`,{embed})
});
client.on('messageDelete', async message => {    
  if(message.author.bot) return

    const channel = message.guild.channels.find('name', 'mod-log');
  if (!channel) return;
  
    let embed = new Discord.RichEmbed()
                    .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
                    .addField(`Mesaj silindi`, `> Mesaj: \`${message.content}\`\n> Kanal: **${message.channel.name}**\n> ID: ${message.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${message.client.user.username}#${message.client.user.discriminator}`, message.client.user.avatarURL)

    channel.send(`**${message.author.username}#${message.author.discriminator}** tarafından gönderilen mesaj, ${message.channel} kanalından silindi`,{embed})
});

client.on('messageUpdate', async (oldMessage, newMessage) => {    
      if(oldMessage.author.bot) return;
    if(oldMessage.content == newMessage.content) return;

    const channel = oldMessage.guild.channels.find('name', 'mod-log');
  if (!channel) return;
  
    let embed = new Discord.RichEmbed()
                    .setAuthor(`${oldMessage.author.username}#${oldMessage.author.discriminator}`, oldMessage.author.avatarURL)
                    .addField(`Mesaj güncellendi`, `> Eski mesaj: \`${oldMessage.content}\`\n> Yeni mesaj: \`${newMessage.content}\`\n> Kanal: **${oldMessage.channel.name}**\n> ID: ${oldMessage.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${oldMessage.client.user.username}#${oldMessage.client.user.discriminator}`, oldMessage.client.user.avatarURL)

    channel.send(`**${oldMessage.author.username}#${oldMessage.author.discriminator}** tarafından gönderilen mesaj, ${oldMessage.channel} kanalında güncellendi`,{embed})
});

client.on('roleCreate', async (role) => {    

    const channel = role.guild.channels.find('name', 'mod-log');
  if (!channel) return;
  
    let embed = new Discord.RichEmbed()
.addField(`Rol oluşturuldu`, `> ismi: \`${role.name}\`\n> ID: ${role.id}`)                    
.setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)

    channel.send(`yeni bir rol oluşturuldu`,{embed})
});

client.on('roleCreate', async (role) => {    

    const channel = role.guild.channels.find('name', 'mod-log');
  if (!channel) return;
  
    let embed = new Discord.RichEmbed()
.addField(`Rol silindi`, `> ismi: \`${role.name}\`\n> ID: ${role.id}`)                    
.setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)

    channel.send(`bir rol silindi`,{embed})
});

client.on('voiceStateUpdate', async (oldMember, newMember) => {    

    let oldVoice = oldMember.voiceChannel;
    let newVoice = newMember.voiceChannel;

  
      if(!oldVoice) {
          var c = newMember.guild.channels.find('name', 'mod-log');
  if (!c) return;
        let embed = new Discord.RichEmbed()

        embed.setAuthor(`${newMember.user.username}#${newMember.user.discriminator}`, newMember.user.avatarURL)
        .addField(`Sesli kanala katıldı`, `> İsmi: \`${newMember.user.username}\`\n> ID: **${newMember.user.id}**`)
        .setTimestamp()
        .setColor("RANDOM")
        .setFooter(`${newMember.client.user.username}#${newMember.client.user.discriminator}`, newMember.client.user.avatarURL)

        c.send(`**${oldMember.user.username}#${oldMember.user.discriminator}** sesli bir kanala katıldı`,{embed})
    } else if (!newVoice) {
              var c = oldMember.guild.channels.find('name', 'mod-log');
  if (!c) return;
        let embed = new Discord.RichEmbed()

        embed.setAuthor(`${oldMember.user.username}#${oldMember.user.discriminator}`, oldMember.user.avatarURL)
        .addField(`Sesli kanaldan ayrıldı`, `> İsmi: \`${oldMember.user.username}\`\n> ID: **${oldMember.user.id}**`)
        .setTimestamp()
        .setColor("RANDOM")
        .setFooter(`${oldMember.client.user.username}#${oldMember.client.user.discriminator}`, oldMember.client.user.avatarURL)

        c.send(`**${oldMember.user.username}#${oldMember.user.discriminator}** sesli bir kanaldan ayrıldı`,{embed})
    }

});

//////////////////////////////////////////////

client.on('ready', () => {
  const moment = require("moment");
require("moment-duration-format");

 setInterval(() => {
const calismasure = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
let botdurum = client.channels.find(c => c.id === '775062431298879528')//Botun sürekli mesaj atacağı kanal.
const botistatistik = new Discord.RichEmbed()
    .setColor('RED')
    .setTitle('= Bot İstatistikleri =')
    
.addField(`RAM`,`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/512mb`)
.addField(`Çalışma Süresi`,`${calismasure}`)
.addField(`Ping`,`${client.ping}`)
.addField(`discord.js`,`v${Discord.version}`)
.addField(`Bilgi`,`${client.guilds.size.toLocaleString()} sunucu ve ${client.users.array().length} kullanıcıya hizmet veriyor.`)
.setTimestamp()
botdurum.send(botistatistik);
  }, 3600000); //Milisaniye cinsinden. 1 saniye =  1000 milisaniye. Örnek Olarak 1 saat = 3600000milisaniye
});


////////////////////////////////////////////////////////////////////////////

client.on("guildMemberAdd", async member => {
const fs = require('fs');
let gc = JSON.parse(fs.readFileSync("./jsonlar/gc.json", "utf8"));
  
  const hgK = member.guild.channels.get(gc[member.guild.id].gkanal)
    if (!hgK) return;
        let username = member.user.username;
   
            const bg = await Jimp.read("https://cdn.discordapp.com/attachments/321646765180715008/520209658204651520/guildAdd.png");
            const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    hgK.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        let hgm = JSON.parse(fs.readFileSync("./jsonlar/hgm.json", "utf8"));
    const hgmK = member.guild.channels.get(hgm[member.guild.id].gkanal)
    var kullanici = member.tag
    var sunucu = member.guild.name
    hgmK.send(`${gc[member.guild.id].mesaj}`)
    })
client.on("guildMemberRemove", async member => {
const fs = require('fs');
let gc = JSON.parse(fs.readFileSync("./jsonlar/gc.json", "utf8"));
    const hgK = member.guild.channels.get(gc[member.guild.id].gkanal)
    if (!hgK) return;
        let username = member.user.username;
         
                        const bg = await Jimp.read("https://cdn.discordapp.com/attachments/321646765180715008/520209659785773056/guildRemove.png");
            const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    hgK.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        
    })

////////////////////////////////////////////////////////////////////////

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', 'sunucu');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('GREEN')
  .setAuthor(member.user.username, member.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setTitle('?? | Sunucuya katıldı')
  .setTimestamp()
  channel.sendEmbed(embed);
});

client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.find('name', 'sunucu');
    if (!channel) return;
    const embed = new Discord.RichEmbed()
        .setColor('RED')
        .setAuthor(member.user.username, member.user.avatarURL)
        .setThumbnail(member.user.avatarURL)
        .setTitle('?? | Sunucudan ayrıldı')
        .setTimestamp()
    channel.sendEmbed(embed);
});

///////////////////////////////////////////////////////////////

