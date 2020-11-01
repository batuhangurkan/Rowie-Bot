const request = require("request");

module.exports = async client => {
  const statusList = [
    {
      type: "PLAYING"
    },
    { msg: "BETA V0.2", type: "PLAYING" },
    { msg: "!yardım ile tüm komutlara ulaşabilirsiniz.", type: "PLAYING" },
    { msg: "!help access all commands", type: "PLAYING" },
    { msg: "www.rowiebot.ml", type: "PLAYING" },
    { msg: "www.batuhangrkn.ml", type: "PLAYING" },
     { msg: "Dünya Geneli Covid Bilgileri İçin !korona Türkiye İçin !korona turkey", type: "PLAYING" },
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
