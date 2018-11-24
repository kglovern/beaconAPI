const path = require('path');
const Router = require('express').Router();
const controller = require(path.join(__ctrl, 'AssetController'));
const multer = require('multer');
let upload = multer({dest: __uploads}).single('file');
//const verifyMyToken = require('../routes/verifyMyToken');

/* ROUTE: '/asset'
 * Available verbs: get, post, delete
 */
Router.post('/', upload, controller.createAsset);

Router.get('/:assetId', controller.getAssetInfo);

Router.delete('/:assetId', controller.deleteAsset);

module.exports = Router;
