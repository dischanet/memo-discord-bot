module.exports.set = {
  name: "list", //名前
  aliases: ["list", "li"] //エイリアス
};

//コマンド内容
module.exports.run = async (db, client, message) => {
  const msg = await message.channel.send("メモを取得しています....");

  db.all(
    "SELECT * FROM memo WHERE user_id=?;",
    [message.author.id],
    (err, rows) => {
      let memos = "";
      for (const memo of rows) {
        memos += `${memo.memo_title}\n`;
      }
      const embed = {
        title: "メモ一覧",
        color: 0xf8e71c,
        description: memos,
        footer: {
          icon_url: message.author.avatarURL,
          text: message.author.tag
        }
      };

      msg.edit({ embed });
    }
  );
};
