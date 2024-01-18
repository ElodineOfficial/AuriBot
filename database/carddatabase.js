const fs = require('fs');
const xml2js = require('xml2js'); // Make sure to install xml2js package

// Character Card Structure
class CharacterCard {
    constructor(name, id, health, defense, abilities, itemSlot) {
        this.name = name;
        this.id = id;
        this.health = health;
        this.defense = defense;
        this.abilities = abilities;
        this.itemSlot = itemSlot;
    }
}

function formatCardInAsciiBox(card) {
    let topBottomBorder = '+-----------------------------------+';
    let blankLine = '|                                   |';

    // Ensure all values are strings and handle undefined values
    let name = String(card.name || 'Unknown');
    let id = String(card.id || 'No ID');
    let health = String(card.health || '0');
    let defense = String(card.defense || '0');
    let ability1 = String((card.abilities && card.abilities[0]) || 'No Ability 1');
    let ability2 = String((card.abilities && card.abilities[1]) || 'No Ability 2');
    let itemSlot = String(card.itemSlot || 'No Item');

    // Format lines using padEnd
    let nameLine = `| Name: ${name.padEnd(29)}|`;
    let idLine = `| ID: ${id.padEnd(32)}|`;
    let healthLine = `| Health: ${health.padEnd(27)}|`;
    let defenseLine = `| Defense: ${defense.padEnd(26)}|`;
    let ability1Line = `| Ability 1: ${ability1.padEnd(23)}|`;
    let ability2Line = `| Ability 2: ${ability2.padEnd(23)}|`;
    let itemSlotLine = `| Item Slot: ${itemSlot.padEnd(24)}|`;

    return [topBottomBorder, nameLine, idLine, healthLine, defenseLine, ability1Line, ability2Line, itemSlotLine, blankLine, topBottomBorder].join('\n');
}


// Card Database Array
let cardDatabase = [];

function loadCardsFromXml(filename) {
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

            // Debugging: Log the parsed result
            console.log('Parsed Result:', result);

            // Check if the expected data structure is present
            if (!result || !result.cards || !result.cards.card) {
                console.error('Unexpected XML structure:', result);
                return;
            }

            // Converting parsed data to CharacterCard instances
            cardDatabase = result.cards.card.map(c => {
                return new CharacterCard(
                    c.name[0], 
                    c.id[0], 
                    parseInt(c.health[0]), 
                    parseInt(c.defense[0]), 
                    c.abilities[0].ability, 
                    c.itemSlot[0]
                );
            });
        });
    });
}

// Save cards to XML file
function saveCardsToXml(filename) {
    let builder = new xml2js.Builder();
    let xml = builder.buildObject({cards: {card: cardDatabase}});

    fs.writeFile(filename, xml, (err) => {
        if (err) {
            console.error("Error writing XML file:", err);
            return;
        }
        console.log('Cards saved to XML file.');
    });
}

// Adding example cards to the database
cardDatabase.push(new CharacterCard("Gandalf the Grey", "WIZ1001", 120, 60, ["3", "4"], "A"));
cardDatabase.push(new CharacterCard("Aragorn", "RNG1002", 110, 70, ["1", "2"], "B"));
cardDatabase.push(new CharacterCard("Legolas", "ELF1003", 100, 50, ["5", "6"], "C"));

// Exporting the CharacterCard class, format function, and the card database
module.exports = { CharacterCard, formatCardInAsciiBox, cardDatabase, saveCardsToXml, loadCardsFromXml };
