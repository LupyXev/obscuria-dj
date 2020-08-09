const Discord = require("discord.js");
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('data.db');

module.exports.run = (client, message, args) => {
    var money, existe=false; //chnger pour sauvegardes multiples
    db.all(`SELECT * FROM save1 WHERE idJoueur = (?)`, [message.author.id], (err, rows) => {
        if (err) {throw err;}
        rows.forEach((row) => {
            money = row.money;
            existe = true;
        })
    });
    if (money === undefined) {money = 0;}

    if(existe) {
        const messageMoney = new Discord.RichEmbed()
        .setColor("#21008b")
        .setTitle("**Erreur**")
        .setDescription(`\n\n:x: Vous n'avez pas créé de compte... **Crééez-en un avec la commande o!create** :wink:`);
        message.channel.send(messageMoney);
    } else {
        const messageMoney = new Discord.RichEmbed()
        .setColor("#21008b")
        .setTitle("**Votre money :**")
        .setDescription(`\n\n:moneybag: Vous avez **${money} $**`);
        message.channel.send(messageMoney);
    }
}

module.exports.help = {name: "money"}