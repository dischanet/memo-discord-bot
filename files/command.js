const fs = require('fs');//ファイル操作用モジュール

module.exports.run = (client, message, prefix, db) => {

  fs.readdir('files/commands/', (err, files) => {//コマンドの読み込み
    files.forEach((file) => {

      const command = require(`./commands/${file}`);

      if (command.set.aliases.includes(message.content.slice(prefix.length).split(' ')[0])) {
        command.run(db,client, message);
      }
    });
  });
};
