const Discord = require("discord.js");
const { Client } = require('pg');
  const clientSQL = new Client({ connectionString: process.env.DATABASE_URL, ssl: true, });


module.exports.run = (client, message, args) => {
  
  
  clientSQL.connect((err) => {if (err) throw err;});
    if (message.author.id != "399978674578784286") {
        return message.channel.send(":x: **Vous n'avez pas les droits suffisants** (Autorisé seulement à AlphaDev#5816, dév du bot)");
    }
    message.channel.send(":white_check_mark: Authorisation accordée");
    if (message.content.substring(6, message.content.lenght) === null || message.content.substring(6, message.content.lenght) === undefined || message.content.substring(6, message.content.lenght) === "") {return message.channel.send(":x: Arguments insuffisants")}
    clientSQL.query(`${message.content.substring(6, message.content.lenght)}`, (err) => {
      if (err) {throw err;}
    });
 
}

module.exports.help = {
    name: 'sql',
};