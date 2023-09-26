const express = require('express');
const router = express.Router();
const BookController = require('../controllers/bookController');
const Utils = require('../utils/decodeToken');
const authMiddleware = require('../middlware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Books:
 *       type: object
 *       properties:
 *         bookId:
 *           type: string
 *           format: uuid
 *           description: The unique identifier of the Book.
 *         title:
 *           type: string
 *           description: The title of the Book.
 *         isbn:
 *           type: string
 *           description: The ISBN number of the Book.
 *         price:
 *           type: number
 *           description: The Price of the Book.
 *         QuantityInStock:
 *           type: number
 *           description: The quantity available in the stock
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve list of Books
 *     description: Retrieve list of Books from the database.
 *     tags: [Book]
 *     responses:
 *       '200':
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Books'
 *       '500':
 *         description: Internal server error.
 * /books/book:
 *   post:
 *     summary: Create a new Book
 *     description: Creates a new Book 
 *     tags: [Book]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Books'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Books'
 *       '500':
 *         description: Failure creating the cart
 *      
  * /books/{bookId}:
 *   put:
 *     summary: Update a book
 *     description: Updates an existing book based on the provided data.
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         description: ID of the book to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Books'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Books'
 *       '500':
 *         description: Failure updating the book
 *   get:
 *     summary: Retrieve a Book using BookId
 *     description: Retrieve a list of Books from the database.
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         description: ID of the book to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Sucessful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Books'
 *       '500':
 *         description: Internal server error.
 *   delete:
 *     summary: Delete a book
 *     description: Deletes an existing book based on the provided ID.
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         description: ID of the book to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         schema:
 *           $ref: '#/components/schemas/Books'
 *       '500':
 *         description: Failure deleting the Book
 */

router.get("/", BookController.getAllBooks);
router.post("/book", BookController.createBook);
router.put("/:bookId", BookController.updateBook);
router.delete("/:bookId", BookController.deleteBook);
router.get("/:bookId", BookController.getByBookId);
// router.get('/users', Utils.authenticateJWT, authMiddleware.authenticateUser, UserController.getUsers);

// Define more routes as needed.

module.exports = router;
