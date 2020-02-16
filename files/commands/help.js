module.exports.set = {
  name: "help", //名前
  aliases: ["?", "help"] //エイリアス
};

//コマンド内容
module.exports.run = (db, client, message) => {
  const embed = {
    title: "コマンド一覧",
    color: 0xf5a623,
    fields: [
      {
        name: "!m [タイトル]",
        value: "メモを表示します"
      },
      {
        name: "!madd [タイトル] [内容]",
        value: "メモを書き込みます"
      },
      {
        name: "!mrm [タイトル]",
        value: "メモを削除します"
      },
      {
        name: "!mlist",
        value: "メモの一覧を表示します"
      },
      {
        name: "!m?",
        value: "ヘルプを表示します"
      }
    ],
    footer: {
      icon_url: client.user.avatarURL,
      text: client.user.tag
    }
  };
  message.channel.send({ embed });
};
