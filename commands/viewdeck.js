// viewdeck.js

const fs = require('fs');
const xml2js = require('xml2js');
const { cardDatabase, loadCardsFromXml, formatCardInAsciiBox } = require('../Database/carddatabase.js');

module.exports = {
    name: 'viewdeck',
    description: 'View your deck',

    execute(message) {
        // Load the current state of the card database
        console.log("Loading card database...");
        loadCardsFromXml('C:\\Users\\elodi\\Desktop\\projects\\auri\\database\\cards.xml');

        const deckFilePath = 'C:\\Users\\elodi\\Desktop\\projects\\auri\\database\\deck.xml';

        // Read the Deck XML file
        console.log("Reading deck file from:", deckFilePath);
        fs.readFile(deckFilePath, (err, data) => {
            if (err) {
                console.error("Error reading the deck file:", err);
                return message.reply('Error reading the deck XML file.');
            }

            console.log("Parsing deck XML data...");
            // Parse the Deck XML file
            xml2js.parseString(data, (err, result) => {
                if (err) {
                    console.error("Error parsing deck XML data:", err);
                    return message.reply('Error parsing the deck XML file.');
                }

                console.log("Deck parse result:", result);
                if (!result || !result.deck || !result.deck.cardId) {
                    console.log("Deck data is empty or invalid structure");
                    return message.reply('Your deck is empty.');
                }

                let deckContents = 'Your Deck:\n';
                console.log("Processing deck contents...");
                // Retrieve and format each card in the deck
result.deck.cardId.forEach(cardId => {
    console.log("Looking for card ID:", cardId);
    const card = cardDatabase.find(c => c.id === cardId);
    if (card) {
        console.log("Found card, adding to deck contents:", card);
        deckContents += formatCardInAsciiBox(card) + '\n\n';
    } else {
        console.log("Card not found in database:", cardId);
    }
});
                // Send the deck contents as a reply (consider message size limits)
                console.log("Sending deck contents in reply...");
                message.reply(deckContents);
            });
        });
    },
};
