const Discord = require('discord.js');
const data = require('quick.db');
const moment = require('moment');
moment.locale('en');

exports.run = async (client, message, args) => {//Can°B#1308

const startTime = await data.fetch('start');
const humanize = require("humanize-duration");
let ölçüm = Date.now() - startTime;
let result = humanize(ölçüm, { language: "en", round: true, conjunction: " , ", serialComma: false });

const uptime = new Discord.RichEmbed().setAuthor(client.user.username, client.user.avatarURL).setColor('#65fdae')
.addField('Local Time', moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'))
.addField('Current Time', result.toString().replace('ago', ''), true)
.addField('Start Time', moment(startTime).format('YYYY-MM-DD HH:mm:ss'), true);
message.channel.send(uptime).then(s => s.delete(20000))

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'uptime'
};// codare ♥