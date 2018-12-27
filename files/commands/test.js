module.exports.set = {
  name: 'test',//名前
  aliases: ['test'],//エイリアス
};

//コマンド内容
module.exports.run = (client, message) => {
  message.channel.send('テストです');
};
