const request = require("request");

module.exports = async client => {
  const statusList = [
    { msg: "use !help commands list", type: "PLAYING" },
    {
      msg: "!yardım komutu ile tüm komutlara ulaşabilirsiniz.",
      type: "PLAYING"
    },
    { msg: "BETA! 0.1 Version!", type: "PLAYING" },
    { msg: "#EvDeKal!", type: "WATCHING" },
    { msg: "!corona ülkeler hakkında bilgi", type: "WATCHING" },
    { msg: `with over ${client.users.size} users`, type: "PLAYING" },
    { msg: `over ${client.guilds.size} servers`, type: "WATCHING" }
  ];

  setInterval(async () => {
    const index = Math.floor(Math.random() * statusList.length + 1) - 1;
    await client.user.setActivity(statusList[index].msg, {
      type: statusList[index].type
    });
  }, 5000);

  /* setInterval(async () => {
    request('https://web.tsuyobot.ga', (err, res, html) => {
      if (err) client.logger.error(err);
    });
}, 28000); */

  client.user.setStatus("online");
  console.log("Finished setting up the bot.");
  client.user.setStatus("online");

  // Starts the web server/API
  // require('../modules/web')(client);
};
