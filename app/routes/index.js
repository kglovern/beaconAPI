const router = require('express').Router();
const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
/* Individual route imports */
const loginRoutes = require(path.join(__routes, 'loginRoutes'));
const userRoutes = require(path.join(__routes, 'userRoutes'));
const projectRoutes = require(path.join(__routes, 'projectRoutes'));
const assetRoutes = require(path.join(__routes, 'assetRoutes'));
const frameRoutes = require(path.join(__routes, 'frameRoutes'));

/* How we add routes for specific components - keep it modular */
router.use('/login', loginRoutes);
router.use('/user', userRoutes);
router.use('/project', projectRoutes);
router.use('/asset', assetRoutes);
router.use('/frame', frameRoutes);

/* Health check */
router.get('/', (req, res) => {
  res.send({OK: 'API functioning'});
});

module.exports = router;

