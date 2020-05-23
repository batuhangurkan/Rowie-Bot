const Discord = require('discord.js');
const ayarlar = require('./ayarlar.json');
const bot = new Discord.Client()
const express = require('express');
const app = express();
const http = require('http');
const scarew = new Discord.ShardingManager('./boşaltyapı.js', {// Ana dosyanızın adını yazınız.
    totalShards: 2,
    token: ayarlar.token// Buraya tokeninizi yazınız.
});

scarew.spawn(); 

scarew.on('launch', shard => {
  console.log(`**${shard.id}** ID shard started.`)
});

setTimeout(() => {
    scarew.broadcastEval(process.exit());
}, 21600000);