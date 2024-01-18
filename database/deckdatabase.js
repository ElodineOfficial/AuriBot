//Deck XML
const fs = require('fs');
const xml2js = require('xml2js');

let deck = [];

// deckdatabase.js

function loadDeckFromXml(filename) {
    let parser = new xml2js.Parser();
    fs.readFile(filename, (err, data) => {
        if (err) {
            console.error("Error reading XML file:", err);
            return;
        }

        parser.parseString(data, (err, result) => {
            if (err) {
                console.error("Error parsing XML file:", err);
                return;
            }

            if (result && result.deck && result.deck.cardId) {
                // Assuming cardId is an array of card ID strings
                deck.splice(0, deck.length, ...result.deck.cardId);
            } else {
                console.log('No valid card IDs found in the deck XML.');
            }
        });
    });
}


function saveDeckToXml(filename) {
    let builder = new xml2js.Builder();
    let xml = builder.buildObject({deck: {cardId: deck.map(id => ({_: id}))}});

    fs.writeFile(filename, xml, (err) => {
        if (err) {
            console.error("Error writing XML file:", err);
            return;
        }
        console.log('Deck saved to XML file.');
    });
}

module.exports = { deck, loadDeckFromXml, saveDeckToXml };

