const router = require('express').Router();
const htmlRoutes = require('./html-routes.js')

router.use('/', htmlRoutes);

module.exports = router;