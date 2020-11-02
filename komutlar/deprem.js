const Discord = require('discord.js');
const request = require('request');

exports.run = (client, msg, args) => {
  request(`https://api.orhanaydogdu.com.tr/deprem/live.php?limit=1`, function(error,response,body){
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    let deprem = JSON.parse(body);
    console.log(deprem);
    msg.channel.sendEmber(new Discord.RichEmbed()
      .setColor("BLUE")
      .setTitle(`${deprem.result[0].title}`)
      .addField("", "" , true)
      .setFooter(`${deprem.result[0].date}`)
                        
                         
    );
    
    msg.channel.send("Korona "+deprem . result[0]. title);
  });
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'deprem',
  kategori:'',
  description: '',
  usage: 'deprem'
};