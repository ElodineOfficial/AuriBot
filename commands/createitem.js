const { itemDatabase, ItemCard, saveItemsToXml } = require('../Database/itemdatabase.js');

module.exports = {
    name: 'createitem',
    description: 'Create a new item card',

    execute(message, args) {
        if (args.length < 2) {
            return message.reply('Please provide the ID and numerical value for the item.');
        }

        let [id, value] = args;

        // Parsing numerical value
        value = parseInt(value);

        // Validation
        if (isNaN(value)) {
            return message.reply('The value of the item must be a numerical value.');
        }

        // Check for duplicate ID
        if (itemDatabase.some(item => item.id === id)) {
            return message.reply('An item with this ID already exists.');
        }

        // Create a new item card
        const newItem = new ItemCard(id, value);

        // Add the new item to the database
        itemDatabase.push(newItem);

        // Save the updated database to the XML file
        saveItemsToXml('C:\\Users\\elodi\\Desktop\\projects\\auri\\database\\items.xml');

        // Confirm creation to the user
        message.reply(`New item card created with ID ${id} and value ${value}`);
    },
};
