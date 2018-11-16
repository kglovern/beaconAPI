const path = require('path');
const db = require(path.join(__model, 'database'));
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  authenticate: async (req, res) => {
  	username = req.username
  	password = req.password

  /*	bcrypt.hash('$#0U1DB3#4$#3D', saltRounds, function(err, hash) {
		  // Store hash in your password DB.
		  console.log(hash)
		});*/

  	//GET USER FROM D
  	user = await db.from('User').select().where({username: 'someuser'});
  	console.log(user[0].password)
    const match = bcrypt.compareSync('$#0U1DB3#4$#3D', user[0].password);
    if(match) {
    	console.log('yea')
    }
    else{
    	console.log('boo')
    }
  /*const user = {
    id: 1, 
    username: 'username',
    email: 'name@email.com'
  }*/

  const token = jwt.sign({ user: user.id }, 'secret');
  res.json({
    message: 'Authenticated',
    userinfo: user,
    token: token
  });
},/*
	protect: (req, res)=> {
		jwt.verify(req.token, 'secret', (err, authData) => {
	    if(err) {
	      res.sendStatus(403);
	    } else {
	      res.json({
	        message: 'Post created...',
	        authData
	      });
	    }
	  });
	},*/
};

