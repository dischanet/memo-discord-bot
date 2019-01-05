module.exports.set = {
  name: "rm", //名前
  aliases: ["rm"], //エイリアス
};

//コマンド内容
module.exports.run = async (db, client, message) => {
  const responseMessage = await message.channel.send("メモを削除できるか確認しています...");

  const memo = message.content.split(" ");
  const memo_title = memo[1];
  if (memo.length < 2) {
    responseMessage.edit("正しく入力してください。\n正しくは`!mrm [タイトル]`です。");
    return;
  }
  db.get("SELECT * FROM memo WHERE user_id=? AND title=?;",
    [message.author.id, memo_title],
    (err, row) => {
      if (err) return;
      if (!row) {
        responseMessage.edit(`${memo_title}というタイトルのメモは存在しません`);
        return;
      }
      db.get("DELETE FROM memo WHERE user_id=? AND title=?",
        [message.author.id, memo_title],
        (err, row) => {
          if (err) return;

          const embed = {
            title: "メモを削除しました",
            color: 0xD0021B,
            fields: [
              { name: "タイトル", value: memo_title },
            ],
            footer: {
              icon_url: message.author.avatarURL,
              text: message.author.tag,
            },
          };
          responseMessage.edit({ embed });

        })
    });

};
