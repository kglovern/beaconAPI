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