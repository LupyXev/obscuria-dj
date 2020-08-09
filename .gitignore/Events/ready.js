const sqlite3 = require('sqlite3').verbose();
const Discord = require("discord.js");

module.exports = async(client) => {

    client.user.setPresence({
        game: {
            name : "Obscuria en maintenance environ jusqu'au 27/08"
            //name : `Obscuria en cours de développement sur ${client.guilds.size} serveur(s)`
        }
    })
    let db = new sqlite3.Database('data.db');
    db.all(`SELECT * FROM reminds`, [], (err, rows) => {
        if (err) {throw err;}
        rows.forEach((row) => {
            if (row.dateDeCrea + row.tpsAAttendre - Date.now() <= 0)
            {
                client.users.get(row.idAuteur).send(":stopwatch: **Rappel** : " + row.texte);
                db.run(`DELETE FROM reminds WHERE dateDeCrea = (?) AND idAuteur = (?)`, [`${row.dateDeCrea}`, `${row.idAuteur}`], function(err) {
                    if (err) {
                        return console.log(err.message);
                    }
                })
            } else if(row.dateDeCrea + row.tpsAAttendre - Date.now() > 0) {
                setTimeout(function(){
                    client.users.get(row.idAuteur).send(":stopwatch: **Rappel** : " + row.texte);
                    db.run(`DELETE FROM reminds WHERE dateDeCrea = (?) AND idAuteur = (?)`, [`${row.dateDeCrea}`, `${row.idAuteur}`], function(err) {
                        if (err) {
                            return console.log(err.message);
                        }
                    })
                }, row.dateDeCrea + row.tpsAAttendre - Date.now());            }
        })
    });
    db.all(`SELECT * FROM sanctions`, [], (err, rows) => {
        if (err) {throw err;}
        rows.forEach((row) => {
            if (row.dateDeCrea + row.tpsAAttendre - Date.now() <= 0)
            {
                client.guilds.get(row.serveur).unban(row.idPersonneSanctionee, "Fin du ban temporaire");
                db.run(`DELETE FROM sanctions WHERE dateDeCrea = (?) AND idPersonneSanctionee = (?) AND serveur = (?)`, [`${row.dateDeCrea}`, `${row.idPersonneSanctionee}`, `${row.serveur}`], function(err) {
                    if (err) {
                        return console.log(err.message);
                    }
                })
            } else if(row.dateDeCrea + row.tpsAAttendre - Date.now() > 0) {
                setTimeout(function(){
                    client.guilds.get(row.serveur).unban(row.idPersonneSanctionee, "Fin du ban temporaire");
                    db.run(`DELETE FROM sanctions WHERE dateDeCrea = (?) AND idPersonneSanctionee = (?) AND serveur = (?)`, [`${row.dateDeCrea}`, `${row.idPersonneSanctionee}`, `${row.serveur}`], function(err) {
                        if (err) {
                            return console.log(err.message);
                        }
                    })
                }, row.dateDeCrea + row.tpsAAttendre - Date.now());
            }
                
        })
    });
    db.all("SELECT * FROM attenteDeMessages", [], (err, rows) => {
        if (err) {throw err;}
        rows.forEach((row) => {
            //var date = row.dateDeCrea, channel = row.idChannel, joueur = row.idJoueur, temps = row.tpsAAttendre;
            if (row.dateDeCrea + row.tpsAAttendre - Date.now() <= 0) {
                db.run("DELETE FROM attenteDeMessages WHERE id = (?)", [row.id], function(err) {
                    if (err) {return console.log(err.message)}
                })
                
            } else if(row.dateDeCrea + row.tpsAAttendre - Date.now() > 0) {
                
                setTimeout(function(){
                    db.run("DELETE FROM attenteDeMessages WHERE id = (?)", [row.id], function(err) {
                        if (err) {
                            return console.log(err.message);
                        }
                    })
                }, row.dateDeCrea + row.tpsAAttendre - Date.now());
                //console.log(row.dateDeCrea + row.tpsAAttendre - Date.now());
            }
        })
    });
    console.log("Le bot à été allumé !");
    var tps = new Date(Date.now())
    const demarrage = new Discord.RichEmbed()
        .setColor("#21008b")
        .setTitle("<:obscuriaemoji:594894622484987905> **Le bot a été lancé __avec succès__**")
        .setDescription(`à ${tps.toString()}`)
    client.guilds.get("592376709697896456").channels.get("594142073712672769").send(demarrage);
};