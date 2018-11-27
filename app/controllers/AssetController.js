const path = require('path');
const jwt = require('jsonwebtoken');
const verifyMyToken = require('../routes/verifyMyToken');
const fs = require('fs');
const db = require(path.join(__model, 'database'));
const multer = require('multer');

//create the storage engine
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    filepath = __uploads + req.body.owner_id;
    if(!fs.existsSync(filepath)){
      fs.mkdir(filepath);
    }
    cb(null, filepath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.' + path.extname(file.originalname));
  }
});
//create the upload object
let upload = multer({storage: storage});



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
        console.log(req.file);
        project_id = req.body.project_id
        if(!project_id){
            res.status(503).send({
              err: 'project_id is undefined'
            });
            return;
        }
        owner_id = req.body.owner_id;
        if(!owner_id){
          res.status(503).send({
            err: 'owner_id is undefined'
          });
          return;
        }
        name = req.body.name;
        if(!name){
          res.status(503).send({
            err: 'name is undefined'
          });
          return;
        }
        is_shared = req.body.is_shared;
        if(!is_shared){
          res.status(503).send({
            err: 'is_shared is undefined'
          });
          return;
        }
        file = req.file;

        //Get file ending to determine video type
        let video = ['.avi','.mp4']
        let photo = ['.jpg', '.jpeg', '.png']
        if (video.indexOf(path.extname(file.originalname)) >= 0){
          file.encoding = 'video'
        }
        else if (photo.indexOf(path.extname(file.originalname)) >= 0){
          file.encoding = 'photo'
        }
        else {
          file.encoding = 'file ending not recognized as video or photo'
        }

        if(!file){
          res.status(503).send({
            err: 'file is undefined'
          });
          return;
        }
        try{
          result = await db('Asset')
          .insert({
            project_id: project_id,
            owner_id: owner_id,
            filepath: filepath,
            name: name,
            type: file.encoding,
            file_size: file.size,
            is_shared: is_shared
          });
        }
        catch (e) {
         console.log(e);
         res.status(503).send({
           err: 'Critical failure trying to retrieve project with id ' + project_id
         });
       }
      },
      /*
       *upload: retrieve the upload object
       *@return upload -> the multer middleware upload object
       */
      upload: () => {
        return upload;
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
        assetId = req.param.id;
        try{
          const result = await db('Asset')
          .delete()
          .where(id, assetId);
          console.log(result);
        } catch (e) {
          console.log('Error deleting asset $(assetId)');
        }
      },

  };