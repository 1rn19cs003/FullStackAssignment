const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;
const Utils = require('../utils/decodeToken');
const BookAuthor = require('../models/bookauthor');
const Author = require('../models/author');
const Books = require('../models/books');

exports.getAllBookAuthor = async (req, res) => {
    try {
        const author = await BookAuthor.findAll();
        res.status(200).send(author);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server Error' });
    }
};


exports.createBookAuthor = async (req, res) => {
    try {
        let k = req.body;
        const checkAuthor = await Author.findOne(k.authorId);
        const checkBook = await Books.findOne(k.bookId);
        if (checkAuthor && checkBook) {
            const author = await BookAuthor.create(k.authorId, k.bookId);
            res.status(200).send(author);
        } else {
            res.status(201).send({ message: "Author or Book Id is invalid" });
        }
    } catch (error) {
        console.log('error', error)
        res.status(500).send({ message: 'server error' });
    }
}

exports.getByBookAuthorId = async (req, res) => {
    try {
        let authorId = req.params.authorId;
        const author = await BookAuthor.findOne(authorId);
        res.status(200).send(author);
    } catch (error) {
        console.log('error', error)
        res.status(500).send({ message: 'server error' });
    }
}


exports.deleteBookAuthor = async (req, res) => {
    try {
        let authorId = req.params.authorId;
        const author = await BookAuthor.delete(authorId);
        res.status(200).send(author);
    } catch (err) {
        console.log('error', err);
        res.status(500).send({ message: 'server error' });
    }

}

exports.updateBookAuthor = async (req, res) => {
    try {
        let authorId = req.params.authorId;
        let k = req.body;
        const author = await BookAuthor.update(authorId, k.AuthorId, k.bookId);
        res.status(200).send(author);
    } catch (err) {
        console.log('error', err);
        res.status(500).send({ message: 'server error' });
    }
}
