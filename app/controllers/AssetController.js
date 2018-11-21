const path = require('path');
const jwt = require('jsonwebtoken');
const verifyMyToken = require('../routes/verifyMyToken');

module.exports = {
	createAsset: async (req, res) => {
    	project_id = req.query.project_id
    	owner_id = req.query.owner_id
    	//Need to finish
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