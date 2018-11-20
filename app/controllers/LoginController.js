const path = require('path');
const db = require(path.join(__model, 'database'));
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verifyMyToken = require('../routes/verifyMyToken');

module.exports = {
  authenticate: async (req, res) => {
    //can't have '' in the fields
  	username = req.query.username;
    //can't start with the $
  	password = req.query.password;

  	//GET USER FROM DB
  	user = await db.from('User').select().where({username: username});

    if(user.length == 0) {
      res.sendStatus(403);
    }
    else {
      const match = await bcrypt.compare(password, user[0].password);
      console.log(user[0]);
      if(match && user[0].is_active) {
        const token = jwt.sign({ user: user.id }, 'secret');
        res.json({
          message: 'Authenticated',
          token: token
        });
      }
      else{
        res.sendStatus(403);
      }
    }
    

},
};

