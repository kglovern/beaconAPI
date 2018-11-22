const path = require('path');
const Router = require('express').Router();
const controller = require(path.join(__ctrl, 'FrameController'));
const verifyMyToken = require('../routes/verifyMyToken');

/* ROUTE: '/frame'
 * Available verbs: get, post, patch, delete
 */
Router.post('/', verifyMyToken, controller.createFrame);

Router.get('/:frameId', verifyMyToken, controller.getFrameInfo);

Router.delete('/:frameId', verifyMyToken, controller.deleteFrame);


module.exports = Router;
