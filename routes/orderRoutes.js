const express = require('express');
const orderRouter = express.Router();
const OrderController = require('../controllers/orderController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         OrderId:
 *           type: string
 *           format: uuid
 *           description: The unique identifier of the Order.
 *         CustomerID:
 *           schema:
 *           type: array
 *           items:
 *              $ref: '#/components/schemas/Customer'
 *           description: The unique identifier of the Customer.
 *         OrderDate:
 *           type: string
 *           description: The email of the Order.
 *         quantity:
 *           type: number
 *           description: The phone number of the Order.
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Retrieve list of Order
 *     description: Retrieve list of Orders from the database.
 *     tags: [Order]
 *     responses:
 *       '200':
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       '500':
 *         description: Internal server error.
 * /orders/order:
 *   post:
 *     summary: Create a new Order
 *     description: Creates a new Order 
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '500':
 *         description: Failure creating the cart
 *      
  * /orders/{OrderId}:
 *   put:
 *     summary: Update a Order
 *     description: Updates an existing Order based on the provided data.
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: OrderId
 *         description: ID of the book to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '500':
 *         description: Failure updating the book
 *   get:
 *     summary: Retrieve a Order using OrderId
 *     description: Retrieve a list of Orders from the database.
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: OrderId
 *         description: ID of the Order to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Sucessful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '500':
 *         description: Internal server error.
 *   delete:
 *     summary: Delete a Order
 *     description: Deletes an existing Order based on the provided ID.
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: OrderId
 *         description: ID of the Order to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         schema:
 *           $ref: '#/components/schemas/Order'
 *       '500':
 *         description: Failure deleting the Order
 */

orderRouter.get("/", OrderController.getAllOrders);
orderRouter.post("/order", OrderController.createOrder);
orderRouter.put("/:OrderId", OrderController.updateOrder);
orderRouter.delete("/:OrderId", OrderController.deleteOrder);
orderRouter.get("/:OrderId", OrderController.getByOrderId);

// Define more routes as needed.

module.exports = orderRouter;
