const path = require('path');
const Router = require('express').Router();
const controller = require(path.join(__ctrl, 'ProjectController'));

/**
 *  Get data for a single project
 *  @param id -> projectId: identifier for the project
 */
Router.get('/:id', controller.getProjectById);
/**
 *  Delete entry for a single project
 *  @param id -> Project.id: identifier for the project
 */
Router.delete('/:id', controller.deleteProjectById);
Router.post('/:id/editor', controller.addEditorToProject);

module.exports = Router;
