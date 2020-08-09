const Discord = require("discord.js");
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('data.db');


module.exports.run = (client, message, args) => {
    if (message.author.id != "399978674578784286") {
        return message.channel.send(":x: **Vous n'avez pas les droits suffisants** (Autorisé seulement à AlphaDev#5816, dév du bot)");
    }
    message.channel.send(":white_check_mark: Authorisation accordée");
    if (args[1] === undefined) {return message.channel.send(":x: **Arguments manquants**");}
    db.run(`DELETE FROM infos_generales WHERE nom_de_info = ("in-dev")`, [], function(err) {
        if (err) {
            return console.log(err.message);
     }
    });
    db.run(`INSERT INTO infos_generales(nom_de_info, info) VALUES("in-dev", ?)`, [`${message.content.substring(13, message.lenght)}`], function(err) {
        if (err) {
            return console.log(err.message);
        }
    });
    client.guilds.get("592376709697896456").channels.get("603992122890256394").send("<:obscuriaemoji:594894622484987905> **Le bot a été lancé __avec succès__**");

    
    
    
}

module.exports.help = {
    name: 'in-dev-set',
};