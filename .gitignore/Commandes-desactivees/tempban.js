const Discord = require("discord.js");
const sqlite3 = require('sqlite3').verbose();

module.exports.run = async (client, message, args) => {
    let db = new sqlite3.Database('data.db');
    if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send(":x: Permissions insuffisantes !");

    if(message.mentions.users.size === 0) {
        return message.channel.send(":x: Vous devez mentionner un utilisateur");
    }

    let ban = message.guild.member(message.mentions.users.first());

    if(!ban) {
        return message.channel.send(":x: Je n'ai pas trouvé l'utilisateur !");
    }

    if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.channel.send(":x: Le bot n'a pas la permission !"); //client est le bot
    var tps;
    var argument3 = args[2];
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
    dateDeCrea = Date.now();
    db.run(`INSERT INTO sanctions(isChoseAFaire, choseAFaire, dateDeCrea, tpsAAttendre, idPersonneSanctionee, serveur) VALUES(?, ?, ?, ?, ?, ?)`, [true, `deban`, `${dateDeCrea}`, `${tps}`, `${message.mentions.users.first().id}`, `${message.guild.id}`], function(err) {
        if (err) {
          return console.log(err.message);
        }
    });
    setTimeout(function(){
        message.guild.unban(message.mentions.users.first().id, "Fin du ban temporaire");
        db.run(`DELETE FROM sanctions WHERE dateDeCrea = (?) AND idPersonneSanctionee = (?) AND serveur = (?)`, [`${dateDeCrea}`, `${message.mentions.users.first().id}`, `${message.guild.id}`], function(err) {
            if (err) {
                return console.log(err.message);
            }
        })
    }, tps);
    if (args[3] != undefined) {
        var raison = message.content.substring(12+args[1].length+args[2].length, message.content.length);
        message.mentions.users.first().send(`Vous avez été banni du serveur **${message.guild.name}** par ${message.author.username} pendant **${argument3}** pour la raison \`${raison}\``).catch(console.error).then(member => {
            ban.ban(`${raison}`).then(member => {
                message.channel.send(`:white_check_mark: ${member.user.username} est ban par ${message.author.username} pendant **${argument3}** pour la raison \`${raison}\``);
            });});
    } else {
        message.mentions.users.first().send(`Vous avez été banni du serveur **${message.guild.name}** par ${message.author.username} pendant **${argument3}**`).catch(console.error).then(member => {
        ban.ban().then(member => {
            message.channel.send(`:white_check_mark: ${member.user.username} est ban par ${message.author.username} pendant **${argument3}**`);
    });});
}}
};

module.exports.help = {
    name : "tempban"
}