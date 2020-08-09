const Discord = require("discord.js");
const sqlite3 = require('sqlite3').verbose();

module.exports.run = async (client, message, args) => {
    let db = new sqlite3.Database('data.db');
    var argument3 = separerArguments(message.content, 1);
        if (argument3 === undefined)
        {
            message.channel.send(":x: Argument non valable faites o!help remember");
        } else {
        var tps;
        tps = argument3.substring(0, argument3.length-1);
        

        if (tps - tps != 0) {
            message.channel.send(":x: Argument non valable faites o!help remember");
        } else {
        if (argument3.charAt(argument3.length-1) === "s") {
            argument3 = `${tps} seconde(s)`;
            tps = tps*1000;
        } else if (argument3.charAt(argument3.length-1) === "m") {
            argument3 = `${tps} minute(s)`;
            tps = tps*1000*60;
            
        } else if (argument3.charAt(argument3.length-1) === "h") {
            argument3 = `${tps} heure(s)`;
            tps = tps*1000*60*60;
            
        } else if (argument3.charAt(argument3.length-1) === "d") {
            argument3 = `${tps} day(s)`;
            tps = tps*1000*60*60*24;
            
        }
        var txt = separerArguments(message.content, 2, false, true);
        dateDeCrea = Date.now();
        setTimeout(function(){
            message.member.send(":stopwatch: **Rappel** : " + txt);
            db.run(`DELETE FROM reminds WHERE dateDeCrea = (?) AND idAuteur = (?)`, [`${dateDeCrea}`, `${message.author.id}`], function(err) {
                if (err) {
                    return console.log(err.message);
                }
            })
        }, tps);
        
        message.channel.send(`:stopwatch: Entendu, je vais t'envoyer un message dans **${argument3}**, pour te rappeler \`${txt}\``);

        db.run(`INSERT INTO reminds(idAuteur, dateDeCrea, tpsAAttendre, texte) VALUES(?, ?, ?, ?)`, [`${message.author.id}`, `${dateDeCrea}`, `${tps}`, `${txt}`], function(err) {
            if (err) {
              return console.log(err.message);
            }
        });
        }}
};

function separerArguments(varDepart, argumentAReturn, prendreNumCaractere=false, prendreToutApres=false) {
    var nb = 0, nb2 = 0;
    var arguments = [""];
    while(nb != varDepart.length) {
        if (varDepart.charAt(nb) === " ") {
            arguments.push("");
            nb2++;
            if(nb2 === argumentAReturn) {
                if(prendreNumCaractere) {
                    var num = nb;
                }
                if(prendreToutApres) {
                    var debutArgument = nb2;
                }
            }
        } else {
            arguments[nb2] += varDepart.charAt(nb);
        }
        nb++;

    }
    if(prendreToutApres) {
        var AReturn = arguments[debutArgument];
        nb2 = debutArgument;
        while(nb2 != arguments.length-1) {
            nb2++;
            AReturn += " " + arguments[nb2];
        }
        
        return AReturn;
    }
    if (prendreNumCaractere) {
        return num;
    } else {
        return arguments[argumentAReturn];
    }
}

module.exports.help = {name: "remember"}