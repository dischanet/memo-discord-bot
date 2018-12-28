const Discord = require('discord.js');
const client = new Discord.Client();

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('memo.sqlite');

db.run('CREATE TABLE memo(user_id int, name str, title str, content str, INDEX idx_id(user_id));');

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
