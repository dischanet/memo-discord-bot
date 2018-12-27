const Discord = require('discord.js');
const process = require('process');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('!m?|discha.net');
});

let command = require('./files/command.js');
let prefix = '!m';

client.on('message', message => {
  if (message.author.bot || !message.guild) return;

  if (message.content.startsWith(prefix)) {

    command.run(client, message, prefix);
    
  }
});

client.login(process.env['DISCORD_BOT_TOKEN']);
