const { SpellCard, spellDatabase, saveSpellsToXml } = require('../Database/spelldatabase.js');

module.exports = {
    name: 'createspell',
    description: 'Create a new spell card',

    execute(message, args) {
        if (args.length < 2) {
            return message.reply('Please provide all required fields: ID and Description.');
        }

        let [id, ...descriptionParts] = args;
        let description = descriptionParts.join(' '); // Joining the parts to form the full description

        // Check for duplicate ID
        if (spellDatabase.some(spell => spell.id === id)) {
            return message.reply('A spell with this ID already exists.');
        }

        // Create a new spell card
        const newSpell = new SpellCard(id, description);

        // Add the new spell to the database
        spellDatabase.push(newSpell);

        // Save the updated database to the XML file
        saveSpellsToXml('C:\\Users\\elodi\\Desktop\\projects\\auri\\database\\spells.xml');

        // Confirm creation to the user
        message.reply(`New spell card created: ${id}`);
    },
};
