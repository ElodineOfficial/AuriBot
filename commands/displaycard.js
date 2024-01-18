const { cardDatabase, loadCardsFromXml, formatCardInAsciiBox } = require('../Database/carddatabase.js');

module.exports = {
    name: 'displaycard',
    description: 'Display details of a card by its ID',

    execute(message, args) {
        if (args.length !== 1) {
            return message.reply('Please provide a single card ID.');
        }

        const cardId = args[0];

        // Load the current state of the card database
        loadCardsFromXml('C:\\Users\\elodi\\Desktop\\projects\\auri\\database\\cards.xml');

        // Find the card in the database
        const card = cardDatabase.find(c => c.id === cardId);

        if (!card) {
            return message.reply(`No card found with ID: ${cardId}`);
        }

        // Format the card using formatCardInAsciiBox
        const cardDetails = formatCardInAsciiBox(card);

        // Send the card details as a reply
        message.reply(`Details of card ${cardId}:\n${cardDetails}`);
    },
};
