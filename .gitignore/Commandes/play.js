const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
    message.channel.send(`Je lance la playlist ${args[1]}`)
};

module.exports.help = {
    name: 'play',
};
