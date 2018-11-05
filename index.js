const express = require('express');
const path = require('path');

/* Setup global config variables */
global.configDir = path.join(__dirname, './config');
global.__model = path.join(__dirname, './app/models');
global.__routes = path.join(__dirname, 'app/routes');

const app = express();

const PORT = process.env.PORT || 3000;

/* Load master route file */
const routes = require('./app/routes');

app.use('/', routes);



/* Serve */
app.listen(PORT, () => {

});
