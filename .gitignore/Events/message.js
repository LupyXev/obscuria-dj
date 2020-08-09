const Discord = require("discord.js");


const prefix = "o!", prefix2 = "O!";

module.exports = async(client, message) => {
    if (message.author.bot) return;
    if(message.channel.type === "dn") return;

    if (message.content.length > 1000) {return message.channel.send(":x: **Le message est trop gros**")}
    
    /*if (message.content.substring(0, 8) != "o!create") {
        db.all("SELECT raisonDeAttendre FROM attenteDeMessages WHERE idServeur = (?) AND idChannel = (?) AND idJoueur = (?)", [message.guild.id, message.channel.id, message.author.id], (err, rows) => {
            if (err) {throw err;}
            rows.forEach((row) => {
                if(row.raisonDeAttendre === "nom du username") {
                            db.run(`INSERT INTO listeDesSaves(idJoueur, SaveActu) VALUES(?, ?)`, [message.author.id, 1], function(err) {
                                if (err) {throw err;}
                        
                            }); //à changer pour les sauvegardes multiples
                            db.run(`INSERT INTO save1(idJoueur, nomIG) VALUES (?, ?)`, [message.author.id, message.content], function(err) {
                            //à modifier pour les saves multiples
                                if (err) {
                                    return console.log(err.message);
                                }
                            });
                            db.run("DELETE FROM attenteDeMessages WHERE idServeur = (?) AND idChannel = (?) AND idJoueur = (?)", [message.guild.id, message.channel.id, message.author.id], function(err) {
                                if (err) {
                                    return console.log(err.message);
                                }
                            });
                            db.all("SELECT id FROM save1 WHERE idJoueur = (?)", [message.author.id], (err, rows2) => {
                                if(err) {throw err;}
                                rows2.forEach((row2) => {
                                    db.run("UPDATE listeDesSaves SET idSave1 = (?) WHERE idJoueur = (?)", [row2.id, message.author.id], function(err) {
                                        if (err) {
                                            return console.log(err.message);
                                        } 
                                    });
                                })
                            });
                            
                            message.channel.send(`:white_check_mark: Votre nom d'utilisateur a bien été enregistré comme "${message.content}"`)
                        
                        
                    
                    
                }
            })
    
        });
    }*/
    
    if(!message.content.startsWith(prefix) && !message.content.startsWith(prefix2)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    commande = args[0];
    commande = commande.toLowerCase();
    

    if (commande === "rmd") {commande = "remember"}
    if (commande === "remember") {if (message.content.length === 15) {if (message.content.substring(11, 16) === "list") {commande = "remember list";}} else {if (message.content.length === 10) {if (message.content.substring(6, 11) === "list") {commande = "remember list";}}}}

    
    //clientSQL.query("CREATE TABLE reminds (idAuteur text, dateDeCrea DECIMAL, tpsAAttendre DECIMAL, texte TEXT)")

    //message.channel.send(":floppy_disk: **Désolé, je suis en maintenance pour une durée indeterminée, toutes les commandes sont désactivées...**")
    const cmd = client.commands.get(commande);
    if (message.author.id != "399978674578784286") {
        return message.channel.send(":floppy_disk: **Désolé, je suis en maintenance environ jusqu'au 27/08, toutes les commandes sont désactivées...**");
    }

    if (!cmd) return;
    

    cmd.run(client, message, args);
    
};