const express = require('express');
const authorbookRouter = express.Router();
const autherBooksController = require('../controllers/autherBookController');
const Utils = require('../utils/decodeToken');
const authMiddleware = require('../middlware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     autherBooks:
 *       type: object
 *       properties:
 *         AuthorID:
 *           schema:
 *           type: array
 *           items:
 *              $ref: '#/components/schemas/Author'
 *           description: The unique identifier of the author.
 *         bookId:
 *           schema:
 *           type: array
 *           items:
 *              $ref: '#/components/schemas/Books'
 *           description: The unique identifier of the Book.
 *         
 */

/**
 * @swagger
 * /authorbooks:
 *   get:
 *     summary: Retrieve list of autherBooks
 *     description: Retrieve list of autherBooks from the database.
 *     tags: [autherBooks]
 *     responses:
 *       '200':
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/autherBooks'
 *       '500':
 *         description: Internal server error.
 * /authorbooks/autherBookId:
 *   post:
 *     summary: Create a new autherBooks
 *     description: Creates a new autherBooks 
 *     tags: [autherBooks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/autherBooks'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/autherBooks'
 *       '500':
 *         description: Failure creating the cart
 *      
  * /authorbooks/{autherBookId}:
 *   put:
 *     summary: Update a autherBooks
 *     description: Updates an existing autherBooks based on the provided data.
 *     tags: [autherBooks]
 *     parameters:
 *       - in: path
 *         name: autherBookId
 *         description: ID of the book to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/autherBooks'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/autherBooks'
 *       '500':
 *         description: Failure updating the book
 *   get:
 *     summary: Retrieve a autherBooks using autherBookId
 *     description: Retrieve a list of autherBookss from the database.
 *     tags: [autherBooks]
 *     parameters:
 *       - in: path
 *         name: autherBookId
 *         description: ID of the autherBooks to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Sucessful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/autherBooks'
 *       '500':
 *         description: Internal server error.
 *   delete:
 *     summary: Delete a autherBooks
 *     description: Deletes an existing autherBooks based on the provided ID.
 *     tags: [autherBooks]
 *     parameters:
 *       - in: path
 *         name: autherBookId
 *         description: ID of the autherBooks to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         schema:
 *           $ref: '#/components/schemas/autherBooks'
 *       '500':
 *         description: Failure deleting the autherBooks
 */

authorbookRouter.get("/", autherBooksController.getAllBookAuthor);
authorbookRouter.post("/autherBookId", autherBooksController.createBookAuthor);
authorbookRouter.put("/:autherBookId", autherBooksController.updateBookAuthor);
authorbookRouter.delete("/:autherBookId", autherBooksController.deleteBookAuthor);
authorbookRouter.get("/:autherBookId", autherBooksController.getByBookAuthorId);


module.exports = authorbookRouter;
