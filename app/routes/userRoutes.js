const path = require('path');
const Router = require('express').Router();
const controller = require(path.join(__ctrl, 'UserController'));
const verifyMyToken = require('../routes/verifyMyToken');

/* ROUTE: '/user'
 * Available verbs: get, post, patch, delete
 */
Router.post('/', verifyMyToken, controller.createUser);

Router.get('/:userId', verifyMyToken, controller.getUserInfo);

Router.delete('/:userId', verifyMyToken, controller.deleteUser);

Router.patch('/:userId', verifyMyToken, controller.updateUser);
/**
 *  Get all projects for which the user is an owner or editor
 *  @param id:Int -> Identifier for the user
 */
Router.get('/:id/projects', controller.getUserProjects);

module.exports = Router;
