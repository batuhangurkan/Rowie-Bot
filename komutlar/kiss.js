const Discord = require("discord.js");
exports.run = (client, message, args, tools) => {
      let idler = ['628955894809624586', 'ID']
  if (message.author.bot || message.channel.type === "dm") return;

  var gifler = [
    "https://media.giphy.com/media/HKQZgx0FAipPO/giphy.gif",
    "https://cdn.discordapp.com/attachments/577500526749679619/580127184799268864/image0.gif",
    "https://cdn.discordapp.com/attachments/577500526749679619/580127067488911360/image0.gif",
    "https://cdn.discordapp.com/attachments/577500526749679619/580127260565307402/image0.gif",
    "https://cdn.discordapp.com/attachments/577500526749679619/580127347844448282/image0.gif",
    "https://cdn.discordapp.com/attachments/577500526749679619/580127561787506699/image0.gif",
    "https://cdn.discordapp.com/attachments/577500526749679619/580127582901633034/image0.gif",
    "https://cdn.discordapp.com/attachments/577500526749679619/580127677277667328/image0.gif",
    "https://cdn.discordapp.com/attachments/577500526749679619/580127874657550336/image0.gif",
    "https://tenor.com/view/kissing-make-up-caressing-smooching-snuggling-gif-13953470",
    "http://45.media.tumblr.com/00e6fbba41137992c38c04b4737b5c0b/tumblr_nko99t1z401uo0fjdo1_500.gif",
    "https://media0.giphy.com/media/17zrEYLzrQwgM/giphy.gif?cid=790b76115ccc8cc761596a33551818af&rid=giphy.gif",
    "https://media1.tenor.com/images/39cfeb56ad27483e51037ad2cf51af97/tenor.gif",
    "https://i1.wp.com/tuanputeri.com/wp-content/uploads/2019/03/princess6.gif",
    "https://78.media.tumblr.com/6ee2b7c64bdd13b93c9cf6abc2d16b5e/tumblr_o2nnk0G2P41ulficuo1_500.gif",
    "https://thumbs.gfycat.com/SimilarWealthyHawk-size_restricted.gif",
    "https://media2.giphy.com/media/F1WftEL9Luw7K/giphy.gif?cid=790b76115ccc8ce1784375626f8096b8&rid=giphy.gif",
    "https://data.whicdn.com/images/76661628/original.gif",
    "https://media3.giphy.com/media/n5lxRSJWjKbkY/giphy.gif?cid=790b76115ccc8cf54b34474e4d77027f&rid=giphy.gif"
  ];
  let resimler = gifler[Math.floor(Math.random() * gifler.length)];
  var kullanıcı = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!kullanıcı) {
    const buyEmb = new Discord.RichEmbed()
      .setDescription(`\`${message.author.username}#${message.author.discriminator}\` birini etiketlemelisin.`);
    message.channel.send({ embed: buyEmb });
    return;
  }
  if (
    !message.mentions.members.first().user.username ===
    message.isMentioned(message.author)
  ) {
    const candyEmb = new Discord.RichEmbed()
      .setDescription(
        `\`${message.mentions.members.first().user.username}#${message.mentions.members.first().user.discriminator}\` senii, \`${message.author.username}#${message.author.discriminator}\` öptü.`
      )
      .setImage(resimler);
    message.channel.send({ embed: candyEmb });
    return;
  }
  if (message.author.id === kullanıcı.id) {
    const candyEmb = new Discord.RichEmbed()
      .setTitle(`Kendini öpecek kadar yalnız mısın? 😟`)
      .setImage(resimler);
    message.channel.send({ embed: candyEmb });
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: "kiss",
  kategori:'eğlence',
  description: "istediğiniz kişiyi öper!.",
  usage: "kiss [isim]"
};