const Discord = require("discord.js");
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('data.db');


module.exports.run = (client, message, args) => {
    db.all(`SELECT info FROM infos_generales WHERE nom_de_info = ("in-dev")`, [], (err, rows) => {
        if (err) {throw err;}
        rows.forEach((row) => {
            message.channel.send(row.info);
        })
    });
    
}

module.exports.help = {
    name: 'in-dev',
};