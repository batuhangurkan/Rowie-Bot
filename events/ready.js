const request = require("request");

module.exports = async client => {
  const statusList = [
    {
      type: "PLAYING"
    },
    { msg: "Batuş''u", type: "WATCHING" },
    { msg: "Sudiş'i", type: "WATCHING" },
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
