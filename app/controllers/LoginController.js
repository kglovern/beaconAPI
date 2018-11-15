const path = require('path');
const db = require(path.join(__model, 'database'));

module.exports = {
  authenticate: (req, res) => {
  	//Test branch merge
    res.send({OK: 'Login page was requested and sent!'});
  },
};
