const path = require('path');
const jwt = require('jsonwebtoken');
const verifyMyToken = require('../routes/verifyMyToken');
const fs = require('fs');
const multer = require('multer');

module.exports = {
	createAsset: async (req, res) => {
    	project_id = req.body.project_id
    	owner_id = req.body.owner_id
			path = './uploads/' + owner_id;

			if(!fs.existsSync(path)){
				fs.mkdir(path);
			}
			var storage = multer.diskStorage({//set storage options
			  destination: function (req, file, cb) {
			    cb(null, path)
			  },
			  filename: function (req, file, cb) {
			    cb(null, Date.now())
			  }
			});
			var upload = multer({storage: storage});
			upload.single(req.file);

		db('Asset').insert({
        	project_id: project_id
        	owner_id: owner_id
        	filepath: path
        	name = Date.now()
        	type = '.ext'
        	
        });


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
