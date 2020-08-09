const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
    message.channel.send(args)
};

module.exports.help = {
    name: 'play',
};
