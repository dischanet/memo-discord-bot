const fs = require("fs"); 

const commands = require("./import.js");

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

  const cmd_message = message.content.slice(data.prefix.length).split(" ")[0];

  const command = commands[cmd_message];

  if (command){
    command.run(db, client, message);
  }
  
};
