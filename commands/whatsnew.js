const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (message.deletable) message.delete();
  let whatsnewmsg = new Discord.RichEmbed()  
  .setTitle("Vote System!")
  .setColor(0x025DEC)
  .setDescription("Vote system will release today.Comming soon....")
  .setFooter("04:16:58 10/13/19");
  message.channel.send(whatsnewmsg)

}

module.exports.help = {
  name:"whatsnew"//help name
}
