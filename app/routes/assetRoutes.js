const path = require('path');
const Router = require('express').Router();
const controller = require(path.join(__ctrl, 'AssetController'));
const verifyMyToken = require('../routes/verifyMyToken');

/* ROUTE: '/asset'
 * Available verbs: get, post, patch, delete
 */
Router.post('/', controller.createAsset);

Router.get('/:assetId', controller.getAssetInfo);

Router.delete('/:assetId', controller.deleteAsset);
/**
 *  Get all projects for which the user is an owner or editor
 *  @param id:Int -> Identifier for the user
 */
//Router.get('/:id/projects', controller.getUserProjects);

module.exports = Router;
