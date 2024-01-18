//Deck XML Managment !addtodeck cardID
const { cardDatabase, loadCardsFromXml } = require('../database/carddatabase.js');
const { deck, loadDeckFromXml, saveDeckToXml } = require('../database/deckdatabase.js');

module.exports = {
    name: 'addtodeck',
    description: 'Add a card to your deck by its ID',

    execute(message, args) {
        if (args.length !== 1) {
            return message.reply('Please provide the ID of the card you want to add to the deck.');
        }

        const cardId = args[0];

        // Load the card database and deck
        loadCardsFromXml('C:\\Users\\elodi\\Desktop\\projects\\auri\\database\\cards.xml');
        loadDeckFromXml('C:\\Users\\elodi\\Desktop\\projects\\auri\\database\\deck.xml');

        // Check if the card exists
        const cardExists = cardDatabase.some(card => card.id === cardId);
        if (!cardExists) {
            return message.reply(`No card found with ID: ${cardId}`);
        }

        // Add card to the deck and save
        deck.push(cardId);
        saveDeckToXml('C:\\Users\\elodi\\Desktop\\projects\\auri\\database\\deck.xml');

        message.reply(`Card with ID ${cardId} added to the deck.`);
    },
};
