const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customerController');
const Utils = require('../utils/decodeToken');
const authMiddleware = require('../middlware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       properties:
 *         customerId:
 *           type: string
 *           format: uuid
 *           description: The unique identifier of the Book.
 *         name:
 *           type: string
 *           description: The name of the customer.
 *         email:
 *           type: string
 *           description: The email of the Customer.
 *         phone:
 *           type: string
 *           description: The phone number of the Customer.
 */

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Retrieve list of Customer
 *     description: Retrieve list of Books from the database.
 *     tags: [Customer]
 *     responses:
 *       '200':
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *       '500':
 *         description: Internal server error.
 * /customers/customer:
 *   post:
 *     summary: Create a new Customer
 *     description: Creates a new Customer 
 *     tags: [Customer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       '500':
 *         description: Failure creating the cart
 *      
  * /customers/{customerId}:
 *   put:
 *     summary: Update a Customer
 *     description: Updates an existing Customer based on the provided data.
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         description: ID of the book to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       '500':
 *         description: Failure updating the book
 *   get:
 *     summary: Retrieve a Customer using customerId
 *     description: Retrieve a list of Customers from the database.
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         description: ID of the Customer to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Sucessful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       '500':
 *         description: Internal server error.
 *   delete:
 *     summary: Delete a Customer
 *     description: Deletes an existing Customer based on the provided ID.
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         description: ID of the Customer to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         schema:
 *           $ref: '#/components/schemas/Customer'
 *       '500':
 *         description: Failure deleting the Customer
 */

router.get("/", CustomerController.getAllCustomer);
router.post("/customer", CustomerController.createCustomer);
router.put("/:customerId", CustomerController.updateCustomer);
router.delete("/:customerId", CustomerController.deleteCustomer);
router.get("/:customerId", CustomerController.getByCustomerId);

// Define more routes as needed.

module.exports = router;
