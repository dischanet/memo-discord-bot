module.exports.set = {
  name: 'add',//名前
  aliases: ['add'],//エイリアス
};

//コマンド内容
module.exports.run = async (db, client, message) => {
  let msg = await message.channel.send('メモの書き込み確認をしています...');
  db.serialize(() => {

    let memo = message.content.split(' ');
    let memo_title = memo[1];

    if (memo.length < 3) {
      msg.edit('正しく入力してください。\nメモを追加するには`!madd [タイトル] [内容]`です。');
      return;
    }
    if (memo_title.length > 10) {
      msg.edit('タイトルが長すぎます。\n10文字以内に変更してください。');
      return;
    }
    memo.splice(0, 2);
    let memo_content = memo.join(' ');
    if (memo_content.length > 1000) {
      msg.edit('内容が長すぎます。\n1000文字以内に変更してください。');
      return;
    }

    db.all('SELECT * FROM memo WHERE user_id=?', [message.author.id], (err, rows) => {
      if (rows.length > 100) {
        msg.edit('メモが大すぎます。(100個)\n不要なメモを削除してください。');
        return;
      }
      db.get('SELECT * FROM memo WHERE user_id=? AND title=?;', [message.author.id, memo_title], (err_t, row) => {
        if (row) {
          msg.edit('同じタイトルのメモが登録されています。\n削除してもう一度登録してください。');
          return;
        }
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
            msg.edit({ embed });
          }
        });
      });
    });
  });

};
