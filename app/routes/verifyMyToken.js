const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
      const header = req.headers.authorization.split(" ");
      const token = header[1];
      bearerToken = jwt.verify(token, 'secret');
      req.token = bearerToken;
      next();
    } catch (e) {
      res.sendStatus(403);
    }
};