const path = require('path');
// Database Configuration
const dbConfig = require(path.join(configDir, './dbConfig'));
// KNEX object with our configuration options
const db = require('knex')(dbConfig);
// For import
module.exports = db;