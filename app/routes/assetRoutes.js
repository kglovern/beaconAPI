const path = require('path');
const Router = require('express').Router();
const controller = require(path.join(__ctrl, 'AssetController'));
let upload = controller.upload();
//const verifyMyToken = require('../routes/verifyMyToken');

/* ROUTE: '/asset'
 * Available verbs: get, post, delete
 */

 /**
  *  Upload a new asset to the system
  */
Router.post('/', upload.single('file'), controller.createAsset);

/**
 *  Get an asset from the system
 *  @param assetId -> the identifier for the specified asset
 */
Router.get('/:assetId', controller.getAssetInfo);

/**
 *  Delete an asset from the system
 *  @param assetId -> the identifier for the specified asset
 */
Router.delete('/:assetId', controller.deleteAsset);


module.exports = Router;
