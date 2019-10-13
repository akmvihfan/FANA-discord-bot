const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (message.deletable) message.delete();
    let Linkmsg  = new Discord.RichEmbed()  
    .setTitle("Link Here!")
    .setColor(0x41C0F9)
    .setDescription("Share link -> https://discord.gg/u5EQZ2T \n Github Link[New!] -> https://github.com/akmvihfan/FANA-discord-bot")
    .setFooter("FANA Owner");
    message.channel.send(Linkmsg)
}

module.exports.help = {
  name:"link"
}
