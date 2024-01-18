const fs = require('fs');
const xml2js = require('xml2js');
const { formatCardInAsciiBox } = require('../Database/carddatabase.js');

module.exports = {
    name: 'viewcards',
    description: 'View all character cards in the database',

    execute(message) {
        // Path to your XML file
        const xmlFilePath = 'C:\\Users\\elodi\\Desktop\\projects\\auri\\database\\cards.xml';

        // Read the XML file
        fs.readFile(xmlFilePath, (err, data) => {
            if (err) {
                console.error(err);
                return message.reply('Error reading the XML file.');
            }

            // Parse the XML file
            xml2js.parseString(data, (err, result) => {
                if (err) {
                    console.error(err);
                    return message.reply('Error parsing the XML file.');
                }

                if (!result.cards || !result.cards.card) {
                    return message.reply('No character cards found in the database.');
                }

                // Debugging: Log the parsed object
                console.log('Parsed Cards:', result.cards.card);

                // Format and display each card
                const cards = result.cards.card.map(cardObj => {
                    // Add checks and default values for missing properties
                    const card = {
                        name: cardObj.name ? cardObj.name[0] : 'Unknown',
                        id: cardObj.id ? cardObj.id[0] : 'No ID',
                        health: cardObj.health ? cardObj.health[0] : '0',
                        defense: cardObj.defense ? cardObj.defense[0] : '0',
                        abilities: cardObj.abilities && cardObj.abilities[0].ability ? cardObj.abilities[0].ability : ['No abilities'],
                        itemSlot: cardObj.itemSlot ? cardObj.itemSlot[0] : 'No item'
                    };
                    return formatCardInAsciiBox(card);
                });

                // Send the formatted cards as a reply (consider message size limits)
                message.reply(cards.join('\n\n'));
            });
        });
    },
};
