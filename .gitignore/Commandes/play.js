const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
    var musiques = [];
    var bon = false;
    if(args[1] == "test") {var musiques = ["j'aime les patates", "coucou", "c'est moi"]; bon = true;}
    else {message.channel.send(`Erreur : playlist *"${args[1]}"* inconnue`);}
    if (bon) {
    
	message.channel.send(`Je lance la playlist *"${args[1]}"* length : ${musiques.length}`);
	var i = 0;
	while (i < musiques.length) {message.channel.send(`-play ${musiques[i]`); i++}
    }
};

module.exports.help = {
    name: 'play',
};
