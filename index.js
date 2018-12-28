const Discord = require('discord.js');
const client = new Discord.Client();

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('memo.db');

db.run('CREATE TABLE IF NOT EXISTS memo(user_id INT, name TEXT, title TEXT, content TEXT);');
db.run('CREATE INDEX IF NOT EXISTS idx_id ON memo(user_id);');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('!m?|discha.net');
});

let command = require('./files/command.js');
let prefix = '!m';

client.on('message', message => {
  if (message.author.bot || !message.guild) return;

  if (message.content.startsWith(prefix)) {

    command.run(client, message, prefix, db);

  }
});

client.login(process.env['DISCORD_BOT_TOKEN']);
