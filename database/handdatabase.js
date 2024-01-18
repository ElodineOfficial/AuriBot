const fs = require('fs');
const xml2js = require('xml2js');

let hand = [];

function loadHandFromXml(filename) {
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

            if (result && result.hand && result.hand.cardId) {
                // Assuming cardId is an array of card ID strings
                hand.splice(0, hand.length, ...result.hand.cardId);
            } else {
                console.log('No valid card IDs found in the hand XML.');
            }
        });
    });
}

function saveHandToXml(filename) {
    let builder = new xml2js.Builder();
    let xml = builder.buildObject({hand: {cardId: hand.map(id => ({_: id}))}});

    fs.writeFile(filename, xml, (err) => {
        if (err) {
            console.error("Error writing XML file:", err);
            return;
        }
        console.log('Hand saved to XML file.');
    });
}

module.exports = { hand, loadHandFromXml, saveHandToXml };
