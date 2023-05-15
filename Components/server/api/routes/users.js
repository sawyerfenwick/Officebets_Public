const express = require('express');
const router = express.Router();

const User_Controller = require('../controllers/users');

router.post('/signup', User_Controller.sign_up);
router.post('/login', User_Controller.login);

module.exports = router;