const path = require('path');
const Router = require('express').Router();
const controller = require(path.join(__ctrl, 'UserController'));

/**
 *  Get all projects for which the user is an owner or editor
 *  @param id:Int -> Identifier for the user
 */
Router.get('/:id/projects', controller.getUserProjects);

module.exports = Router;
