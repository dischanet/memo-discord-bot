const fs = require("fs"); //ファイル操作用モジュール
const show = require("./commands/show.js");
module.exports.run = (client, message, prefix, db) => {
  if (message.content.startsWith(`${prefix} `)) {
    show.run(db, client, message);
    return;
  }

  if (message.content.startsWith(`${prefix} `)) {
    show.run(db, client, message);
    return;
  }

  fs.readdir("files/commands/", (err, files) => {
    files.forEach(file => {
      const command = require(`./commands/${file}`);

      if (
        command.set.aliases.includes(
          message.content.slice(prefix.length).split(" ")[0]
        )
      ) {
        command.run(db, client, message);
      }
    });
  });
};
