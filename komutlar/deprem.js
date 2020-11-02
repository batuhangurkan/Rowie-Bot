const Discord = require('discord.js');
const request = require('request');

exports.run = (client, msg, args) => {
  request(`https://corona.lmao.ninja/v2/all`, function(error,response,body){
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    let deprem = JSON.parse(body);
    console.log(deprem);
    msg.channel.send("Hello"+stats . title);
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