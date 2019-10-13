const whatsnew_file = "./Whatsnew.json"
const Discord = require('discord.js');
var config = require("./config.json");
var whatsnew = require(whatsnew_file);
const newUsers = new Discord.Collection();
const bot = new Discord.Client({disableEveryone: true});
const fs = require('fs');
bot.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});



function getTime() {
  var d = new Date();
  var time = " UTC+0:00  " + d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "   " + d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds();
  return time;
};

function getTagbyMember(member) {
  var user = member;
  user = user.toString();
  if (user.includes("!")) {
    user = user.split("!")[1].split(">")[0];
  } else {
    user = user.split("@")[1].split(">")[0];
  };
  var tag = "@" + bot.users.get(user).tag + " ";
  return tag;


}
function newEmbed(title, color, text, time) {
  // Extract the required classes from the discord.js module

  // Create an instance of a Discord bot


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
bot.on('ready', () => {
  console.log(getTime() + `Hey i am in!This is FANA Owner's Bot ${bot.user.tag}!`);
  bot.user.setGame('Use \"/help\" ')
});

bot.on('message', message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  if (!message.guild) return;
  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let cmd = args.shift().toLowerCase();

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) {
    commandfile.run(bot,message,args);
    console.info("Command")
  };




//Commands System Here:D
  if (cmd === 'whatsnew') {
    if (message.deletable) message.delete();
    message.channel.send(newEmbed(whatsnew.title, 0x025DEC, whatsnew.text, whatsnew.time));
    
  };
  if (cmd === 'online') {
    if (message.deletable) message.delete();
    const channel = message.member.guild.channels.find("name", "member-online-fast-tell");
    channel.send(getTagbyMember(message.author) + "Goes Online! \n @everyone ");
  
    
  };
  if (cmd === 'afk') {
    if (message.deletable) message.delete();
    const channel = message.member.guild.channels.find("name", "member-online-fast-tell");
    channel.send(getTagbyMember(message.author) + "Is now AFK \n @everyone ");
  };

  

  if (cmd === 'stop') {
    if (!message.member.hasPermission("KICK_MEMBERS")) {
      message.reply("Only Admin Can Execute This Command")
    }
    else {
      if (message.deletable) message.delete();
      message.channel.send(newEmbed("Bot Stop Warn!!!", 0xFF4D2D, "Nice to meet you today,But server has too stop now.All commands(Like /whatsnew) and Other System will been shut down.Good Bye!We'll Back Maybe Tomorrow!"))
    }
  };
  if (cmd === 'start') {
    if (!message.member.hasPermission("KICK_MEMBERS")) {
      message.reply("Only Admin Can Execute This Command")
    }
    else {
    if (message.deletable) message.delete();
    message.channel.send(newEmbed("Bot Started!!", 0x3ADC00, "Bot Started!!! Hope you enjoy it!"))
  }};
  if (cmd === 'restart') {
    if (!message.member.hasPermission("KICK_MEMBERS")) {
      message.reply("Only Admin Can Execute This Command")
    }
    else {
    if (message.deletable) message.delete();
    message.channel.send(newEmbed("Bot Restart Warn!", 0xF6F941, "Bot will be restart!Be right back!"))
  }};
  if (cmd === 'link') {
    if (message.deletable) message.delete();
    message.channel.send(newEmbed("Share Link Here!", 0x41C0F9, "To share just copy this \n https://discord.gg/u5EQZ2T"))
  };
  if (cmd === 'help') {
    if (message.deletable) message.delete();
    message.reply("To make sure channel clean,I early sent massage to you :D").then(m => m.delete(10000))
    message.author.sendEmbed(newEmbed("Commands List", 0x41C0F9, "/help - Show this page\n/whatsnew - Show what's new text!\n/link - Give you link of this discord server\n***Admin Only***\n/stop - Fast tell server's bot will stop\n/restart - Fast tell server's bot will restart\n/start - Fast tell server's bot will start", getTime()));
  };


  if (cmd === "reload") {
    if (!message.member.hasPermission("KICK_MEMBERS")) {
      message.reply("Only Admin Can Execute This Command")
    }
    else {
    if (message.deletable) message.delete();
    fs.readFile(whatsnew_file, (err, data) => {
    
      whatsnew = JSON.parse(data);
  
    });
    fs.readFile("./config.json", (err, data) => {
    
      config = JSON.parse(data);
  
    });
    message.reply("File Has Been Updated!")
  }};
});




fs.watchFile(whatsnew_file, (curr, prev) => {
  fs.readFile(whatsnew_file, (err, data) => {
    
    whatsnew = JSON.parse(data);

  });
});



bot.on('guildMemberAdd', member => {
  var role = member.guild.roles.find("name", "Normal Member");
  member.addRole(role);
  const server = member.guild;
  const channel = server.channels.find("name", "join-and-leave")
  channel.send(getTagbyMember(member) + "  Welcome!!! Nice to meet you today!\n ` To check What's New just use /whatsnew .  `\n >More info Ask Owner : @fan87#0769 ! ");
});


bot.on('guildMemberRemove', member => {
  const server = member.guild;
  const channel = server.channels.find("name", "join-and-leave")
  channel.send(getTagbyMember(member) + "  Left The Discord Server .Sad :( But Nice to meet you again");

});


bot.login(config.token);
