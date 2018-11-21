const path = require('path');
const jwt = require('jsonwebtoken');
const verifyMyToken = require('../routes/verifyMyToken');
const fs = require('fs');
const multer = require('multer');

module.exports = {
			/*createAsset: create a new asset, save it to storage and update database
			 *@param req:Request -> Request meta data
			 *@param res:Response -> Response object
			 *@param body.project_id -> project_id associated with asset
			 *@param body.owner_id -> the user that is uploading the asset
			 *@param body.name -> the filename of the asset
			 *@param body.is_shared -> boolean dictating whether an asset is shared
			 */
			createAsset: async (req, res) => {
	    	project_id = req.body.project_id
	    	owner_id = req.body.owner_id;
				name = req.body.name;
				is_shared = req.body.is_shared;
				file = req.file;

				path = __uploads + owner_id;
				filename = Date.now() + file.encoding;

				if(!fs.existsSync(path)){
					fs.mkdir(path);
				}
				var storage = multer.diskStorage({//set storage options
				  destination: function (req, file, cb) {
				    cb(null, path);
				  },
				  filename: function (req, file, cb) {
				    cb(null, name);
				  }
				});
				var upload = multer({storage: storage});
				upload.single(req.file);


				try{
					const result = await db('Asset')
					.insert({
						project_id: project_id,
						owner_id: owner_id,
						filepath: path,
						name: name,
						type: file.encoding,
						size: file.size,
						is_shared: is_shared
					});
				}
				catch (e) {
				 console.log(e);
				 res.status(503).send({
					 err: 'Critical failure trying to retrieve project with id ' + project_id
				 });
			},
			/*
			 *getAssetInfo: retrieve an asset database entry
			 *@param req:Request -> Request meta data
			 *@param res:Response -> Response object
			 *@param params.id -> the asset ID
			 */
			getAssetInfo: async (req, res) => {
	    	assetId = req.param.id

	    	//look up asset in database
	    	assets = await db.from('Asset').select().where({
	      		assetId: id
	    	}).first();

	    	//asset not found
	    	if (assets.length == 0) {
	      		res.json({
	        		message: 'this asset does not exist'
	      		});
	      }

	    	res.json({
	      		assets
	      	});
    	},
			/*deleteAsset: remove an asset from the system
			 *@param req:Request -> Request meta data
			 *@param res:Response -> Response object
			 *@param body.id -> the asset ID
			 */
			deleteAsset: async (req, res) => {
				//finish this
			},

  },
};
