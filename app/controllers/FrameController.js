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
      res.status(500).send('Critical failure when creating a new frame object');
    }
  },
  /**
   * updateFrameById: patch an existing frame from form data
   * @param req:Request -> Request meta data
   * @param res:Response -> Response object
   * @param: params.id:Int -> ID corresponding to the frame ID
   */
  updateFrameById: async (req, res) => {
    try {

    } catch (e) {
      console.log(e);
      res.status(500).send('Critical failure editing frame with id ' + req.params.id);
    }
  },
  /**
   * getFrameById: Retrieve data for a single frame and return it as a JSON object
   * @param req:Request -> Request meta data
   * @param res:Response -> Response object
   * @param: params.id:Int -> ID corresponding to the frame ID
   */
  getFrameById: async (req, res) => {
    try {
      const frameData = await db('Frame')
        .select()
        .where('id', req.params.id)
        .first();
      if (frameData) {
        res.send(frameData);
      } else {
        res.status(403).send({
          err: 'Unable to retrieve project with id ' + req.params.id
        });
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({
        err: 'Critical failure trying to retrieve frame with id ' + req.params.id
      });
    }
  },
  /**
   * deleteFrameByID: Delete a specific frame and all related information 
   * @param req:Request -> Request meta data
   * @param res:Response -> Response object
   * @param: params.id:Int -> ID corresponding to the frame ID
   */
  deleteFrameById: async (req, res) => {
    try {
      const result = await db('Frame')
        .delete()
        .where('id', req.params.id);
      console.log(result);
      res.status(200).send();
    } catch (e) {
      console.log(e);
      res.status(500).send({
        err: 'Critical failure while deleting frame with id ' + req.params.id
      });
    }
  },
};