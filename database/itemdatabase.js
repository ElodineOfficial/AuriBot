const fs = require('fs');
const xml2js = require('xml2js');

// Item Card Structure
class ItemCard {
    constructor(id, value) {
        this.id = id;
        this.value = value;
        this.description = 'hello world'; // Default description
    }
}

let itemDatabase = [];

function loadItemsFromXml(filename) {
    // Similar to loadCardsFromXml, adapted for item structure
}

function saveItemsToXml(filename) {
    let builder = new xml2js.Builder();
    let xml = builder.buildObject({items: {item: itemDatabase}});

    fs.writeFile(filename, xml, (err) => {
        if (err) {
            console.error("Error writing XML file:", err);
            return;
        }
        console.log('Items saved to XML file.');
    });
}

module.exports = { ItemCard, itemDatabase, loadItemsFromXml, saveItemsToXml };
