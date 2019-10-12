const whatsnew_file = "./Whatsnew.json"
const Discord = require('discord.js');
var config = require("./config.json");
var whatsnew = require(whatsnew_file);
const newUsers = new Discord.Collection();
const client = new Discord.Client();
const hook = new Discord.WebhookClient('631860716621660160', 'cksIFNUeB8UQotK7q7piIVWDyVpxEqDMgu0tUgol4PtM3_FVZMvV-L4f5-Jn7E5s9ohQ');
function getTagbyMember(member) {
  var user = member;
  user = user.toString();
  if (user.includes("!")) {
    user = user.split("!")[1].split(">")[0];
  } else {
    user = user.split("@")[1].split(">")[0];
  };
  var tag = "@" + client.users.get(user).tag + " ";
  return tag;


}
function newEmbed(title, color, text, time) {
  // Extract the required classes from the discord.js module

  // Create an instance of a Discord client


  // We can create embeds using the MessageEmbed constructor
  // Read more about all that you can do with the constructor
  // over at https://discord.js.org/#/docs/main/stable/class/RichEmbed
  const embed = new Discord.RichEmbed()
    // Set the title of the field
    .setTitle(title)
    // Set the color of the embed
    .setColor(color)
    // Set the main content of the embed
    .setDescription(text)
    .setFooter(time)
  return embed;
};


var title;
var text;
client.on('ready', () => {
  console.log(`Hey i am in!This is FANA Owner's Bot ${client.user.tag}!`);
  client.user.setGame('Use \"/whatsnew\" ')
});

client.on('message', msg => {
  
  const prefix = config.prefix;

  // If the author's a bot, return
  // If the message was not sent in a server, return
  // If the message doesn't start with the prefix, return
  if (msg.author.bot) return;
  if (!msg.guild) return;
  if (!msg.content.startsWith(prefix)) return;

  // Arguments and command variable
  // cmd is the first word in the message, aka the command
  // args is an array of words after the command
  // !say hello I am a bot
  // cmd == say (because the prefix is sliced off)
  // args == ["hello", "I", "am", "a", "bot"]
  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  const admin = msg.guild.roles.find(role => role.name === "Admin");
  const normal_member = msg.guild.roles.find(role => role.name === "Normal Member");
  const owner = msg.guild.roles.find(role => role.name === "Owner");
  

//Commands System Here:D
  if (cmd === 'whatsnew') {
    if (msg.deletable) msg.delete();
    msg.channel.send(newEmbed(whatsnew.title, 0x025DEC, whatsnew.text, whatsnew.time));
    
  };

  if (cmd === 'shut-down') {
    if (!msg.member.hasPermission("KICK_MEMBERS")) {
      msg.reply("Only Admin Can Execute This Command")
    }
    else {
      if (msg.deletable) msg.delete();
      msg.channel.send(newEmbed("Bot Stop Warn!!!", 0xFF4D2D, "Nice to meet you today,But server has too stop now.All commands(Like /whatsnew) and Other System will been shut down.Good Bye!We'll Back Maybe Tomorrow!"))
    }
  };
  if (cmd === 'start') {
    if (!msg.member.hasPermission("KICK_MEMBERS")) {
      msg.reply("Only Admin Can Execute This Command")
    }
    else {
    if (msg.deletable) msg.delete();
    msg.channel.send(newEmbed("Bot Started!!", 0x3ADC00, "Bot Started!!! Hope you enjoy it!"))
  }};
  if (cmd === 'restart') {
    if (!msg.member.hasPermission("KICK_MEMBERS")) {
      msg.reply("Only Admin Can Execute This Command")
    }
    else {
    if (msg.deletable) msg.delete();
    msg.channel.send(newEmbed("Bot Restart Warn!", 0xF6F941, "Bot will be restart!Be right back!"))
  }};
  if (cmd === 'link') {
    if (msg.deletable) msg.delete();
    msg.channel.send(newEmbed("Share Link Here!", 0x41C0F9, "To share just copy this \n https://discord.gg/u5EQZ2T"))
  };
  if (cmd === 'help') {
    if (msg.deletable) msg.delete();
    msg.reply("To make sure channel clean,I early sent massage to you :D").then(m => m.delete(10000))
    msg.author.sendEmbed(newEmbed("Commands List", 0x41C0F9, "/help - Show this page\n/whatsnew - Show what's new text!\n/link - Give you link of this discord server\n/***Admin Only***\n/stop - Fast tell server's bot will stop\n/restart - Fast tell server's bot will restart\n/start - Fast tell server's bot will start."))
  };


  if (cmd === "reload") {
    if (!msg.member.hasPermission("KICK_MEMBERS")) {
      msg.reply("Only Admin Can Execute This Command")
    }
    else {
    if (msg.deletable) msg.delete();
    fs.readFile(whatsnew_file, (err, data) => {
    
      whatsnew = JSON.parse(data);
  
    });
    fs.readFile("./config.json", (err, data) => {
    
      config = JSON.parse(data);
  
    });
    msg.reply("File Has Been Updated!")
  }};
});

const fs = require('fs');


fs.watchFile(whatsnew_file, (curr, prev) => {
  fs.readFile(whatsnew_file, (err, data) => {
    
    whatsnew = JSON.parse(data);

  });
});



client.on('guildMemberAdd', member => {
  var role = member.guild.roles.find("name", "Normal Member");
  member.addRole(role);
  const server = member.guild;
  const channel = server.channels.find("name", "join-and-leave")
  channel.send(getTagbyMember(member) + "  Welcome!!! Nice to meet you today!\n ` To check What's New just use /whatsnew .  `\n >More info Ask Owner : @fan87#0769 ! ");
  hook.send(" Role System >>  `" + getTagbyMember(member) + "Has been rank up to \"Normal Member\"`")
});


client.on('guildMemberRemove', member => {
  const server = member.guild;
  const channel = server.channels.find("name", "join-and-leave")
  channel.send(getTagbyMember(member) + "  Left The Discord Server .Sad :( But Nice to meet you again");

});


client.login(config.token);
