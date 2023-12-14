const { Client, GatewayIntentBits } = require('discord.js');

// Create a new client instance with the necessary intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent // Add this if you need to access the content of messages
    ]
});

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('messageCreate', message => {
    if (message.content === '!ping') {
        message.channel.send('Pong!');
    }
});


// Replace 'YOUR_BOT_TOKEN' with your actual bot token
client.login('MTE3ODgzNTM5OTcwODI0NjA1Nw.G8C2vp.ULBkT5LDvKOyitWWA0g6vZklyrrX28No3XfBCY');

