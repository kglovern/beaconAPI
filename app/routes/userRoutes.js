<<<<<<< HEAD
const path = require('path');
const Router = require('express').Router();
const controller = require(path.join(__ctrl, 'UserController'));

/**
 *  Get all projects for which the user is an owner or editor
 *  @param id:Int -> Identifier for the user
 */
Router.get('/:id/projects', controller.getUserProjects);

module.exports = Router;
=======
const Router = require('express').Router();
const controller = require('../controllers/UserController');
const verifyMyToken = require('../routes/verifyMyToken');

/* ROUTE: '/user'
 * Available verbs: get, post, patch, delete
 */
Router.post('/', verifyMyToken, controller.createUser);

Router.get('/:userId', verifyMyToken, controller.getUserInfo);

Router.delete('/:userId', verifyMyToken, controller.deleteUser);

Router.get('/:userId/projects', verifyMyToken, controller.getUserProjects);

module.exports = Router;
>>>>>>> 5937bfc97d644b30040b08555cb47c5e443fdaaf
