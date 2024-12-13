const fs = require("fs");

const loadDatabase = (db_connection, schema = {}) => {
    // Check if the database file exists, create it with the schema if not
    if (!fs.existsSync(db_connection)) {
        fs.writeFileSync(db_connection, JSON.stringify(schema, null, 2));
    }

    // Load the database from the file
    const model = require(db_connection);

    // Create the database object
    const db = {
        model: model,
        filename: db_connection,
        // Update method to save the current model to the file
        update: () => {
            fs.writeFileSync(db_connection, JSON.stringify(model, null, 2));
        }
    };

    return db;
};

// Export the loadDatabase function
module.exports = loadDatabase;
