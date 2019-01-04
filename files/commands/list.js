module.exports.set = {
  name: 'list',//名前
  aliases: ['list', 'li'],//エイリアス
};

//コマンド内容
module.exports.run = async (db, client, message) => {
  const msg = await message.channel.send('メモを取得しています....');

  let memos = '';

  db.all('SELECT * FROM memo WHERE user_id=?;', [message.author.id], (err, rows) => {
    for (const memo in rows) {
      memos += `${memo[2]}\n`;
    }
  });

  msg.edit(`めも一覧\n${memos}`);

};
