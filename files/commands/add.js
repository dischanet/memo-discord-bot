module.exports.set = {
  name: 'add',//名前
  aliases: ['add'],//エイリアス
};

//コマンド内容
module.exports.run = (db, client, message) => {

  db.serialize(() => {

    let memo = message.content.split(' ');
    let memo_title = memo[1];

    if (memo.length < 3) {
      message.channel.send('正しく入力してください。\nメモを追加するには`!madd [タイトル] [内容]`です。');
      return;
    }
    if (memo_title.length > 10) {
      message.channel.send('タイトルが長すぎます。\n10文字以内に変更してください。');
      return;
    }
    memo.splice(0, 2);
    let memo_content = memo.join(' ');
    if (memo_content.length > 1000) {
      message.channel.send('内容が長すぎます。\n1000文字以内に変更してください。');
      return;
    }

    db.get('SELECT * FROM memo WHERE user_id=? AND title=?;', [message.author.id, memo_title], (err, row) => {
      if (row) {
        message.channel.send('同じタイトルのメモが登録されています。\n削除してもう一度登録してください。');
        return;
      } else {
        db.run('INSERT INTO memo VALUES(?,?,?,?)', [message.author.id, message.author.username, memo_title, memo_content], (err_ins) => {
          if (!err_ins) {
            let embed = {
              'title': 'メモを追加しました',
              'color': 0x4A90E2,
              'fields': [
                {
                  'name': 'タイトル',
                  'value': memo_title,
                },
                {
                  'name': '内容',
                  'value': memo_content,
                }
              ],
              'footer': {
                'icon_url': message.author.avatarURL,
                'text': message.author.tag,
              },
            };
            message.channel.send({ embed });
          }
        });
      }
    });
  });

};
