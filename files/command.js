const fs = require('fs');//ファイル操作用モジュール

module.exports.run = (client, message, prefix, db) => {

  fs.readdir('files/commands/', (err, files) => {//コマンドの読み込み
    files.some((file) => {

      const aliases = [];
      const command = require(`./commands/${file}`);

      command.set.aliases.forEach((alias) => aliases.push(alias));

      if (aliases.includes(message.content.slice(prefix.length).split(' ')[0])) {
        command.run(db,client, message);
      }
    });
  });
};
