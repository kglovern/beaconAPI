const path = require('path');
const db = require(path.join(__model, 'database'));
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const verifyMyToken = require('../routes/verifyMyToken');

module.exports = {
  createUser: async (req, res) => {
    date = new Date()

    username = req.body.username
    password = req.body.password
    email = req.body.email

    checkDuplicate = await db.from('User').select().where({
      username: username
    });

    if (checkDuplicate.length != 0) {
      //if the username already exists
      res.status(503).send({
        error: "username already exists"
      });
    } else {
      user = {
        username: username,
        password: password,
        is_super: 0,
        is_active: 1,
        email: email,
        created_at: date,
        updated_at: date
      }

      bcrypt.hash(user.password, saltRounds, function (err, hash) {
        // Store hash in your password DB.
        db('User').insert({
          username: user.username,
          password: hash,
          is_super: user.is_super,
          is_active: user.is_active,
          created_at: user.created_at,
          updated_at: user.updated_at
        });
      });

      res.json({
        user: user,
      });
    }
  },
  getUserInfo: async (req, res) => {
    userId = req.params.userId

    users = await db.from('User').select().where({
      id: userId
    });

    if (users.length == 0) {
      res.status(503).send({
        error: "username does not exists"
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
    userId = req.params.userId

    users = await db.from('User').select().where({
      id: userId
    });

    if (users.length == 0) {
      res.status(503).send({
        error: "username does not exists"
      });
    } else {
      temp = await db('User').where({
        id: userId
      }).update({
        is_active: 0
      });

      res.json({
        message: "user successfully deleted"
      });
    }
  },
  updateUser: async (req, res) => {
    userId = req.params.userId;

    date = new Date();

    console.log(req.body);

    username = req.body.username;
    password = req.body.password;
    email = req.body.email;

    users = await db.from('User').select().where({
      id: userId
    });

    //if user id doesn't exist
    if (users.length == 0) {
      res.status(503).send({
        error: "username does not exists"
      });
    } 
    else {
      const match = await bcrypt.compare(password, users[0].password);
      //if the password is unchanged
      if(match) {
        temp = db('User').where({
          id: userId
        }).update({
          username: username,
          email: email
        });
      }
      else {
        bcrypt.hash(password, saltRounds, function (err, hash) {
        // Store hash in your password DB.
          temp = db('User').where({
            id: userId
          }).update({
            username: username,
            password: hash,
            email: email,
            updated_at: date
          });
        });
      }
      res.json({
        message: "User successfully updated"
      });
    }
  },
  /**  Get all projects in which a user has editor privileges for 
   *  @param req:Request -> Request meta data
   *  @param res:Response -> Response object
   *  @param id:Int -> user.id join ProjectEditor.user_id
   */
  getUserProjects: async (req, res) => {
    try {
      const projects = await db('Project')
        .select()
        .leftOuterJoin('ProjectEditor','ProjectEditor.project_id', 'Project.id')
        .where('ProjectEditor.user_id', req.params.id);
      res.send(projects);
    } catch (e) {
      console.log(e);
      res.status(503).send({
        err: 'Fatal error retrieving project list for user with id ' + req.params.id
      });
    }
  }
};