const express = require('express');
const path = require('path');

/* Setup global config variables */
global.configDir = path.join(__dirname, 'config');
global.__model = path.join(__dirname, 'app/models');
global.__routes = path.join(__dirname, 'app/routes');
global.__ctrl = path.join(__dirname, 'app/controllers');

const app = express();

const PORT = process.env.PORT || 3000;

/* Load master route file */
const routes = require('./app/routes');

app.use('/v1', routes);



/* Serve */
app.listen(PORT, () => {

});
