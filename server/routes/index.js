const express = require('express');
const UserController = require('../controllers/users');
const router = express.Router();


router.post('/v0/authenticate',UserController.authenticateUser);
router.get('/v0/users/me',UserController.getUserInfo);

module.exports = router;
