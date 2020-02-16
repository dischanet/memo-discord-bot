module.exports.set = {
  name: "show", //名前
  aliases: ["show"] //エイリアス
};

//コマンド内容
module.exports.run = async (db, client, message) => {
  const msg = await message.channel.send("メモを検索しています....");

  const memo = message.content.split(" ");
  const memo_title = memo[1];

  db.get(
    "SELECT * FROM memo WHERE user_id=? AND memo_title=?;",
    [message.author.id, memo_title],
    (err, row) => {
      if (!row) {
        msg.edit(`${memo_title}というタイトルのメモは存在しません。`);
      } else {
        const embed = {
          title: "📝メモ",
          color: 0xb8e986,
          fields: [
            {
              name: "タイトル",
              value: memo_title
            },
            {
              name: "内容",
              value: row.memo_content
            }
          ],
          footer: {
            icon_url: message.author.avatarURL,
            text: message.author.tag
          }
        };

        msg.edit({ embed });
      }
    }
  );
};
