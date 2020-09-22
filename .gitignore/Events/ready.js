const sqlite3 = require('sqlite3').verbose();
const Discord = require("discord.js");

module.exports = async(client) => {

    client.user.setPresence({
        game: {
            name : "Matthias aime bien les patates"
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
    client.guilds.get("448508951324000257").channels.get("554262900349468672").send("Goodbye.");
    const demarrage = new Discord.RichEmbed()
        .setColor("#21008b")
        .setTitle("**Le bot a été lancé __avec succès__**")
        .setDescription(`à ${tps.toString()}`)
    client.guilds.get("448508951324000257").channels.get("593721815017193474").send(demarrage);

};