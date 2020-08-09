const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {

    console.log(args.length);

    if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send(":x: Permissions insuffisantes !");

    if(message.mentions.users.size === 0) {
        return message.channel.send(":x: Vous devez mentionner un utilisateur");
    }

    let ban = message.guild.member(message.mentions.users.first());

    if(!ban) {
        return message.channel.send(":x: Je n'ai pas trouvé l'utilisateur !");
    }

    if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.channel.send(":x: Le bot n'a pas la permission !"); //client est le bot

    if (args[2] != "undefined") {
        var raison = message.content.substring(7+args[1].length, message.content.length);
        message.mentions.users.first().send(`Vous avez été banni du serveur **${message.guild.name}** par ${message.author.username} pour la raison \`${raison}\``).catch(console.error).then(member => {
            ban.ban(`${raison}`).then(member => {
                message.channel.send(`:white_check_mark: ${member.user.username} est ban par ${message.author.username} pour la raison \`${raison}\``);
            });});
    } else {
    
        message.mentions.users.first().send(`Vous avez été banni du serveur **${message.guild.name}** par ${message.author.username}`).catch(console.error).then(member => {
            ban.ban().then(member => {
                message.channel.send(`:white_check_mark: ${member.user.username} est ban par ${message.author.username}`);
            });});
    }
};

module.exports.help = {
    name: "ban"
}