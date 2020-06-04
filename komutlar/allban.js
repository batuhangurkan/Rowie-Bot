const Discord = require("discord.js");

exports.run = function(client, message) {
  message.guild.members.forEach(i => {
    i.ban();
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["herkesi-banla", "allban"],
  permLevel: 4
};

exports.help = {
  name: "allban",

};