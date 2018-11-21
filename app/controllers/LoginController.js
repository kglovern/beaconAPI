const path = require('path');
const db = require(path.join(__model, 'database'));
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
  authenticate: async (req, res) => {
    //can't have '' in the fields
    username = req.body.username;
    //can't start with the $
    password = req.body.password;

    //GET USER FROM DB
    user = await db.from('User')
      .select()
      .where({
        username: username
      })
      .first();

    if (!user) {
      res.sendStatus(401);
    } else {
      const match = await bcrypt.compare(password, user.password);
      console.log(user);
      if (match && user.is_active) {
        const token = jwt.sign({
          user: user.id
        }, 'secret');
        res.json({
          message: 'Authenticated',
          token: token
        });
      } else {
        res.sendStatus(401);
      }
    }
  },
};