const { cardDatabase, saveCardsToXml, loadCardsFromXml } = require('../Database/carddatabase.js');

module.exports = {
    name: 'delete',
    description: 'Delete a character card by ID or delete all cards',

    execute(message, args) {
        // Load the current state of the database
        loadCardsFromXml('path/to/your/cards.xml');

        // Check if there are no arguments provided for deleting all cards
        if (args.length === 0) {
            cardDatabase.length = 0; // Clearing the entire database
            saveCardsToXml('C:\\Users\\elodi\\Desktop\\projects\\auri\\database\\cards.xml'); // Save changes to XML
            return message.reply('All character cards have been deleted.');
        }

        // Deleting a specific card by ID
        const cardId = args[0];
        const cardIndex = cardDatabase.findIndex(card => card.id === cardId);

        // Check if the card exists
        if (cardIndex === -1) {
            return message.reply(`No character card found with ID: ${cardId}`);
        }

        // Remove the card from the database
        cardDatabase.splice(cardIndex, 1);

        // Save the updated database to the XML file
        saveCardsToXml('');

        // Confirm deletion to the user
        message.reply(`Character card with ID ${cardId} has been deleted.`);
    },
};
