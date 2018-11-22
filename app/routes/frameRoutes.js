const path = require('path');
const Router = require('express').Router();
const controller = require(path.join(__ctrl, 'FrameController'));
const verifyMyToken = require('../routes/verifyMyToken');

/* ROUTE: '/frame'
 * Available verbs: get, post, patch, delete
 */
Router.post('/', verifyMyToken, controller.createFrame);

/**
 *  Get data for a single frame
 *  @param id -> frameId: identifier for the frame
 */
Router.get('/:frameId', verifyMyToken, controller.getFrameById);

/**
 *  Delete entry for a single Frame
 *  @param id -> frame.id: identifier for the frame
 */
Router.delete('/:frameId', verifyMyToken, controller.deleteFrameById);

/**
 *  Update the values of a single frame
 *  @param id -> frame.id: identifier for the frame to update
 */
Router.patch('/:id', controller.updateFrameById);

module.exports = Router;
