const Discord = require("discord.js");
const { Client } = require('pg');
const clientSQL = new Client({ connectionString: process.env.DATABASE_URL, ssl: true, });


module.exports.run = (client, message, args) => {
    
    clientSQL.connect((err) => {if (err) throw err;});
    var existe=false, dejaCommenceAEtreCree=false;
    clientSQL.query(`SELECT * FROM liste_des_saves WHERE idJoueur = (${message.author.id})`, (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
            //message.channel.send(JSON.stringify(row));
            if (row.creationsave1terminee === true){existe = true;}
            else {
                dejaCommenceAEtreCree=true;
            }
            
        }
        clientSQL.end();
    });
        if (existe) {
            const erreur = new Discord.RichEmbed()
            .setColor("#21008b")
            .setTitle("**Erreur**")
            .setDescription(`\n\n:x: **Erreur vous avez déjà créé un compte**, je ne gère pas encore les sauvegardes multiples.`);
            message.channel.send(erreur);
        } else {
            if(!dejaCommenceAEtreCree){
            
                //ajouter choisir classe et race
                const richChoixRace = new Discord.RichEmbed()
                .setColor("#21008b")
                .setTitle("**Choix de votre race**")
                .setDescription("\n\n\n__Cliquez sur la réaction qui correspond au numéro de votre choix :__\n\n:one: : **Naga** : \n` - Bon terrain : Marais | Mauvais terrain : n'a pas de mauvais terrain\n - Augmente la capacité de poison si la classe choisie est empoisonneur ⚠⚠⚠ Ne permet pas de faire des dégats de poison sans la classe empoisonneur ⚠⚠⚠ (passif)\n - Immunisé au poison (passif)\n - Régénération de 10% des PV max tous les 2 tours (passif)`\n\n:two: : **Homme-Dragon** : \n` - Bon terrain : volcan | mauvais terrain : océan\n - Immunisé aux brûlures (passif)\n - Dégâts liés au feu augmentés de 20 % (passif)\n - Vol : 1/2 d’esquiver une attaque tous les 3 tours (passif)`\n\n:three: : **Elfe**\n` - Bons terrains : forêt + plaine / Mauvais terrains : volcan + marais\n - Dégâts magiques augmentés de 20 % (passif)\n - Résistance de 10 % aux dégâts magiques (passif)`\n\n:four: : **Nain**\n`- Bons terrains : plaine + montagne / mauvais terrains : océan\n - Augmentation de 15 % des dégâts physiques (passif)\n - Résistance de 15 % aux dégâts physiques (passif)\n - réussit toujours à améliorer les armes / armures (passif)`\n\n:five: :  **Ondin**\n`- Bon terrain : océan / mauvais terrain : marais\n - Dégâts liés à l’eau augmentés de 20 % (passif)\n - Dégâts magiques augmentés de 10 % (passif)\n - Résistance aux dégâts liés au feu de 10 % (passif)`");
                messageChoixRace = richChoixRace;
                var idMessageChoixRace;
                message.channel.send(richChoixRace).then(a =>
                idMessageChoixRace= a.id);
                console.log(idMessageChoixRace);
                
                //choix race
                clientSQL.connect((err) => {if (err) throw err;});
                clientSQL.query(`INSERT INTO attente_de_reaction(idServeur, idChannel, idJoueur, idMessage, dateDeCrea, tpsAAttendre, raisonDeAttendre) VALUES(${message.guild.id}, ${message.channel.id}, ${message.author.id}, ${messageChoixRace.id}, ${Date.now()}, 300000, "choix race")`, (err, res) => {
                    if (err) throw err;
                });
        
                /*setTimeout(function(){
                     db.run(`DELETE FROM attenteDeReaction WHERE idMessage = (?) AND idJoueur = (?) AND raisonDeAttendre = (?)`, [`${varChoixRace.id}`, `${message.author.id}`, `choix race`], function(err) {
                        if (err) {
                            return console.log(err.message);
                     }
                    })
                }, 300000);*/
            } else {


                var dejaEnAttenteDuUsername=false;
                db.all("SELECT * FROM attenteDeMessages WHERE idJoueur = (?) AND raisonDeAttendre = (?)", [message.author.id, "nom du username"], (err, rows) => {
                    if (err) {throw err;}
                    rows.forEach((row) => {
                        dejaEnAttenteDuUsername = true;
                    })
                    if (!dejaEnAttenteDuUsername) {
                    db.run(`INSERT INTO attenteDeMessages(idServeur, idChannel, idJoueur, dateDeCrea, tpsAAttendre, raisonDeAttendre) VALUES(?, ?, ?, ?, ?, ?)`, [message.guild.id, message.channel.id, message.author.id, Date.now(), 300000, "nom du username"], function(err) {
                        if (err) {
                            return console.log(err.message);
                        }
                    });
            
                    setTimeout(function(){
                         db.run(`DELETE FROM attenteDeMessages WHERE idChannel = (?) AND idJoueur = (?) AND raisonDeAttendre = (?)`, [`${message.channel.id}`, `${message.author.id}`, `nom du username`], function(err) {
                            if (err) {
                                return console.log(err.message);
                         }
                        })
                    }, 300000);
                    message.channel.send("Veuillez entrer le nom d'utilisateur qui vous représentera sur Obscuria");
                   } else {
                        const erreur = new Discord.RichEmbed()
                        .setColor("#21008b")
                        .setTitle("**Erreur**")
                        .setDescription(`\n\n:x: **Erreur : Vous avez déjà fait la demande de création de compte, merci d'attendre 5 minutes**`);
                         message.channel.send(erreur);
                    }
                });
            }
       
        }
    
    
}

module.exports.help = {
    name: 'create',
};