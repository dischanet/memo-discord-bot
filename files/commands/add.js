module.exports.set = {
  name: 'add',//名前
  aliases: ['add'],//エイリアス
};

//コマンド内容
module.exports.run = (db,client, message) => {
  let memo = message.content.split(' ');
  let memo_title = memo[1];
  let memo_content = memo[2];
  if (memo.legnth < 3) {
    message.channel.send('正しく入力してください。\nメモを追加するには`!madd [タイトル] [内容]`です。');
    return;
  }
  if (memo_title > 10) {
    message.channel.send('タイトルが長すぎます。\n10文字以内に変更してください。');
    return;
  }
  if (memo_content > 1000) {
    message.channel.send('内容が長すぎます。\n1000文字以内に変更してください。');
    return;
  }
  
};
