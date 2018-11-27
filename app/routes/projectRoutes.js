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
/**
 *  Add a user as an editor to a project
 *  @param id -> Project.id: identifier for the project
 */
Router.post('/:id/editor', controller.addEditorToProject);
/**
 *  Remove a user as an editor for a single project
 *  @param id -> Project.id: identifier for the project
 */
Router.delete('/:id/editor/:editorId', controller.removeEditorFromProject);
/**
 *  Create a new project
 *  @param body.userId:Int -> userId to identify project owner
 */
Router.post('/', controller.createProject);
/**
 *  Update the values of a single project
 *  @param id -> Project.id: identifier for the project to update
 */
Router.patch('/:id', controller.updateProjectById);

module.exports = Router;
