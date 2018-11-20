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