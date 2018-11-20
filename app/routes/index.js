const router = require('express').Router();
const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const loginRoutes = require(path.join(__routes, 'loginRoutes'));
const userRoutes = require(path.join(__routes, 'userRoutes'));

/* How we add routes for specific components - keep it modular */
router.use('/logins', loginRoutes);

router.use('/user', userRoutes);

/* This won't exist, just showing you an alternative */
router.get('/', (req, res) => {
  res.send({OK: 'Yeah this works!'});
});

module.exports = router;

