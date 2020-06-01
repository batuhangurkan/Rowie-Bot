const Discord = require ("discord.js");

exports.run = (client, message) => {
const lembed = new Discord.RichEmbed()
.setColor("#5ab1bb")
.setTitle(" Levels Plugin Comm ")
.addField("!levels","Get a link to the leaderboard")
.addField(" !rank (optional member) " , "Get the rank of anyone in the server")
message.channel.sendEmbed(lembed)
.then; 
const mhelp = new Discord.RichEmbed()
.setColor("#5ab1bb")
.setTitle("Moderator Plugin Commands")
.setThumbnail("https://i.imgur.com/JsgxK3Y.png")
.addField("!ban [member] (optional reason)", "Bans a member from the server")
.addField("!clear (optional member) (optional count)", "Clears messages in a particular channel")
.addField("!infractions [member]" , "Displays how many infractions this member has")
.addField("!kick [member] (optional reason)", "Kicks a member from the server")
.addField("!mute [member] (optional reason)", "Mutes a member in the whole server")
.addField("!tempmute [member] [duration] (optional reason)" , "Temporarly mutes a member in the server")
.addField("!role-info [role]", "--")
.addField("!server-info", "--")
.addField("!slowmode (optional timeout) (optional off)", "Enables/Disables slowmode in a channel")
.addField("!unban [member]", "--")
.addField("!unmute [member]" , "Unmutes a member")
.addField("!user-info (optional member" , "--")
.addField("!warn [member] (optional reason)" , "Warns a member")
message.channel.sendEmbed(mhelp)
.then; const sembed = new Discord.RichEmbed()
.setTitle(" Search Plugin Commands ")
.setColor("#5ab1bb")
.setThumbnail("https://images-ext-2.discordapp.net/external/v0edFI9oWuSe523E3IDXT_4vIpQKHXg3ExG2SH6UwK4/https/i.imgur.com/4e2Rnwq.png")
.addField(" !anime [search] ", "Search for any anime on Kitsu.io")
.addField("!imgur [search]","Search for memes on imgur.com")
.addField("!manga [search]","Search for any manga on Kitsu.io")
.addField("!pokemon [search]","Search for any pokémon on the pokéapi pokédex")
.addField("!twitch [search]","Search for any streamer on Twitch.tv")
.addField("!urban [search]","Search for slang words on the Urban Dictionnary")
.addField("!youtube [search]","Search for YouTube videos")
message.channel.sendEmbed(sembed)
.then; const blindhelp = new Discord.RichEmbed()
.setThumbnail("https://i.imgur.com/ZUlvtW0.png")
.setColor("#5ab1bb")
.setTitle("Blindtest Plugin Commands")
.addField("!start-quiz","Starts a Music Quiz game in your voice channel")
.addField("!stop-quiz","Stops the current Music Quiz game")
message.channel.sendEmbed(blindhelp)
.then; const musichelp = new Discord.RichEmbed()
.setTitle("Music Plugin Commands")
.setColor("#5ab1bb")
.setThumbnail("https://i.imgur.com/1J243X9.png")
.addField("!add [search]","Add a music to the playlist")
.addField("!join","Joins the user voice channel")
.addField("!leave","Leaves current voice channel")
.addField("!play (optional search)","Adds the song to the queue and plays it if the queue is empty")
.addField("!queue","Display the current queue")
.addField("!search [search]","Searches for a song that can be later added to the queue")
.addField("!stop","Stops the current playing song and leaves the voice channel")
.addField("!vote-skip","Starts a vote to skip to the next song")
message.channel.sendEmbed(musichelp)
.then; const recohelp = new Discord.RichEmbed()
.setTitle("Record Plugin Commands")
.setColor("#5ab1bb")
.setThumbnail("https://i.imgur.com/4UjvHCp.png")
.addField("!record","Joins your voice channel and starts a recording")
.addField("!stop-recording","Stops the current recording")
message.channel.sendEmbed(recohelp)
};
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: [], 
    permLevel: 0 
  };
  
  exports.help = {
    name: 'yardım
    description: 'The Help Command',
    usage: 'yardım
  };