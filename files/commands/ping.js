module.exports.set = {
  name: 'ping',//名前
  aliases: ['ping'],//エイリアス
};

//コマンド内容
module.exports.run = (client, message) => {
  message.channel.send(`${Math.round(client.ping)} ms`);
};
