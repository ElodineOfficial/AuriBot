//viewhand.js

const fs = require('fs');
const xml2js = require('xml2js');
const { cardDatabase, loadCardsFromXml, formatCardInAsciiBox } = require('../Database/carddatabase.js');

module.exports = {
    name: 'viewhand',
    description: 'View your hand',

    execute(message) {
        // Load the current state of the card database
        console.log("Loading card database...");
        loadCardsFromXml('C:\\Users\\elodi\\Desktop\\projects\\auri\\database\\cards.xml');
        const handFilePath = 'C:\\Users\\elodi\\Desktop\\projects\\auri\\database\\hand.xml';

        // Read the Hand XML file
        console.log("Reading hand file from:", handFilePath);
        fs.readFile(handFilePath, (err, data) => {
            if (err) {
                console.error("Error reading the hand file:", err);
                return message.reply('Error reading the hand XML file.');
            }

            console.log("Parsing hand XML data...");
            // Parse the Hand XML file
            xml2js.parseString(data, (err, result) => {
                if (err) {
                    console.error("Error parsing hand XML data:", err);
                    return message.reply('Error parsing the hand XML file.');
                }

                console.log("Hand parse result:", result);
                if (!result || !result.hand || !result.hand.cardId) {
                    console.log("Hand data is empty or invalid structure");
                    return message.reply('Your hand is empty.');
                }

                let handContents = 'Your Hand:\n';
                console.log("Processing hand contents...");
                // Retrieve and format each card in the hand
                result.hand.cardId.forEach(cardId => {
                    console.log("Looking for card ID:", cardId);
                    const card = cardDatabase.find(c => c.id === cardId);
                    if (card) {
                        console.log("Found card, adding to hand contents:", card);
                        handContents += formatCardInAsciiBox(card) + '\n\n';
                    } else {
                        console.log("Card not found in database:", cardId);
                    }
                });

                // Send the hand contents as a reply (consider message size limits)
                console.log("Sending hand contents in reply...");
                message.reply(handContents);
            });
        });
    },
};
