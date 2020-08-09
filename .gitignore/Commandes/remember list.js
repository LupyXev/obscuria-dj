const Discord = require("discord.js");
const sqlite3 = require("sqlite3").verbose();

module.exports.run = (client, message, args) => {
    let db = new sqlite3.Database('data.db');
    var remindsListe = [""], remindsTpsRestant = [""];
        db.all(`SELECT * FROM reminds WHERE idAuteur = (?)`, [`${message.author.id}`], (err, rows) => {
            if (err) {throw err;}
            rows.forEach((row) => {
                remindsTpsRestant.push(row.dateDeCrea + row.tpsAAttendre - Date.now());
                remindsListe.push(`${row.texte}`);
            })
            var nb = 1, nb2;
            var ADire = "";
            var remindsTpsRestantFinal = [""];
            while (nb != remindsListe.length) {
                if (remindsTpsRestant[nb] / 1000 >= 1)
                {
                    //remindsTpsRestantFinal.push(remindsTpsRestant[nb] % 1000 + " milliseconde(s) ");
                    remindsTpsRestant[nb] = (remindsTpsRestant[nb] - remindsTpsRestant[nb] % 1000) / 1000;
                    
                    if (remindsTpsRestant[nb] / 60 >= 1)
                    {
                        remindsTpsRestantFinal.push(remindsTpsRestant[nb] % 60 + " seconde(s) ");
                        remindsTpsRestant[nb] = (remindsTpsRestant[nb] - remindsTpsRestant[nb] % 60) / 60;
                        if (remindsTpsRestant[nb] / 60 >= 1)
                        {
                            remindsTpsRestantFinal.push(remindsTpsRestant[nb] % 60 + " minute(s) ");
                            remindsTpsRestant[nb] = (remindsTpsRestant[nb] - remindsTpsRestant[nb] % 60) / 60;
                            if (remindsTpsRestant[nb] / 24 >= 1)
                            {
                                remindsTpsRestantFinal.push(remindsTpsRestant[nb] % 24 + " heure(s) ");
                                remindsTpsRestant[nb] = (remindsTpsRestant[nb] - remindsTpsRestant[nb] % 24) / 24;
                                remindsTpsRestantFinal.push(remindsTpsRestant[nb] + " day(s) ");
            
                            } else {
                                remindsTpsRestantFinal.push(remindsTpsRestant[nb] + " heure(s) ");
                            }
        
                        } else {
                            remindsTpsRestantFinal.push(remindsTpsRestant[nb] + " minute(s) ");
                        }
    
                    } else {
                        remindsTpsRestantFinal.push(remindsTpsRestant[nb] + " seconde(s) ");
                    }

                } else {
                    remindsTpsRestantFinal.push(remindsTpsRestant[nb] + " miliseconde(s)");
                }
                remindsTpsRestant[nb] = "";
                nb2 = remindsTpsRestantFinal.length-1;
                while (nb2 != 0) {
                    remindsTpsRestant[nb] += remindsTpsRestantFinal[nb2];
                    remindsTpsRestantFinal.pop();
                    nb2--;
                }
                ADire += `**${nb}** | :stopwatch: **Rappel:** ${remindsListe[nb]} : Temps restant : ${remindsTpsRestant[nb]}\n`;
                nb++;
            }
            if (remindsListe < 1) {
                ADire += `**${message.author.username}** Vous n'avez pas de rappels`;
            }
            const liste = new Discord.RichEmbed()
                .setColor("#0022be")
                .setTitle(`__Liste des rappels de **${message.author.username}** :__\n`)
                .setDescription(ADire);
                message.channel.send(liste)
            
            
        })
        
        
        

    //if(message.content)

};


module.exports.help = {
    name: 'remember list',
};