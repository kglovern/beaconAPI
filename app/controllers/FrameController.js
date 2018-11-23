const path = require('path');
const db = require(path.join(__model, 'database'));
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const verifyMyToken = require('../routes/verifyMyToken');

module.exports = {
  /**
   * createFrame: Create a new frame from form data
   * @param req:Request -> Request meta data
   * @param res:Response -> Response object
   */
  createFrame: async (req, res) => {
    const projectId = req.body.project_id;
    const frameAmount = req.body.frame_amount;
    try {
      let frame = await db('Frame')
        .insert({
          project_id: projectId,
          position: frameAmount,
          bg_colour: req.body.bg_colour,
          transition_time: req.body.transition_time,
          expiry_date: req.body.expiry_date,
        });
      const frameId = frame;
      res.send(frameId);
    } catch (e) {
      console.log(e);
      res.status(500).send('Critical failure when creating a new project object');
    }
  },
  /**
   * updateFrameById: patch an existing frame from form data
   * @param req:Request -> Request meta data
   * @param res:Response -> Response object
   * @param: params.id:Int -> ID corresponding to the frame ID
   */
  updateFrameById: async (req, res) => {
    
  },
  /**
   * getFrameById: Retrieve data for a single frame and return it as a JSON object
   * @param req:Request -> Request meta data
   * @param res:Response -> Response object
   * @param: params.id:Int -> ID corresponding to the frame ID
   */
  getFrameById: async (req, res) => {
    
  },
  /**
   * deleteFrameByID: Delete a specific frame and all related information 
   * @param req:Request -> Request meta data
   * @param res:Response -> Response object
   * @param: params.id:Int -> ID corresponding to the frame ID
   */
  deleteFrameById: async (req, res) => {
    
  },
};