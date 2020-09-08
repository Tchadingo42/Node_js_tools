const express = require('express');
const router = express.Router();
const authConstroller = require('../controllers/auth');

router.post('/register', authConstroller.register);

router.post('/login', authConstroller.login);

module.exports = router;