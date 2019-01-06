module.exports.set = {
  name: "add", //名前
  aliases: ["add"], //エイリアス
};

const insert = (db, message, memo_title, memo_content, responseMessage) =>
  db.run(
    "INSERT INTO memo VALUES(?,?,?,?)",
    [message.author.id, message.author.username, memo_title, memo_content],
    (err) => {
      if (err) return; // TODO
      const embed = {
        title: "メモを追加しました",
        color: 0x4a90e2,
        fields: [
          { name: "タイトル", value: memo_title },
          { name: "内容", value: memo_content },
        ],
        footer: {
          icon_url: message.author.avatarURL,
          text: message.author.tag,
        },
      };
      responseMessage.edit({ embed });
    }
  );

//コマンド内容
module.exports.run = async (db, client, message) => {
  const responseMessage = await message.channel.send(
    "メモの書き込み確認をしています..."
  );
  const memo = message.content.split(" ");

  if (memo.length < 3) {
    responseMessage.edit(
      "正しく入力してください。\nメモを追加するには`!madd [タイトル] [内容]`です。"
    );
    return;
  }

  const memo_title = memo[1];
  if (memo_title.length > 10) {
    responseMessage.edit(
      "タイトルが長すぎます。\n10文字以内に変更してください。"
    );
    return;
  }

  const memo_content = memo.slice(2).join(" ");
  if (memo_content.length > 1000) {
    responseMessage.edit(
      "内容が長すぎます。\n1000文字以内に変更してください。"
    );
    return;
  }

  db.get(
    "SELECT count(0) FROM memo WHERE user_id=?",
    [message.author.id],
    (err, row) => {
      if (err) return; // TODO
      if (row[0] >= 100) {
        responseMessage.edit(
          "メモが多すぎます。(100個)\n不要なメモを削除してください。"
        );
        return;
      }

      db.get(
        "SELECT * FROM memo WHERE user_id=? AND memo_title=?;",
        [message.author.id, memo_title],
        (err, row) => {
          if (err) return; // TODO
          if (row) {
            responseMessage.edit(
              "同じタイトルのメモが登録されています。\n削除してもう一度登録してください。"
            );
            return;
          }
          insert(db, message, memo_title, memo_content, responseMessage);
        }
      );
    }
  );
};
