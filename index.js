const Discord = require('discord.js');
const client = new Discord.Client();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('memo.db');
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS memo(user_id TEXT, name TEXT, title TEXT, content TEXT);');
  db.run('CREATE INDEX IF NOT EXISTS idx_id ON memo(user_id);');
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('!m?|discha.net');
});

const command = require('./files/command.js');
const prefix = '!m';

client.on('message', message => {
  if (message.author.bot || !message.guild) return;

  if (message.content.startsWith(prefix)) {

    command.run(client, message, prefix, db);

  }
});

client.login(process.env['DISCORD_BOT_TOKEN']);
