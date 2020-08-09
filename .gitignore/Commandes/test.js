
const Discord = require("discord.js");


module.exports.run = (client, message, args) => {
    if (message.author.id != "399978674578784286" && message.author.id != "386494683238367234") {
        return message.channel.send(":x: **Vous n'avez pas les droits suffisants** (Autorisé seulement à AlphaDev#5816 et \\_Imoogi\\_#0838)");
    }
    message.channel.send(":white_check_mark: Authorisation accordée");
    
    // Create a reaction collector
    /*const filter = (reaction, user) => reaction.emoji.name === '👌' && user.id === '399978674578784286'
    message.awaitReactions(filter, { time: 14000 })
        .then(collected => console.log(`Collected ${collected.size} reactions`))
        .catch(console.error);*/

    //clientSQL.query(`INSERT INTO reminds(datedecrea) VALUES(3)`, (err) => {if (err) throw err;});
    /*clientSQL.query('SELECT * FROM reminds;', (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
          //message.channel.send(JSON.stringify(row));
          message.channel.send(row.datedecrea);
        }
        clientSQL.end();
      });*/
    //clientSQL.query("CREATE TABLE attente_de_messages (idServeur TEXT, idChannel TEXT, idJoueur TEXT, dateDeCrea INT, tpsAAttendre INT, raisonDeAttendre TEXT)", (err) => {if (err) throw err;});
    //clientSQL.query(`INSERT INTO attente_de_messages(idJoueur) VALUES(${message.author.id})`, (err) => {if (err) throw err;});
    
    /*message.channel.send(message.author.id);
    clientSQL.query(`SELECT * FROM attente_de_messages WHERE idJoueur = (${message.author.id});`, (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
          message.channel.send("a" + JSON.stringify(row.idjoueur));
          //message.channel.send("a" + row.idJoueur);
        }
        clientSQL.end();
      });*/
      
    //clientSQL.query("DELETE FROM attenteDeMessages", (err) => {if (err) throw err;});
    
    /*clientSQL.query("CREATE TABLE attente_de_reaction (idServeur TEXT, idChannel TEXT, idJoueur TEXT, idMessage TEXT, dateDeCrea INT, tpsAAttendre INT, raisonDeAttendre TEXT)", (err) => {if (err) throw err;});
    clientSQL.query("CREATE TABLE infos_generales (nom_de_info TEXT, info TEXT)", (err) => {if (err) throw err;});
    clientSQL.query("CREATE TABLE liste_des_saves (idJoueur TEXT, nbDeSauvegardes INT, saveActu INT, creationSave1Terminee BOOLEAN)", (err) => {if (err) throw err;});
    clientSQL.query("CREATE TABLE reminds (idAuteur TEXT, dateDeCrea INT, tpsAAttendre INT, texte TEXT)", (err) => {if (err) throw err;});
    clientSQL.query("CREATE TABLE sanctions (isChoseAFaire BOOLEAN, choseAFaire TEXT, dateDeCrea INT, tpsAAttendre INT, idPersonneSanctionee TEXT, serveur TEXT)", (err) => {if (err) throw err;});
    clientSQL.query("CREATE TABLE save1 (idJoueur TEXT, nomIG TEXT, money INT, race TEXT, classe TEXT)", (err) => {if (err) throw err;});
    clientSQL.query("DROP TABLE save1", (err) => {if (err) throw err;});*/
 
}

module.exports.help = {
    name: 'test',
};