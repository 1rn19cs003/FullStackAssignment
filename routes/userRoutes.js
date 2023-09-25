const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');



/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *           description: The unique identifier of the user.
 *         username:
 *           type: string
 *           description: The username of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *         role:
 *           type: string
 *           enum: [admin, customer]
 *           description: The role of the user.
 */

/**
 * @swagger
 * /login/users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of users from the database.
 *     responses:
 *       '200':
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '500':
 *         description: Internal server error.
 */

router.get('/users', UserController.getUsers);
router.get('/userLogin',UserController.loginUser);
router.get('/userSignup', UserController.createUser);

// Define more routes as needed.

module.exports = router;
