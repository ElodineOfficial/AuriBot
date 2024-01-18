const { loadCardsFromXml } = require('../database/carddatabase.js');
const { deck, loadDeckFromXml, saveDeckToXml } = require('../database/deckdatabase.js');

module.exports = {
    name: 'removefromdeck',
    description: 'Remove a card from your deck by its ID',

    execute(message, args) {
        if (args.length !== 1) {
            return message.reply('Please provide the ID of the card you want to remove from the deck.');
        }

        const cardId = args[0];

        // Load the current state of the deck
        loadDeckFromXml('C:\\Users\\elodi\\Desktop\\projects\\auri\\database\\deck.xml');

        // Check if the card is in the deck
        const cardIndex = deck.indexOf(cardId);
        if (cardIndex === -1) {
            return message.reply(`No card found with ID: ${cardId} in the deck.`);
        }

        // Remove the card from the deck and save
        deck.splice(cardIndex, 1);
        saveDeckToXml('C:\\Users\\elodi\\Desktop\\projects\\auri\\database\\deck.xml');

        message.reply(`Card with ID ${cardId} has been removed from the deck.`);
    },
};
