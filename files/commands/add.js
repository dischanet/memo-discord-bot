module.exports.set = {
  name: 'add',//名前
  aliases: ['add'],//エイリアス
};

//コマンド内容
module.exports.run = (db,client, message) => {
  let memo = message.content.split(' ');
  if (memo.legnth < 3) {
    message.channel.send('正しく入力してください。\nメモを追加するには\n!madd [タイトル] [内容]');
  }
};
