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

				path = __uploads + owner_id;

				if(!fs.existsSync(path)){
					fs.mkdir(path);
				}
				var storage = multer.diskStorage({//set storage options
				  destination: function (req, file, cb) {
				    cb(null, path);
				  },
				  filename: function (req, file, cb) {
				    cb(null, Date.now() + name); //TODO: update name
				  }
				});
				var upload = multer({storage: storage});
				upload.single(req.file);

			},
			getAssetInfo: async (req, res) => {
	    	assetId = req.query.id

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

  },
};
