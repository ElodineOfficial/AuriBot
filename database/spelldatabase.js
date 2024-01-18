const fs = require('fs');
const xml2js = require('xml2js');

class SpellCard {
    constructor(id, description) {
        this.id = id;
        this.description = description;
    }
}

let spellDatabase = [];

function loadSpellsFromXml(filename) {
    // Similar to loadCardsFromXml
}

function saveSpellsToXml(filename) {
    let builder = new xml2js.Builder();
    let xml = builder.buildObject({spells: {spell: spellDatabase}});

    fs.writeFile(filename, xml, (err) => {
        if (err) {
            console.error("Error writing XML file:", err);
            return;
        }
        console.log('Spells saved to XML file.');
    });
}

module.exports = { SpellCard, spellDatabase, loadSpellsFromXml, saveSpellsToXml };
