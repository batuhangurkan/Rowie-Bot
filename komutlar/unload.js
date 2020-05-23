const db = require("quick.db");
exports.run = (client, message, args) => {if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açık. Komutlar Bakım Modunda Çalışmaz')

  let command;
  if (client.commands.has(args[0])) {
    command = args[0];
  } else if (client.aliases.has(args[0])) {
    command = client.aliases.get(args[0]);
  }
  if (!command) {
    return message.channel.send("`" + args[0] + "` adında bir komut yok.");
  } else {
    message.channel.send("`" + command + "` adlı komut devre dışı bırakılıyor...")
      .then(m => {
        client.unload(command)
          .then(() => {
            m.edit("`" + command + "` adlı komut başarıyla devre dışı bırakıldı.");
          })
          .catch(e => {
            m.edit(`Komut yeniden başlatılırken bir hata oluştu: ${command}\n\`\`\`${e.stack}\`\`\``);
          });
      });
  }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['u'],
  permLevel: 0
};

exports.help = {
  name: 'unload',
  description: 'İstediğiniz bir komutu devre dışı bırakır.',
  usage: 'unload <komut adı>'
};
