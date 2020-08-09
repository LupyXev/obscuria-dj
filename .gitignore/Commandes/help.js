const Discord = require("discord.js");
const sqlite3 = require('sqlite3').verbose();



module.exports.run = (client, message, args) => {
    var arguments = message.content.substring(7, message.content.lenght);
    if(args[1] === undefined) {
        const help = new Discord.RichEmbed()
        .setColor("#21008b")
        .setTitle("**__Page d'aide__**")
        .setDescription("\n \n :stopwatch: **Remember** : \n``o!remember``, ``o!remember list`` \n:wrench: **Utilitaire :** \n``o!ping``\n<:obscuriaemoji:594894622484987905> **Jeu : **\n``o!create``, ``o!money``\n \nLe reste des autres commandes seront ajoutés pendant les futurs mises à jours");
        message.channel.send(help);
    } else if (arguments === "remember") {
        const help = new Discord.RichEmbed()
        .setColor("#21008b")
        .setTitle("**Commande o!remember :**")
        .setDescription("\n\n:keyboard: **Syntaxe** : o!remember ``[temps à attendre]`` ``[chose à rappeller]``\n\n**Description** : Rappeller une chose\n**Ex:** ``o!remember 1m ranger ma chambre``");
        message.channel.send(help);
    } else if (arguments === "remember list") {
        const help = new Discord.RichEmbed()
        .setColor("#21008b")
        .setTitle("**Commande o!remember list :**")
        .setDescription("\n\n:keyboard: **Syntaxe** : o!remember list\n\n**Description** : Liste de vos rappels\n**Ex:** ``o!remember list``");
        message.channel.send(help);

    } else if(arguments === "create") {
        const help = new Discord.RichEmbed()
        .setColor("#21008b")
        .setTitle("**Commande o!create :**")
        .setDescription("\n\n:keyboard: **Syntaxe** : o!create\n\n**Description** : Créer un compte\n**Ex:** ``o!create``");
        message.channel.send(help);
    } else if(arguments === "money") {
        const help = new Discord.RichEmbed()
        .setColor("#21008b")
        .setTitle("**Commande o!money :**")
        .setDescription("\n\n:keyboard: **Syntaxe** : o!money\n\n**Description** : Affiche votre money\n**Ex:** ``o!money``");
        message.channel.send(help);
    } else if(arguments === "in-dev") {
        const help = new Discord.RichEmbed()
        .setColor("#21008b")
        .setTitle("**Commande o!in-dev :**")
        .setDescription("\n\n:keyboard: **Syntaxe** : o!in-dev\n\n**Description** : Affiche les patchs en cours de développement\n**Ex:** ``o!in-dev``");
        message.channel.send(help);
    
    } else {
        const help = new Discord.RichEmbed()
        .setColor("#21008b")
        .setTitle("**Erreur**")
        .setDescription(":x: __Je n'ai pas trouvé la page d'aide de la commande que vous recherchez__\n\nPour obtenir les commandes disponibles faites o!help");
        message.channel.send(help);
    }
};

module.exports.help = {
    name: 'help',
};