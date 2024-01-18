const { cardDatabase, CharacterCard, saveCardsToXml } = require('../Database/carddatabase.js');

module.exports = {
    name: 'createcard',
    description: 'Create a new character card',

    execute(message, args) {
        // Ensure the correct number of arguments are provided
        if (args.length < 6) {
            return message.reply('Please provide all required fields: Name, ID, Health, Defense, Ability 1, Ability 2, Item Slot.');
        }

        // Extracting card details from the arguments
        let [name, id, health, defense, ability1, ability2, itemSlot] = args;

        // Parsing numerical values
        health = parseInt(health);
        defense = parseInt(defense);

        // Validation
        if (isNaN(health) || isNaN(defense)) {
            return message.reply('Health and Defense must be numerical values.');
        }

        // Check for duplicate ID
        if (cardDatabase.some(card => card.id === id)) {
            return message.reply('A card with this ID already exists.');
        }

        // Create a new character card
        const newCard = new CharacterCard(name, id, health, defense, [ability1, ability2], itemSlot);

        // Add the new card to the database
        cardDatabase.push(newCard);

        // Save the updated database to the XML file
        saveCardsToXml('C:\\Users\\elodi\\Desktop\\projects\\auri\\database\\cards.xml');

        // Confirm creation to the user
        message.reply(`New character card created: ${name} with ID ${id}`);
    },
};
