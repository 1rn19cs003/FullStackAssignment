const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/users', UserController.getUsers);

// Define more routes as needed.

module.exports = router;
