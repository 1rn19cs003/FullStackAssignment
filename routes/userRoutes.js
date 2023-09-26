const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const Utils = require('../utils/decodeToken');
const authMiddleware = require('../middlware/auth'); 

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
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of users from the database.
 *     tags: [User]
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
 * /logout:
 *   get:
 *     summary: Destroy session of users
 *     description: Make ypu to lose the acess over db.
 *     tags: [UserAuthentication]
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
 * /userLogin:
 *   post:
 *     summary: Login User
 *     description: Login user having Username ,password and Role
 *     tags: [UserAuthentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *                user:
 *                type: object
 *                properties:
 *                  username:
 *                    type: string
 *                  password:
 *                    type: string
 *                  Role:
 *                    type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '500':
 *         description: Failure creating the cart
 *      
 * /userSignUp:
 *   post:
 *     summary: Login User
 *     description: Login user having Username ,password and Role
 *     tags: [UserAuthentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *                user:
 *                type: object
 *                properties:
 *                  username:
 *                    type: string
 *                  password:
 *                    type: string
 *                  Role:
 *                    type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '500':
 *         description: Failure creating the cart
 *      
 */
router.post('/userLogin',UserController.loginUser);
router.post('/userSignup', UserController.createUser);
router.get('/logout', UserController.logoutUser);
router.get('/users', Utils.authenticateJWT, authMiddleware.authenticateUser,UserController.getUsers);

// Define more routes as needed.

module.exports = router;
