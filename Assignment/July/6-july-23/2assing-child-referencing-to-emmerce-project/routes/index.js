const router = require('express').Router();

router.use('/users', require('./userRoutes'));
router.use('/products', require('./productRoutes'));

module.exports = router;
