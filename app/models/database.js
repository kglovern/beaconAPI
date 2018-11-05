const path = require('path');
const dbConfig = require(path.join(configDir, './dbConfig'));
const db = require('knex')(dbConfig);

module.exports = db;