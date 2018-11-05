const router = require('express').Router();
const path = require('path');
const loginRoutes = require(path.join(__routes, 'loginRoutes'));

/* How we add routes for specific components - keep it modular */
router.use('/logins', loginRoutes);

/* This won't exist, just showing you an alternative */
router.get('/', (req, res) => {
  res.send({OK: 'Yeah this works!'});
});

module.exports = router;
