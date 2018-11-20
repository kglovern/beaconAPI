const path = require('path');
const db = require(path.join(__model, 'database'));
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const verifyMyToken = require('../routes/verifyMyToken');

module.exports = {
  createUser: async (req, res) => {
    date = new Date()

  	username = req.query.username
  	password = req.query.password
    email = req.query.email

    checkDuplicate = await db.from('User').select().where({username: username});

    if(checkDuplicate.length != 0) {
      //if the username already exists
      console.log("user already exists!")
      res.status(500).send({ error: "username already exists" });
    } 
    else {
      user = {
        username: username,
        password:password,
        is_super: 0,
        is_active: 1,
        email: email,
        created_at: date,
        updated_at: date
      }

      bcrypt.hash(user.password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        db('User').insert({username: user.username, password: hash, is_super: user.is_super, is_active: user.is_active, created_at: user.created_at, updated_at: user.updated_at});
      });

      res.json({
        user: user,
      });
    }  
},
getUserInfo: async (req, res) => {
    userId = req.query.userId

    users = await db.from('User').select().where({id: userId});

    if(users.length == 0) {
      res.json({
        message: 'this user does not exists'
      });
    }

    user = users[0];

    res.json({
      username: user.username,
      email: user.email,
      created_at: user.created_at,
      is_active: user.is_active
    });
},
deleteUser: async (req, res) => {
    userId = req.query.userId
    console.log(userId)

    users = await db.from('User').select().where({id: userId});

    if(users.length == 0) {
      console.log('user does not exists')
      res.json({
        message: 'this user does not exists'
      });
    } else {
      temp = await db('User').where({ id: userId}).update({is_active: 0});

      console.log(users)
      res.json({
        users
      });
    } 
},
getUserProjects: async (req, res) => {
    userId = req.query.userId
    console.log(userId)

    //projects = await db.from('Project').select('name').where({owner_id: userId, is_active: 1});

    if(projects.length == 0) {
      res.json({
        message: 'this user does not have editor privileges to any projects'
      });
    } else {
      console.log(projects)
      res.json({
        projects
      });
    }
},
};
