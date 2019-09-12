const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

/* Setup global config variables */
global.configDir = path.join(__dirname, 'config');
global.__model = path.join(__dirname, 'app/models');
global.__routes = path.join(__dirname, 'app/routes');
global.__ctrl = path.join(__dirname, 'app/controllers');
global.__uploads = path.join(__dirname, 'uploads/');

const app = express();

// CORS headers to allow cross-domain access
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Added body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const PORT = process.env.PORT || 3000;

/* Load master route file */
const routes = require('./app/routes');
/* Versioning */
app.use('/v1', routes);

/* Serve */
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
