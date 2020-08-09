const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
    message.channel.send(`Je lance la playlist *"${args[1]}"*`);
    var musiques = [];
    if(args[1] == "test") {var musiques = ["j'aime les patates"];}
    else {message.channel.send(`Erreur : playlist *"${args[1]}"* inconnue`);}
    if (var musiques =! []) {
	for (let i = 0; i < playlist.lenght; i++) {
  		message.channel.send(`-play ${playlist[i]}`);
	}
    }
};

module.exports.help = {
    name: 'play',
};
