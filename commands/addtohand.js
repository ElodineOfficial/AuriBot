const { cardDatabase, loadCardsFromXml } = require('../database/carddatabase.js');
const { hand, loadHandFromXml, saveHandToXml } = require('../database/handdatabase.js');

module.exports = {
    name: 'addtohand',
    description: 'Add a card to your hand by its ID, up to a maximum of 5 cards',

    execute(message, args) {
        if (args.length !== 1) {
            return message.reply('Please provide the ID of the card you want to add to the hand.');
        }

        const cardId = args[0];

        // Load the card database and hand
        loadCardsFromXml('C:\\Users\\elodi\\Desktop\\projects\\auri\\database\\cards.xml');
        loadHandFromXml('C:\\Users\\elodi\\Desktop\\projects\\auri\\database\\hand.xml');

        // Check if the card exists
        const cardExists = cardDatabase.some(card => card.id === cardId);
        if (!cardExists) {
            return message.reply(`No card found with ID: ${cardId}`);
        }

        // Check hand size limit
        if (hand.length >= 5) {
            return message.reply("Your hand is already full. Can't add more cards.");
        }

        // Add card to the hand and save
        hand.push(cardId);
        saveHandToXml('C:\\Users\\elodi\\Desktop\\projects\\auri\\database\\hand.xml');

        message.reply(`Card with ID ${cardId} added to the hand.`);
    },
};
