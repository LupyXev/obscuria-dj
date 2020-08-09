const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
    var musiques = [];
    var bon = false;
    if(args[1] == "test") {var musiques = ["j'aime les patates"]; bon = true;}
    else {message.channel.send(`Erreur : playlist *"${args[1]}"* inconnue`);}
    if (bon) {
    
    message.channel.send(`Je lance la playlist *"${args[1]}"* lenght : ${musiques.lenght}`);
	for (let i = 0; i < musiques.lenght; i++) {
  		message.channel.send(`-play ${playlist[i]}`);
	}
    }
};

module.exports.help = {
    name: 'play',
};
