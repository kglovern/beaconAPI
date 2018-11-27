const Router = require('express').Router();
const controller = require('../controllers/LoginController');

/* ROUTE: '/logins'
 * Available verbs: get, post
 */
Router.post('/', controller.authenticate);


module.exports = Router;
