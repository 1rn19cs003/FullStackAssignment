const express = require('express');
const router = express.Router();
const AuthorController = require('../controllers/authorController');
const authMiddleware = require('../middlware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       properties:
 *         authorId:
 *           type: string
 *           format: uuid
 *           description: The unique identifier of the Author.
 *         name:
 *           type: string
 *           description: The title of the Author.
 */

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Retrieve list of Author
 *     description: Retrieve list of Authors from the database.
 *     tags: [Author]
 *     responses:
 *       '200':
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 *       '500':
 *         description: Internal server error.
 * /authors/author:
 *   post:
 *     summary: Create a new Author
 *     description: Creates a new Author 
 *     tags: [Author]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       '500':
 *         description: Failure creating the cart
 *      
  * /authors/{authorId}:
 *   put:
 *     summary: Update a Author
 *     description: Updates an existing Author based on the provided data.
 *     tags: [Author]
 *     parameters:
 *       - in: path
 *         name: authorId
 *         description: ID of the Author to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       '500':
 *         description: Failure updating the Author
 *   get:
 *     summary: Retrieve a Author using authorId
 *     description: Retrieve a list of Authors from the database.
 *     tags: [Author]
 *     parameters:
 *       - in: path
 *         name: authorId
 *         description: ID of the Author to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Sucessful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       '500':
 *         description: Internal server error.
 *   delete:
 *     summary: Delete a Author
 *     description: Deletes an existing Author based on the provided ID.
 *     tags: [Author]
 *     parameters:
 *       - in: path
 *         name: authorId
 *         description: ID of the Author to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         schema:
 *           $ref: '#/components/schemas/Author'
 *       '500':
 *         description: Failure deleting the Author
 */

router.get("/", AuthorController.getAllAuthor);
router.post("/author", authMiddleware.isAdmin, AuthorController.createAuthor);
router.put("/:authorId", authMiddleware.isAdmin, AuthorController.updateAuthor);
router.delete("/:authorId", authMiddleware.isAdmin, AuthorController.deleteAuthor);
router.get("/:authorId", authMiddleware.isAdmin, AuthorController.getByAuthorId);


module.exports = router;
