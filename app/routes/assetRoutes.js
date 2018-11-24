const path = require('path');
const Router = require('express').Router();
const controller = require(path.join(__ctrl, 'AssetController'));
//<<<<<<< HEAD
//const multer = require('multer');
//let upload = multer({dest: __uploads}).single('file');
//=======
let upload = controller.upload();
//>>>>>>> 6c4f0af5c6444fc85b518a757e2ade699b4346e4
//const verifyMyToken = require('../routes/verifyMyToken');

/* ROUTE: '/asset'
 * Available verbs: get, post, delete
 */
//<<<<<<< HEAD
//Router.post('/', upload, controller.createAsset);
//=======
//>>>>>>> 6c4f0af5c6444fc85b518a757e2ade699b4346e4

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
