const path = require('path');
const Router = require('express').Router();
const controller = require(path.join(__ctrl, 'ProjectController'));

/**
 *  Get data for a single project
 *  @param id -> projectId: identifier for the project
 */
Router.get('/:id', controller.getProjectByID);

module.exports = Router;
