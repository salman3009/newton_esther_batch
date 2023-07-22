const express = require('express');
const router = express.Router();
const userController = require('../controller/user');


router.post('/login',userController.loginController);
router.post('/register',userController.registerController);

module.exports = router;
