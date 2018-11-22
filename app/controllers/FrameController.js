const path = require('path');
const db = require(path.join(__model, 'database'));
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const verifyMyToken = require('../routes/verifyMyToken');

module.exports = {
  createFrame: async (req, res) => {
    
  },
  getFrameInfo: async (req, res) => {
    
  },
  deleteFrame: async (req, res) => {
    
  },
};