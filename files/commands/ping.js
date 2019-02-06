module.exports.alias = ["ping"];

//コマンド内容
module.exports.run = (db, client, message) => {
  message.channel.send(`${Math.round(client.ping)} ms`);
};
