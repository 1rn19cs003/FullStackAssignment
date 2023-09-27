const express = require('express');
const orderitemRouter = express.Router();
const OrderItemController = require('../controllers/orderItemController');
const Utils = require('../utils/decodeToken');
const authMiddleware = require('../middlware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       properties:
 *         orderItemId:
 *           type: string
 *           format: uuid
 *           description: The unique identifier of the OrderItem.
 *         OrderID:
 *           schema:
 *           type: array
 *           items:
 *              $ref: '#/components/schemas/Order'
 *           description: The unique identifier of the Order.
 *         bookId:
 *           schema:
 *           type: array
 *           items:
 *              $ref: '#/components/schemas/Books'
 *           description: The unique identifier of the Book.
 *         TotalAmount:
 *           type: number
 *           description: The phone number of the OrderItem.
 */

/**
 * @swagger
 * /orderitems:
 *   get:
 *     summary: Retrieve list of OrderItem
 *     description: Retrieve list of OrderItems from the database.
 *     tags: [OrderItem]
 *     responses:
 *       '200':
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderItem'
 *       '500':
 *         description: Internal server error.
 * /orderitems/orderItem:
 *   post:
 *     summary: Create a new OrderItem
 *     description: Creates a new OrderItem
 *     tags: [OrderItem]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderItem'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItem'
 *       '500':
 *         description: Failure creating the cart
 *
  * /orderitems/{orderItemId}:
 *   put:
 *     summary: Update a OrderItem
 *     description: Updates an existing OrderItem based on the provided data.
 *     tags: [OrderItem]
 *     parameters:
 *       - in: path
 *         name: orderItemId
 *         description: ID of the orderItem to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderItem'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItem'
 *       '500':
 *         description: Failure updating the orderItem
 *   get:
 *     summary: Retrieve a OrderItem using orderItemId
 *     description: Retrieve a list of OrderItems from the database.
 *     tags: [OrderItem]
 *     parameters:
 *       - in: path
 *         name: orderItemId
 *         description: ID of the OrderItem to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Sucessful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItem'
 *       '500':
 *         description: Internal server error.
 *   delete:
 *     summary: Delete a OrderItem
 *     description: Deletes an existing OrderItem based on the provided ID.
 *     tags: [OrderItem]
 *     parameters:
 *       - in: path
 *         name: orderItemId
 *         description: ID of the OrderItem to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         schema:
 *           $ref: '#/components/schemas/OrderItem'
 *       '500':
 *         description: Failure deleting the OrderItem
 */

orderitemRouter.get("/", OrderItemController.getAllOrderItems);
orderitemRouter.post("/orderItem", OrderItemController.createOrderItems);
orderitemRouter.put("/:orderItemId", OrderItemController.updateOrderItem);
orderitemRouter.delete("/:orderItemId", OrderItemController.deleteOrderItems);
orderitemRouter.get("/:orderItemId", OrderItemController.getByOrderItemId);


module.exports = orderitemRouter;
