const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
    let début = Date.now();
    message.channel.send('Ping')
        .then((m) => m.edit(`Pong <:obscuriaemoji:594894622484987905> : **${Date.now() - début}**ms`));
};

module.exports.help = {
    name: 'ping',
};
